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
        <Grid templateColumns="repeat(3, 2fr)" gap={4}>
          <FrameCard
            title="Social Briks"
            options={["red", "blue", "white", "fuck"]}
            status="active"
          />
        </Grid>
      </Box>
    </div>
  );
};

export default Dashboard;
