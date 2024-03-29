"use client";
import React, { useState } from "react";
import { Box, Image, Heading, Grid, GridItem } from "@chakra-ui/react";
import CampaignModal from "./CampaignModal";

interface AppCardProps {
  title: string;
  status: string;
  AdId: string;
}

const AdCard: React.FC<AppCardProps> = ({ title, status, AdId }) => {
  const logo = `https://picsum.photos/seed/${encodeURIComponent(AdId)}/200/300`;

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
        _hover={{
          transform: "scale(1.1)",
          transition: "transform 0.3s",
        }}
        sx={{
          opacity: 0.8,
          backdropFilter: "blur(2px)",
          backgroundImage:
            "radial-gradient(circle farthest-side at 100% 0, rgba(2, 239, 225, .09), rgba(46, 29, 246, .03) 50%, rgba(0, 224, 255, .1))",
          border: "1px solid rgba(240, 80, 39, .3)",
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
      <CampaignModal isOpen={isOpen} onClose={handleCloseModal} AdId={AdId} />
    </>
  );
};

export default AdCard;
