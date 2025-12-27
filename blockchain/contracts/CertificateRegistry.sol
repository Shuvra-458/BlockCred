// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CertificateRegistry {
    struct Certificate {
        string ipfsCid;
        address issuer;
        uint256 issuedAt;
        bool revoked;
    }

    address public admin;
    mapping(address => bool) public issuers;
    mapping(bytes32 => Certificate) private certificates;

    event IssuerAdded(address indexed issuer);
    event CertificateIssued(bytes32 indexed certId, address indexed issuer, string ipfsCid, uint256 issuedAt);
    event CertificateRevoked(bytes32 indexed certId, address indexed issuer);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    modifier onlyIssuer() {
        require(issuers[msg.sender], "Not issuer");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function addIssuer(address _issuer) external onlyAdmin {
        issuers[_issuer] = true;
        emit IssuerAdded(_issuer);
    }

    function issueCertificate(bytes32 certId, string calldata ipfsCid) external onlyIssuer {
        require(certificates[certId].issuedAt == 0, "Exists");

        certificates[certId] = Certificate({
            ipfsCid: ipfsCid,
            issuer: msg.sender,
            issuedAt: block.timestamp,
            revoked: false
        });

        emit CertificateIssued(certId, msg.sender, ipfsCid, block.timestamp);
    }

    function revokeCertificate(bytes32 certId) external onlyIssuer {
        certificates[certId].revoked = true;
        emit CertificateRevoked(certId, msg.sender);
    }

    function verifyCertificate(bytes32 certId)
        external
        view
        returns (string memory, address, uint256, bool)
    {
        Certificate memory c = certificates[certId];
        require(c.issuedAt != 0, "Not found");
        return (c.ipfsCid, c.issuer, c.issuedAt, c.revoked);
    }
}
