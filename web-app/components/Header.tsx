"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Spacer,
  Image,
  Heading,
  Circle,
  Link,
  HStack,
} from "@chakra-ui/react";
import logo from "@/public/Assets/logo.png";
import { BrowserProvider } from "ethers";
import { useParams } from "next/navigation";

const Header = () => {
  const [user, setUser] = useState("");
  const path = useParams();
  useEffect(() => {
    try {
      const acc = new BrowserProvider((window as any).ethereum);
      const getUser = async () => {
        const user = await acc.getSigner();
        setUser(user.address);
      };
      getUser();
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <header style={{ width: "100%" }}>
      <Flex alignItems="center" padding={4}>
        <Box pr={2}>
          <Image src={logo.src} alt="Logo" />
        </Box>
        <Box>
          <Heading fontSize="36" fontWeight="bold">
            Ad-Caster
          </Heading>
        </Box>
        <Spacer />
        <Spacer />
        <Box>
          <Flex alignItems="center">
            <Spacer />
            <HStack spacing={12}>
              <Link href={`/dashboard/${user}`}>
                <Heading
                  fontSize={"l"}
                  fontWeight={"bold"}
                  textDecoration={
                    typeof window !== "undefined" &&
                    window.location.pathname === `/dashboard/${user}`
                      ? "underline"
                      : "none"
                  }
                >
                  Dashboard
                </Heading>
              </Link>
              <Link href="/farcaster-creators">
                <Heading
                  fontSize={"l"}
                  fontWeight={"bold"}
                  textDecoration={
                    typeof window !== "undefined" &&
                    window.location.pathname === "/farcaster-creators"
                      ? "underline"
                      : "none"
                  }
                >
                  Farcaster Creators
                </Heading>
              </Link>
              <Link href="/">
                <Heading
                  fontSize={"l"}
                  fontWeight={"bold"}
                  textDecoration={
                    typeof window != "undefined" &&
                    window.location.pathname === "/"
                      ? "underline"
                      : "none"
                  }
                >
                  About
                </Heading>
              </Link>
              <Link href={`/profile/${user}`}>
                <Box>
                  <Circle size="40px" bg="green.500" />
                </Box>
              </Link>
            </HStack>
          </Flex>
        </Box>
      </Flex>
      <Box borderBottom="1px solid #070F2B " width="100%" />
    </header>
  );
};

export default Header;
