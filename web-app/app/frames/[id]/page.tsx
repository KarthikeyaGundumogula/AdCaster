"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Center, Grid, Heading, HStack } from "@chakra-ui/react";
import FrameCard from "@/components/Frames/Frame";
import Header from "@/components/Header";
import AdCard from "@/components/Campaigns/CampaignCard";
import CreateAdModal from "@/components/Campaigns/CreateAdModal";
import CreateFrameModal from "@/components/Frames/CreateFrameModal";
import { useParams } from "next/navigation";
import { getGraphData } from "@/utils/GetData";

const Dashboard: React.FC = () => {
  const [createAdModal, setCreateAdModal] = useState(false);
  const [createFrameModal, setCreateFrameModal] = useState(false);
  const [frames, setFrames] = useState([]);
  const [ads, setAds] = useState([]);
  const [user, setUser] = useState("");
  const path = useParams();

  useEffect(() => {
    async function getUser() {
      setUser(path.id.toString());
      const query = `  
      {
        ads(
    first: 10
    where: {Advertiser: "${path.id}"}
  ) {
    AdData
    AdId
  }
  frames(where: {FrameOwner: "${path.id}"}) {
    FrameId
  }
      }
      `;
      const data = await getGraphData(query);
      if (data != undefined) {
        console.log();
        setFrames(data.data.data.frames);
        setAds(data.data.data.ads);
      }
      console.log(ads);
    }
    getUser();
  }, [user]);
  const handleCreateFrame = () => {
    setCreateFrameModal(true);
  };

  const handleCreateAd = () => {
    setCreateAdModal(true);
  };

  return (
    <div>
      <Header />
      <Center paddingTop={2}>
        <HStack>
          <Button
            isLoading={false}
            loadingText={"Creating Frame"}
            colorScheme="teal"
            variant={"outline"}
            onClick={handleCreateFrame}
          >
            Create Frame
          </Button>
          <Button
            colorScheme="orange"
            variant={"outline"}
            onClick={handleCreateAd}
          >
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
          {frames.map((frame: { FrameId: string }) => (
            <FrameCard frameId={frame.FrameId} status="active" title="test" />
          ))}
        </Grid>
      </Box>
      <Box padding={2} paddingLeft={8}>
        <Heading size="lg" textDecoration="underline">
          Launched Campaigns
        </Heading>
      </Box>
      <Box alignItems="center" padding={2} paddingLeft={8}>
        <Grid templateColumns="repeat(4, 2fr)" gap={4}>
          {ads.map((ad: { AdId: string }) => (
            <AdCard AdId={ad.AdId} status="active" title="test" />
          ))}
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
