import React from "react";
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

const Header = () => {
  return (
    <header style={{ width: "100%" }}>
      <Flex alignItems="center" padding={2}>
        <Box>
          <Image
            src={logo.src}
            alt="Logo"
            height={20}
            width={20}
            paddingTop={4}
          />
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
              <Link href="/frames/fuckyoucanada">
                <Heading fontSize={"l"} fontWeight={"bold"}>
                  Frames
                </Heading>
              </Link>
              <Link href="/storage-providers">
                <Heading fontSize={"l"} fontWeight={"bold"}>
                  Farcaster Creators
                </Heading>
              </Link>
              <Link href="/about">
                <Heading fontSize={"l"} fontWeight={"bold"}>
                  About
                </Heading>
              </Link>
              <Link href="/profile">
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
