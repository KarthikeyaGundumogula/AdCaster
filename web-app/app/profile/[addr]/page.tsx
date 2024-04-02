"use client";
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalFooter,
  ModalHeader,
  Input,
  ModalContent,
  FormControl,
  VStack,
} from "@chakra-ui/react";
import Header from "@/components/Header";
import React, { useState } from "react";

const EarningsComponent = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [tileData, setTileData] = useState([
    {
      title: "Total Ads",
      value: "0.00",
    },
    {
      title: "Total Earnings",
      value: "0.00",
    },
    {
      title: "ADCST Balance",
      value: "0.00",
    },
    {
      title: "Total Publishers",
      value: "0.00",
    },
    {
      title: "Total Advertisers",
      value: "0.00",
    },
    {
      title: "Total Frames",
      value: "0.00",
    },
  ]);
  const [formState, setFormState] = useState({
    Name: "",
    FID: "",
    LeadCharge: "",
    ClickCharge: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterModalOpen = () => {
    setIsRegisterOpen(true);
  };
  const handleRegisterModalClose = () => {
    setIsRegisterOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState);
    handleRegisterModalClose();
  };

  return (
    <>
      <Header />
      <Center paddingTop={3}>
        <Button
          variant={"outline"}
          colorScheme="orange"
          onClick={handleRegisterModalOpen}
        >
          Become Publisher
        </Button>
      </Center>
      <Center>
        <Grid
          templateColumns="repeat(3, 1fr)"
          templateRows="repeat(2,1fr)"
          gap={30}
          height={500}
          p={10}
        >
          {tileData.map((tile) => (
            <GridItem key={tile.title}>
              <Box
                height={200}
                padding={10}
                borderRadius={12}
                _hover={{
                  transform: "scale(1.1)",
                  transition: "0.5s",
                }}
                sx={{
                  opacity: 0.8,
                  backdropFilter: "blur(2px)",
                  backgroundImage:
                    "radial-gradient(circle farthest-side at 100% 0, rgba(2, 239, 225, .09), rgba(46, 29, 246, .03) 50%, rgba(0, 224, 255, .1))",
                  border: "1px solid rgba(240, 80, 39, .3)",
                }}
              >
                <Center>
                  <Box>
                    <Heading size={"lg"}> {tile.title} </Heading>
                    <Box>{tile.value}</Box>
                  </Box>
                </Center>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Center>
      <Modal isOpen={isRegisterOpen} onClose={handleRegisterModalClose}>
        <ModalOverlay />
        <ModalContent
          color={"rgba(240, 80, 39, 1)"}
          sx={{
            opacity: 0.5,
            backdropFilter: "blur(4px)",
            backgroundImage:
              "radial-gradient(circle farthest-side at 100% 0, rgba(2, 239, 225, .09), rgba(46, 29, 246, .03) 50%, rgba(0, 224, 255, .1))",
            border: "2px solid rgba(240, 80, 39, .3)",
          }}
        >
          <ModalHeader>Register Publisher</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <VStack spacing={2}>
                <FormControl isRequired>
                  <Input
                    name="Name"
                    placeholder="name"
                    value={formState.Name}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <Input
                    name="FID"
                    placeholder="FID"
                    value={formState.FID}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <Input
                    name="leadCharge"
                    placeholder="Charge per Lead"
                    type="number"
                    value={formState.LeadCharge}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <Input
                    name="clcikCharge"
                    placeholder="Charge per Click"
                    type="number"
                    value={formState.ClickCharge}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </VStack>
              <ModalFooter>
                <Button colorScheme="orange" variant="outline" type="submit">
                  Submit
                </Button>
                <Button onClick={handleRegisterModalClose} colorScheme="red">
                  {" "}
                  Close
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EarningsComponent;
