/* eslint-disable react/jsx-key */
import { frames } from "../../frames";
import { Button } from "frames.js/next";
import { redirect } from "frames.js/core";
import { Address, ABI } from "@/Constants/ContractDetails";
import { Wallet, JsonRpcProvider, Contract } from "ethers";

export const POST = frames(async ({ ctx, state, url, searchParams }) => {
  const path = url.pathname;
  console.log(state.AdDestinataion);
  const provider = new JsonRpcProvider(
    process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL
  );
  if (!process.env.NEXT_PUBLIC_PRIVATE_KEY) {
    throw new Error("Private key is not defined");
  }
  const signer = new Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY, provider);
  const frameId = path.split("/")[2];
  const AdId = path.split("/")[4];
  const contract = new Contract(Address, ABI, signer);
  let tx = await contract.serveAd(AdId, frameId);
  const goBackTarget = `/${frameId}`;
  const imgSrc = `${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${searchParams.adImage}`;
  if (ctx.pressedButton?.action === "post_redirect") {
    await tx.wait();
    tx = await contract.transferClickReward(AdId, frameId);
    console.log(ctx.searchParams.adUrl);
    return redirect(
      `${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${ctx.searchParams.adUrl}`
    );
  }
  return {
    image: imgSrc,
    buttons: [
      <Button action="post" target={goBackTarget}>
        Go Back
      </Button>,
      <Button action="post_redirect">Visit</Button>,
    ],
  };
});
