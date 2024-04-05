import React from "react";
import { Box, Center, Grid, Heading, Text } from "@chakra-ui/react";
import Header from "@/components/Header";

const Dashboard: React.FC = () => {
  return (
    <div>
      <Header />
      <Heading color="#3183ff" textAlign="center" m={5}>
        Welcome To Ad-Caster
      </Heading>
      <Box
        m={10}
        p="6"
        borderRadius="lg"
        overflow="hidden"
        position="relative"
        w={"80%"}
        bgGradient="linear(to-r, red.500, blue.500)"
        color="white"
        boxShadow="lg"
        rounded="md"
        _hover={{
          bgGradient: "linear(to-r, orange.500, blue.400)",
        }}
      >
        <Heading
          as="h2"
          size="xl"
          mb="4"
          _hover={{
            transform: "scale(1.02)",
            transition: "transform 0.6s ease-in-out",
          }}
          color="#3183ff"
        >
          Decentralised Ad Network
        </Heading>
        <Text fontSize="lg">
          AdCaster aim to revolutionize online advertising by cutting out the
          middleman and using base blockchain technology to create a more
          transparent and privacy-focused system. This means users wouldn't be
          tracked and bombarded with irrelevant ads, while publishers and
          advertisers would connect directly, with payments secured by ADCST
          Tokens and ad visibility determined by an auction system.
        </Text>
      </Box>
      <Box
        p="6"
        borderRadius="lg"
        overflow="hidden"
        position="relative"
        ml={"18%"}
        w={"80%"}
        bgGradient="linear(to-r, red.500, blue.500)"
        color="white"
        boxShadow="lg"
        rounded="md"
        _hover={{
          bgGradient: "linear(to-r, orange.500, blue.400)",
        }}
      >
        <Heading
          as="h2"
          size="xl"
          mb="4"
          _hover={{
            transform: "scale(1.02)",
            transition: "transform 0.6s ease-in-out",
          }}
          color="#3183ff"
        >
          Growing Farcaster Ecosystem
        </Heading>
        <Text fontSize="lg">
          AdCaster is a decentralized ad network built specifically to leverage
          the unique capabilities of the Farcaster ecosystem. Farcaster is a
          rapidly growing DeSoc platform that prioritizes user privacy and data
          ownership. This focus on decentralization aligns perfectly with
          AdCaster's mission to create a more transparent and user-centric
          advertising experience within the Web3 space. Unlike traditional
          social media platforms, Farcaster users control their own data and can
          choose how they interact with advertisers. This empowers users and
          fosters trust within the ecosystem, creating a valuable environment
          for both advertisers and publishers. Additionally, Farcaster's
          innovative features, such as Frames, enable richer and more engaging
          content formats that are ideal for advertising
        </Text>
      </Box>
      <Box
        p="6"
        m={10}
        borderRadius="lg"
        overflow="hidden"
        position="relative"
        w={"80%"}
        bgGradient="linear(to-r, red.500, blue.500)"
        color="white"
        boxShadow="lg"
        rounded="md"
        _hover={{
          bgGradient: "linear(to-r, orange.500, blue.400)",
        }}
      >
        <Heading
          as="h2"
          size="xl"
          mb="4"
          _hover={{
            transform: "scale(1.02)",
            transition: "transform 0.6s ease-in-out",
          }}
          color="#3183ff"
        >
          Growing Farcaster Ecosystem
        </Heading>
        <Text fontSize="lg">
          AdCaster is a decentralized ad network built specifically to leverage
          the unique capabilities of the Farcaster ecosystem. Farcaster is a
          rapidly growing DeSoc platform that prioritizes user privacy and data
          ownership. This focus on decentralization aligns perfectly with
          AdCaster's mission to create a more transparent and user-centric
          advertising experience within the Web3 space. Unlike traditional
          social media platforms, Farcaster users control their own data and can
          choose how they interact with advertisers. This empowers users and
          fosters trust within the ecosystem, creating a valuable environment
          for both advertisers and publishers. Additionally, Farcaster's
          innovative features, such as Frames, enable richer and more engaging
          content formats that are ideal for advertising
        </Text>
      </Box>
      <Box
        p="6"
        borderRadius="lg"
        overflow="hidden"
        position="relative"
        ml={"18%"}
        w={"80%"}
        bgGradient="linear(to-r, red.500, blue.500)"
        color="white"
        boxShadow="lg"
        rounded="md"
        _hover={{
          bgGradient: "linear(to-r, orange.500, blue.400)",
        }}
      >
        <Heading
          as="h2"
          size="xl"
          mb="4"
          _hover={{
            transform: "scale(1.02)",
            transition: "transform 0.6s ease-in-out",
          }}
          color="#3183ff"
        >
          Unveiling The Power : How Frames Drive AD-Caster
        </Heading>
        <Text fontSize="lg">
          AdCaster seamlessly integrates with Farcaster's innovative Frames
          feature, unlocking a new dimension for advertisers. Frames allow
          creators to curate multimedia experiences that combine text, images,
          and videos. This dynamic format fosters deeper user engagement,
          exceeding the limitations of static banner ads. Through this
          integration, AdCaster empowers advertisers to craft interactive and
          immersive ad experiences within Frames. Imagine an ad embedded within
          a Frame that allows users to directly interact with a product or
          service, all within the familiar Farcaster interface. This powerful
          combination unlocks exciting possibilities for brand storytelling and
          user interaction, making advertising on AdCaster a truly engaging
          experience.
        </Text>
      </Box>
      <Center mt={5}>
        <Box p={3} borderWidth={2} bgSize={"auto"} borderRadius={12}>
          <Heading color={"orange"}> Technologies Used</Heading>
        </Box>
      </Center>
      <Center mt={3}>
        <Box p={3} borderWidth={1} bgSize={"auto"} borderRadius={12}>
          <Heading size={"md"}>Farcaster Frames</Heading>
        </Box>
      </Center>
      <Center mt={3}>
        <Box p={3} borderWidth={1} bgSize={"auto"} borderRadius={12}>
          <Heading size={"md"}>Base Seploia</Heading>
        </Box>
      </Center>
      <Center mt={3}>
        <Box p={3} borderWidth={1} bgSize={"auto"} borderRadius={12}>
          <Heading size={"md"}>Karma3 Labs OpenRank APIs</Heading>
        </Box>
      </Center>
      <Center mt={3}>
        <Box p={3} borderWidth={1} bgSize={"auto"} borderRadius={12}>
          <Heading size={"md"}>The Graph Protocol</Heading>
        </Box>
      </Center>
      <Text fontSize="lg" textAlign="center" m={10}>
        Made with ❤️ on LearnWeb3
      </Text>
    </div>
  );
};

export default Dashboard;
