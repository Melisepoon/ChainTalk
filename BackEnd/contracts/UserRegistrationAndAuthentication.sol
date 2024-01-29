// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

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
    }
    struct AllUserStruct {
        string name;
        address accountAddress;
    }

    AllUserStruct[] getAllUsers;

    // Mapping to link each user's Ethereum address with their user information
    mapping(address => User) public users;
    mapping(address => bool) public userExist;

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

    // Function to register a new user
    function registerUser(
        string memory _name,
        string memory _email,
        bytes32 _passwordHash
    ) public {
        require(!users[msg.sender].isRegistered, "User already registered");
        // can add in more checks here like name/email/password cannot be empty
        User memory newUser = User({
            name: _name,
            email: _email,
            passwordHash: _passwordHash,
            isRegistered: true,
            friendList: new address[](0) // to initiate empty friend list
        });
        //push details of user into array
        users[msg.sender] = newUser;
        getAllUsers.push(AllUserStruct(_name, msg.sender));
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

    // Function to authenticate user based on password hash
    function authenticate(bytes32 _passwordHash) public view returns (bool) {
        require(users[msg.sender].isRegistered, "User not registered");

        return users[msg.sender].passwordHash == _passwordHash;
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

    fallback() external payable {}

    receive() external payable {}
}
