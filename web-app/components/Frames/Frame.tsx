"use client";
import React, { useState } from "react";
import { Box, Image, Heading, Grid, GridItem } from "@chakra-ui/react";
import CampaignModal from "./CampaignModal";

interface AppCardProps {
  title: string;
  status: string;
}

const FrameCard: React.FC<AppCardProps> = ({ title, status }) => {
  const logo = `https://picsum.photos/seed/${encodeURIComponent(
    title
  )}/200/300`;

  const [isOpen, setIsOpen] = useState(false);

  const handleFrameClick = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="12"
        width="250px"
        height="100px"
        bg={"AppWorkspace"}
        _hover={{
          cursor: "pointer",
          boxShadow: "2xl",
          width: "270px",
          height: "120px",
        }}
        onClick={handleFrameClick}
      >
        {" "}
        <Box
          width="8px"
          height="8px"
          borderRadius="50%"
          top={1}
          left={"95%"}
          position={"relative"}
          bg={status === "active" ? "green" : "red"}
          animation={`blink 1s infinite alternate`}
        />
        <Box padding={1} position={"relative"}>
          <Grid
            height={100}
            templateRows="repeat(1, 1fr)"
            templateColumns="repeat(3, 1fr)"
            gap={2}
          >
            <GridItem rowSpan={1} colSpan={1} top={"-30"}>
              <Image
                src={logo}
                alt="App Logo"
                borderRadius={12}
                height={75}
                width={70}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <Heading fontSize={26} fontWeight="bold">
                {title}
              </Heading>
            </GridItem>
          </Grid>{" "}
        </Box>
      </Box>
      <CampaignModal isOpen={isOpen} onClose={handleCloseModal} />
    </>
  );
};

export default FrameCard;
