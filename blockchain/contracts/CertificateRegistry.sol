// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CertificateRegistry {

    /* ========== STRUCTS ========== */

    struct Certificate {
        string ipfsCid;
        address issuer;
        uint256 issuedAt;
        bool revoked;
    }

    /* ========== STATE VARIABLES ========== */

    address public admin;
    mapping(address => bool) public issuers;
    mapping(bytes32 => Certificate) private certificates;

    /* ========== EVENTS ========== */

    event IssuerAdded(address indexed issuer);
    event IssuerRemoved(address indexed issuer);

    event CertificateIssued(
        bytes32 indexed certId,
        address indexed issuer,
        string ipfsCid,
        uint256 issuedAt
    );

    event CertificateRevoked(
        bytes32 indexed certId,
        address indexed issuer,
        uint256 revokedAt
    );

    /* ========== MODIFIERS ========== */

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    modifier onlyIssuer() {
        require(issuers[msg.sender], "Not issuer");
        _;
    }

    /* ========== CONSTRUCTOR ========== */

    constructor() {
        admin = msg.sender;
    }

    /* ========== ADMIN FUNCTIONS ========== */

    function addIssuer(address _issuer) external onlyAdmin {
        require(_issuer != address(0), "Invalid address");
        issuers[_issuer] = true;
        emit IssuerAdded(_issuer);
    }

    function removeIssuer(address _issuer) external onlyAdmin {
        issuers[_issuer] = false;
        emit IssuerRemoved(_issuer);
    }

    /* ========== ISSUER FUNCTIONS ========== */

    function issueCertificate(
        bytes32 certId,
        string calldata ipfsCid
    ) external onlyIssuer {
        require(certificates[certId].issuedAt == 0, "Certificate exists");

        certificates[certId] = Certificate({
            ipfsCid: ipfsCid,
            issuer: msg.sender,
            issuedAt: block.timestamp,
            revoked: false
        });

        emit CertificateIssued(
            certId,
            msg.sender,
            ipfsCid,
            block.timestamp
        );
    }

    function revokeCertificate(bytes32 certId) external onlyIssuer {
        Certificate storage cert = certificates[certId];

        require(cert.issuedAt != 0, "Certificate not found");
        require(!cert.revoked, "Already revoked");
        require(cert.issuer == msg.sender, "Not certificate issuer");

        cert.revoked = true;

        emit CertificateRevoked(
            certId,
            msg.sender,
            block.timestamp
        );
    }

    /* ========== PUBLIC VIEW FUNCTIONS ========== */

    function verifyCertificate(bytes32 certId)
        external
        view
        returns (
            string memory ipfsCid,
            address issuer,
            uint256 issuedAt,
            bool revoked
        )
    {
        Certificate memory cert = certificates[certId];
        require(cert.issuedAt != 0, "Certificate not found");

        return (
            cert.ipfsCid,
            cert.issuer,
            cert.issuedAt,
            cert.revoked
        );
    }
}
