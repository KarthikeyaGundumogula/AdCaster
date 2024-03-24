"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Center, Grid, Heading, HStack } from "@chakra-ui/react";
import FrameCard from "@/components/Frames/Frame";
import Header from "@/components/Header";
import AdCard from "@/components/Campaigns/CampaignCard";
import CreateAdModal from "@/components/Campaigns/CreateAdModal";
import CreateFrameModal from "@/components/Frames/CreateFrameModal";
import { useRouter, useParams } from "next/navigation";

const Dashboard: React.FC = () => {
  const [createAdModal, setCreateAdModal] = useState(false);
  const [createFrameModal, setCreateFrameModal] = useState(false);
  const [user, setUser] = useState("");
  const path = useParams().id;

  useEffect(() => {
    console.log(path);
  });
  const handleCreateFrame = () => {
    setCreateFrameModal(true);
  };

  return (
    <div>
      <Header />
      <Center paddingTop={2}>
        <HStack>
          <Button colorScheme="blue" onClick={handleCreateFrame}>
            Create Frame
          </Button>
          <Button colorScheme="green" onClick={() => setCreateAdModal(true)}>
            Create Campaign
          </Button>
        </HStack>
      </Center>
      <Box padding={2} paddingLeft={8}>
        <Heading size="lg" textDecoration="underline">
          Casted Frames
        </Heading>
      </Box>
      <Box alignItems="center" padding={2} paddingLeft={8}>
        <Grid templateColumns="repeat(4, 2fr)" gap={4}>
          <FrameCard title="Social Briks" status="ano" />
        </Grid>
      </Box>
      <Box padding={2} paddingLeft={8}>
        <Heading size="lg" textDecoration="underline">
          Launched Campaigns
        </Heading>
      </Box>
      <Box alignItems="center" padding={2} paddingLeft={8}>
        <Grid templateColumns="repeat(4, 2fr)" gap={4}>
          <AdCard title="Social Briks" status="ano" />
        </Grid>
      </Box>
      <CreateAdModal
        isOpen={createAdModal}
        onClose={() => setCreateAdModal(false)}
      />
      <CreateFrameModal
        isOpen={createFrameModal}
        onClose={() => setCreateFrameModal(false)}
      />
    </div>
  );
};

export default Dashboard;
