// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract ERC735 {
    event ClaimRequested(
        uint256 indexed claimRequestId,
        uint256 indexed claimType,
        uint256 scheme,
        address indexed issuer,
        bytes signature,
        bytes data,
        string uri
    );
    event ClaimAdded(
        bytes32 indexed claimId,
        uint256 indexed claimType,
        address indexed issuer,
        uint256 signatureType,
        bytes32 signature,
        bytes claim,
        string uri
    );
    event ClaimRemoved(
        bytes32 indexed claimId,
        uint256 indexed claimType,
        uint256 scheme,
        address indexed issuer,
        bytes signature,
        bytes data,
        string uri
    );
    event ClaimChanged(
        bytes32 indexed claimId,
        uint256 indexed claimType,
        uint256 scheme,
        address indexed issuer,
        bytes signature,
        bytes data,
        string uri
    );

    struct Claim {
        uint256 claimType;
        uint256 scheme;
        address issuer; // msg.sender
        bytes signature; // this.address + topic + data
        bytes data;
        string uri;
    }

    mapping(bytes32 => Claim) public claims;
    mapping(uint256 => bytes32[]) public claimIdsByType;

    function getClaim(
        bytes32 _claimId
    )
        public
        view
        returns (
            uint256 claimType,
            uint256 scheme,
            address issuer,
            bytes memory signature,
            bytes memory data,
            string memory uri
        )
    {
        Claim storage claim = claims[_claimId];
        return (
            claim.claimType,
            claim.scheme,
            claim.issuer,
            claim.signature,
            claim.data,
            claim.uri
        );
    }

    function getClaimIdsByType(
        uint256 _claimType
    ) public view returns (bytes32[] memory claimIds) {
        return claimIdsByType[_claimType];
    }

    function addClaim(
        uint256 _claimType,
        uint256 _scheme,
        address _issuer,
        bytes memory _signature,
        bytes memory _data,
        string memory _uri
    ) public returns (bytes32) {
        bytes32 newClaimId = keccak256(abi.encodePacked(_issuer, _claimType));
        claims[newClaimId] = Claim(
            _claimType,
            _scheme,
            _issuer,
            _signature,
            _data,
            _uri
        );
        claimIdsByType[_claimType].push(newClaimId);
        emit ClaimAdded(
            newClaimId,
            _claimType,
            _issuer,
            _scheme,
            keccak256(_signature),
            _data,
            _uri
        );
        return newClaimId;
    }

    function removeClaim(bytes32 _claimId) public returns (bool success) {
        require(msg.sender == claims[_claimId].issuer);
        delete claims[_claimId];

        uint256 claimType = claims[_claimId].claimType;
        bytes32[] storage claimsOfType = claimIdsByType[claimType];
        for (uint256 i = 0; i < claimsOfType.length; i++) {
            if (claimsOfType[i] == _claimId) {
                if (i != claimsOfType.length - 1) {
                    claimsOfType[i] = claimsOfType[claimsOfType.length - 1];
                }
                claimsOfType.pop();
                break;
            }
        }

        emit ClaimRemoved(
            _claimId,
            claimType,
            claims[_claimId].scheme,
            claims[_claimId].issuer,
            claims[_claimId].signature,
            claims[_claimId].data,
            claims[_claimId].uri
        );
        return true;
    }
}
