import React from "react";
import { Spinner, Center } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Center height={"90vh"}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="white"
        color="orange.500"
        size="xl"
      />
    </Center>
  );
};

export default Loading;
