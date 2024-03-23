"use client";
import React, { useState } from "react";
import { Box, Center, Grid, Heading } from "@chakra-ui/react";
import FrameCard from "@/components/Frames/Frame";
import Header from "@/components/Header";

const Dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Header />
      <Box padding={2} paddingLeft={8}>
        <Heading size="lg" textDecoration="underline">
          Casted Frames
        </Heading>
      </Box>
      <Box alignItems="center" padding={2} paddingLeft={8}>
        <Grid templateColumns="repeat(4, 2fr)" gap={4}>
          <FrameCard title="Social Briks" status="ano" />
          <FrameCard title="Social Briks" status="ano" />
          <FrameCard title="Social Briks" status="ano" />
          <FrameCard title="Social Briks" status="ano" />
          <FrameCard title="Social Briks" status="ano" />
          <FrameCard title="Social Briks" status="ano" />
          <FrameCard title="Social Briks" status="ano" />
          <FrameCard title="Social Briks" status="ano" />
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
          <FrameCard title="Social Briks" status="ano" />
          <FrameCard title="Social Briks" status="ano" />
          <FrameCard title="Social Briks" status="ano" />
          <FrameCard title="Social Briks" status="ano" />
          <FrameCard title="Social Briks" status="ano" />
          <FrameCard title="Social Briks" status="ano" />
        </Grid>
      </Box>
    </div>
  );
};

export default Dashboard;
