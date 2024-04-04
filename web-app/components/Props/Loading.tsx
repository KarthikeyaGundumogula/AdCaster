import React from "react";
import { Spinner, Center } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Center height={"100vh"} bg="rgba(0, 0, 0, 0.5)" zIndex={9999}>
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
