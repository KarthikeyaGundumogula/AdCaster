"use client";
import Header from "@/components/Header";
import { Button, Center } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { BrowserProvider } from "ethers";

import React from "react";

const Profile = () => {
  const router = useRouter();

  const handleConnect = () => {
    try {
      const acc = new BrowserProvider((window as any).ethereum);
      const getUser = async () => {
        const user = await acc.getSigner();
        router.push(`/profile/${user.address}`);
      };
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <Center pt={10}>
        <Button variant="outline" colorScheme="orange" onClick={handleConnect}>
          Connect Wallet
        </Button>
      </Center>
    </div>
  );
};

export default Profile;
