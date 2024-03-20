// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "./Soulbound.sol";
import "./ERC735.sol"; // Import the ERC735 contract

error UserNotRegistered();

//0x3a2f83b7b29e34942a4a3211bcb3e8e146c4f779193fc4f3246c41fcf5c221b8
contract UserRegistrationAndAuthentication {
    // Struct to store user information
    struct User {
        string name; // User's name
        string email; // User's email address
        bytes32 passwordHash; // Hashed password
        bool isRegistered; // Flag to indicate if the user is registered
        address[] friendList; // Array to store friend addresses
        uint256 soulboundTokenId; // To store soulbound token id
    }
    struct AllUserStruct {
        string name;
        address accountAddress;
        address identityContractAddress;
        ClaimIds claimIds; // Add ClaimIds struct
    }
    struct ClaimIds {
        bytes32 nameClaimId;
        bytes32 emailClaimId;
        bytes32 passwordClaimId;
        bytes32 isRegisteredClaimId;
        bytes32 friendListClaimId;
        bytes32 tokenIdClaimId;
    }

    AllUserStruct[] getAllUsers;

    // Mapping to link each user's Ethereum address with their user information
    mapping(address => User) public users;
    mapping(address => bool) public userExist;

    Soulbound public soulboundToken; // Instance of the Soulbound token contract

    // Event to emit when a new user is registered
    event UserRegistered(
        address indexed userAddress,
        string name,
        string email
    );

    event FriendAdded(
        address indexed userAddress,
        address indexed friendAddress
    );
    event FriendListUploaded(
        address indexed userAddress,
        bytes32 friendListClaimId
    );

    constructor(address _soulboundTokenAddress) {
        soulboundToken = Soulbound(_soulboundTokenAddress);
    }

    ERC735 public identityContractInstance;

    event IdentityContractDeployed(address indexed identityContractAddress);

    function deployIdentityContract() external {
        identityContractInstance = new ERC735();
        emit IdentityContractDeployed(address(identityContractInstance));
    }

    // Function to register a new user
    function registerUser(
        string memory _name,
        string memory _email,
        bytes32 _passwordHash
    ) public {
        require(!users[msg.sender].isRegistered, "User already registered");
        User memory newUser = User({
            name: _name,
            email: _email,
            passwordHash: _passwordHash,
            isRegistered: true,
            friendList: new address[](0), // to initiate empty friend list
            soulboundTokenId: 0 //Initialise with 0
        });
        //push details of user into array
        users[msg.sender] = newUser;
        // Mint a new Soulbound token for the user
        uint256 tokenId = soulboundToken.getTokenCounter() + 1;
        soulboundToken.safeMint(msg.sender);
        users[msg.sender].soulboundTokenId = tokenId;
        // To create identity claims:
        ClaimIds memory claimIds;
        claimIds.nameClaimId = identityContractInstance.addClaim(1,1,msg.sender,"",bytes(_name),"");
        claimIds.emailClaimId = identityContractInstance.addClaim(
            2,
            1,
            msg.sender,
            "",
            bytes(_email),
            ""
        );
        claimIds.passwordClaimId = identityContractInstance.addClaim(
            3,
            1,
            msg.sender,
            "",
            abi.encodePacked(_passwordHash),
            ""
        );
        bytes memory isRegisteredData = abi.encodePacked(uint256(1));
        claimIds.isRegisteredClaimId = identityContractInstance.addClaim(
            4,
            1,
            msg.sender,
            "",
            isRegisteredData,
            ""
        );
        address[] memory emptyFriendList;
        bytes memory friendListData = abi.encode(emptyFriendList);
        claimIds.friendListClaimId = identityContractInstance.addClaim(
            5,
            1,
            msg.sender,
            "",
            friendListData,
            ""
        );
        bytes memory tokenIdData = abi.encode(tokenId);
        claimIds.tokenIdClaimId = identityContractInstance.addClaim(
            6,
            1,
            msg.sender,
            "",
            tokenIdData,
            ""
        );
        getAllUsers.push(
            AllUserStruct({
                name: _name,
                accountAddress: msg.sender,
                identityContractAddress: address(identityContractInstance),
                claimIds: claimIds
            })
        );
        userExist[msg.sender] = true;
        emit UserRegistered(msg.sender, _name, _email);
    }

    function checkUserExists() public view returns (bool) {
        return userExist[msg.sender];
    }

    // Function to retrieve user information for the caller
    function getMyUserInfo()
        public
        view
        returns (string memory, string memory, address[] memory)
    {
        require(users[msg.sender].isRegistered, "User not registered");

        return (
            users[msg.sender].name,
            users[msg.sender].email,
            users[msg.sender].friendList
        );
    }

    function checkUserExist(address pubkey) public view returns (bool) {
        return bytes(users[pubkey].name).length > 0;
    }

    // GET USERNAME
    function getUsername(address pubkey) external view returns (string memory) {
        require(checkUserExist(pubkey), "User is not registered");
        // return the name of user
        return users[pubkey].name;
    }


    function authenticate() public view returns (bool) {
        require(users[msg.sender].isRegistered, "User not registered");

        uint256 tokenId = users[msg.sender].soulboundTokenId;
        return tokenId != 0; // Return true if token ID is not zero
    }

    function addFriend(address _friendAddress) public {
        // check that user is registered
        require(users[msg.sender].isRegistered, "User not registered!");
        require(
            msg.sender != _friendAddress,
            "User cannot add themselves as friend!"
        );
        if (!users[_friendAddress].isRegistered) revert UserNotRegistered();

        // check if friend already exist in list
        bool isFriend = false;
        for (uint256 i = 0; i < users[msg.sender].friendList.length; i++) {
            if (users[msg.sender].friendList[i] == _friendAddress) {
                isFriend = true;
                break;
            }
        }
        require(!isFriend, "User is already a friend");
        users[msg.sender].friendList.push(_friendAddress);
        emit FriendAdded(msg.sender, _friendAddress);

        //bi-directional friend addition
        users[_friendAddress].friendList.push(msg.sender);
        emit FriendAdded(_friendAddress, msg.sender);
    }

    // GET MY FRIEND
    function getMyFriendList() public view returns (address[] memory) {
        require(users[msg.sender].isRegistered, "User not registered");
        return users[msg.sender].friendList;
    }

    // function to fetch all registered users
    function getAllAppUser() public view returns (AllUserStruct[] memory) {
        return getAllUsers;
    }

    function getUser(
        address _userAddress
    ) internal view returns (AllUserStruct memory) {
        for (uint256 i = 0; i < getAllUsers.length; i++) {
            if (getAllUsers[i].accountAddress == _userAddress) {
                return getAllUsers[i];
            }
        }
        revert("UserNotRegistered");
    }

    function uploadClaims(address userAddress) public {
        require(userExist[userAddress], "User not registered");

        // Retrieve user information from the user struct
        AllUserStruct memory user = getUser(userAddress);
        ClaimIds memory claimIds = user.claimIds;

        // Retrieve the current friend list from the user struct
        address[] memory friendList = users[userAddress].friendList;

        // Encode friend list data
        bytes memory friendListData = abi.encode(friendList);

        // Add friend list claim to the ERC735 contract
        bytes32 friendListClaimId = identityContractInstance.addClaim(
            5, // Claim type for friend list
            1, // Scheme
            userAddress, // Issuer
            "", // Signature
            friendListData, // Data
            "" // URI
        );

        // Emit event or log friend list addition
        emit FriendListUploaded(userAddress, friendListClaimId);

        // Update the claim ID in the user's ClaimIds structure
        claimIds.friendListClaimId = friendListClaimId;
    }

    function getSoulboundTokenId(
        address userAddress
    ) public view returns (uint256) {
        require(userExist[userAddress], "User not registered");
        return users[userAddress].soulboundTokenId;
    }

    function getSoulboundTokenURI(
        address userAddress
    ) public view returns (string memory) {
        require(userExist[userAddress], "User not registered");
        uint256 tokenId = users[userAddress].soulboundTokenId;
        return soulboundToken.tokenURI(tokenId);
    }

    fallback() external payable {}

    receive() external payable {}
}
