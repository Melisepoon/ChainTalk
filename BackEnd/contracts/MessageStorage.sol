// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract MessageStorage {
    // Struct to represent the structure of a message
    struct Message {
        address sender; // Ethereum address of the sender
        address recipient; // Ethereum address of the recipient
        string content; // Content of the message
        uint256 timestamp; // Timestamp when the message was sent
        bool isRead; // Flag to indicate if the message has been read
        bool isDeleted; // Flag to indicate if the message has been deleted
    }

    struct shortMessage {
        address sender;
        uint256 timestamp;
        string content;
    }

    // Mapping to associate each user's Ethereum address with an array of messages
    mapping(address => Message[]) public userMessages;
    mapping(bytes32 => shortMessage[]) public allMessages;
    // mapping(bytes32 => Message[]) private allMessages;

    // Event to emit when a new message is sent
    event MessageSent(
        address indexed sender,
        address indexed recipient,
        string content
    );

    // Function to send a new message
    function sendMessage(address _recipient, string memory _content) public {
        Message memory newMessage = Message({
            sender: msg.sender,
            recipient: _recipient,
            content: _content,
            timestamp: block.timestamp,
            isRead: false,
            isDeleted: false
        });

        shortMessage memory newshortMessage = shortMessage({
            sender: msg.sender,
            timestamp: block.timestamp,
            content: _content
        });

        bytes32 chatCode = _getChatCode(msg.sender, _recipient);

        userMessages[msg.sender].push(newMessage);
        userMessages[_recipient].push(newMessage);
        allMessages[chatCode].push(newshortMessage);

        emit MessageSent(msg.sender, _recipient, _content);
    }

    function _getChatCode(
        address _user1,
        address _user2
    ) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(_user1, _user2));
    }

    // // function to return the message from that friend
    // function readFriendMessage(
    //     address _friendAddress
    // ) external view returns (shortMessage[] memory) {
    //     bytes32 chatCode = _getChatCode(msg.sender, _friendAddress);
    //     return allMessages[chatCode];
    // }
    function readFriendMessage(
        address _friendAddress
    ) external view returns (shortMessage[] memory) {
        bytes32 chatCode1 = _getChatCode(msg.sender, _friendAddress);
        bytes32 chatCode2 = _getChatCode(_friendAddress, msg.sender);

        shortMessage[] memory messages1 = allMessages[chatCode1];
        shortMessage[] memory messages2 = allMessages[chatCode2];

        uint256 totalLength = messages1.length + messages2.length;
        shortMessage[] memory combinedMessages = new shortMessage[](
            totalLength
        );

        for (uint256 i = 0; i < messages1.length; i++) {
            combinedMessages[i] = messages1[i];
        }

        for (uint256 j = 0; j < messages2.length; j++) {
            combinedMessages[messages1.length + j] = messages2[j];
        }

        return combinedMessages;
    }

    // Function to retrieve all messages for the caller
    function getMyMessages() public view returns (Message[] memory) {
        return userMessages[msg.sender];
    }

    // Function to update the status of a message to "read"
    function markAsRead(uint256 _messageIndex) public {
        require(
            _messageIndex < userMessages[msg.sender].length,
            "Invalid message index"
        );

        userMessages[msg.sender][_messageIndex].isRead = true;
    }

    function deleteMessage(uint256 _messageIndex) public {
        require(
            _messageIndex < userMessages[msg.sender].length,
            "Invalid message index"
        );

        // Mark the message as deleted
        userMessages[msg.sender][_messageIndex].isDeleted = true;
    }
}
