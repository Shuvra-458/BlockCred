const hre = require("hardhat");

async function main() {
  const [admin, issuer] = await hre.ethers.getSigners();

  console.log("Admin:", admin.address);
  console.log("Issuer:", issuer.address);

  const CertificateRegistry = await hre.ethers.getContractFactory(
    "CertificateRegistry"
  );

  const contract = await CertificateRegistry.deploy();
  await contract.waitForDeployment();


  console.log("CertificateRegistry deployed to:", contract.address);

  const tx = await contract.addIssuer(issuer.address);
  await tx.wait();

  console.log("Issuer registered successfully");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
