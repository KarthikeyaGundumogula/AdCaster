import React from "react";
import { Box, Center, Grid, Heading } from "@chakra-ui/react";
import FrameCard from "@/components/Frames/Frame";

const Dashboard: React.FC = () => {
  return (
    <div>
      <Box padding={2} paddingLeft={8}>
        <Heading size="lg">Dashboard</Heading>
      </Box>
      <Box alignItems="center" padding={2} paddingLeft={8}>
      </Box>
    </div>
  );
};

export default Dashboard;
