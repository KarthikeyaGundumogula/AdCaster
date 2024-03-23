import React from "react";
import { Box, Center, Grid, Heading } from "@chakra-ui/react";
import Header from "@/components/Header";

const Dashboard: React.FC = () => {
  return (
    <div>
      <Header />
      <Center>
        <Heading>Welcome to Ad-Caster</Heading>
      </Center>
    </div>
  );
};

export default Dashboard;
