import { Contract, BrowserProvider } from "ethers";
import { Address, ABI } from "../Constants/ContractDetails";

export const Caster = async () => {
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new Contract(Address, ABI, signer);
  return contract;
};
