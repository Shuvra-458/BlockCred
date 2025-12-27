async function main() {
  const Registry = await ethers.getContractFactory("CertificateRegistry");
  const registry = await Registry.deploy();
  await registry.waitForDeployment();

  console.log("CertificateRegistry deployed to:", await registry.getAddress());
}

main().catch(console.error);
