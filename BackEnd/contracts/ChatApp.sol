// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract ChatApp{
    // USER struct
    struct user{
        string name;
        friend[] friendList;
    }

    struct friend{
        address pubkey;
        string name;
    }

    struct message{
        address sender;
        uint256 timestamp;
        string msg;
    }

    struct AllUserStruct{
        string name;
        address accountAddress;
    }

    AllUserStruct[] getAllUsers;

    mapping(address => user) userList;
    // provide all communication that is happening btw 2 users
    mapping(bytes32 => message[]) allMessages;

    // CHECK USER EXIST
    function checkUserExist (address pubkey) public view returns(bool){
        return bytes(userList[pubkey].name).length > 0;
    }

    // CREATE ACCOUNT
    function createAccount(string calldata name)external{
        // have to be user then can create account
        require(checkUserExist(msg.sender)==false, "User already exisit");
        require(bytes(name).length>0,"Username cannot be empty");

        // push name of user into array
        userList[msg.sender].name = name;
        getAllUsers.push(AllUserStruct(name,msg.sender));
    }

    // GET USERNAME
    function getUsername(address pubkey) external view returns (string memory){
        require(checkUserExist(pubkey), "User is not registered");
        // return the name of user
        return userList[pubkey].name;
    }

    // ADD FRIENDS
    function addFriend(address friend_key, string calldata name)external{
        // check that the person you want to add as friend has account
        require(checkUserExist(msg.sender),"Create an account first");
        // check that person that is trying to add friend has account
        require(checkUserExist(friend_key), "User is not registered");
        // check that you are adding new friend and not yourself
        require (msg.sender != friend_key, "User cannot add themselves as friends");
        // check if they are already friends
        require(checkAlreadyFriends(msg.sender,friend_key)== false, "These users are already friends");

        _addFriend(msg.sender,friend_key,name);
        _addFriend(friend_key,msg.sender,userList[msg.sender].name);
    }

    function checkAlreadyFriends(address pubkey1, address pubkey2)internal view returns(bool){

        if (userList[pubkey1].friendList.length > userList[pubkey2].friendList.length){
            address tmp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = tmp;
        }

        for (uint256 i = 0; i< userList[pubkey1].friendList.length;i++){
            if (userList[pubkey1].friendList[i].pubkey==pubkey2)return true;
        }
        return false;
    }

    function _addFriend(address me, address friend_key, string memory name) internal{
        friend memory newFriend = friend(friend_key,name);
        userList[me].friendList.push(newFriend);
    }

    // GET MY FRIEND
    function getMyFriendList() external view returns(friend[]memory){
        return userList[msg.sender].friendList;
    }

    // GET CHAT CODE (run internally)
    function _getChatCode (address pubkey1, address pubkey2) internal pure returns(bytes32){
        if (pubkey1<pubkey2){
            return keccak256(abi.encodePacked(pubkey1,pubkey2));
        }else return keccak256(abi.encodePacked(pubkey2,pubkey1));
    }

    // send message
    function sendMessage(address friend_key, string calldata _msg) external{
        require(checkUserExist(msg.sender),"Create an account first");
        require(checkUserExist(friend_key), "User is not registered");
        require(checkAlreadyFriends(msg.sender,friend_key), "You are not friends with the given user");

        bytes32 chatCode = _getChatCode(msg.sender,friend_key);
        message memory newMsg = message(msg.sender,block.timestamp, _msg);
        allMessages[chatCode].push(newMsg);
    }

    // READ MESSAGE
    function readMessage (address friend_key) external view returns(message[] memory){
        bytes32 chatCode = _getChatCode(msg.sender,friend_key);
        return allMessages[chatCode];
    }

    // TO FETCH ALL REGISTERED USERS
    function getAllAppUser() public view returns (AllUserStruct[] memory){
        return getAllUsers;
    }
}