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
import React, { useState, useEffect } from "react";
import { SignInButton } from "@farcaster/auth-kit";
import { Caster } from "@/utils/CasterContract";
import { useParams } from "next/navigation";
import Loading from "@/components/Props/Loading";
import { formatUnits } from "ethers";

const EarningsComponent = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [txProcessing, setTxProcesssing] = useState(false);
  const [isPublisher, setIsPublisher] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addr } = useParams();
  const [tileData, setTileData] = useState([
    {
      title: "ADCST Balance",
      value: "0.00",
    },
    {
      title: "Unclaimed Earnings",
      value: "0",
    },
    {
      title: "Click Earnings",
      value: "0.00",
    },
    {
      title: "Lead Earnings",
      value: "0.00",
    },
    {
      title: "Lead Charge",
      value: "0.00",
    },
    {
      title: "Click Charge",
      value: "0.00",
    },
  ]);
  const [formState, setFormState] = useState({
    Address: "",
    FID: "",
    LeadCharge: "",
    ClickCharge: "",
  });

  useEffect(() => {
    async function getUser() {
      setIsLoading(true);
      const caster = await Caster();
      const balance = await caster.balanceOf(addr, 0);
      const publisherStatus = await caster.IsPublisher(addr);
      const publisher = await caster.addressToPublisher(addr);
      console.log(publisher[6]);
      setIsPublisher(publisherStatus);
      setTileData((prevData) => {
        return prevData.map((item) => {
          switch (item.title) {
            case "ADCST Balance":
              return { ...item, value: formatUnits(balance, 0) };
            case "Unclaimed Earnings":
              return { ...item, value: formatUnits(publisher[6], 0) };
            case "Click Earnings":
              return { ...item, value: formatUnits(publisher[4], 0) };
            case "Lead Earnings":
              return { ...item, value: formatUnits(publisher[5], 0) };
            case "Lead Charge":
              return { ...item, value: formatUnits(publisher[3], 0) };
            case "Click Charge":
              return { ...item, value: formatUnits(publisher[2], 0) };
            default:
              return item;
          }
        });
      });
      setIsLoading(false);
    }
    getUser();
  }, []);

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
    setTxProcesssing(true);
    try {
      const caster = await Caster();
      const tx = await caster.createPublisher(
        formState.ClickCharge,
        formState.LeadCharge,
        formState.FID
      );
      await tx.wait();
    } catch (error) {
      console.log(error);
    }
    setTxProcesssing(false);
    handleRegisterModalClose();
  };

  const handleClaimEarnigs = async () => {
    setTxProcesssing(true);
    try {
      const caster = await Caster();
      const tx = await caster.claimEarnings();
      await tx.wait();
    } catch (error) {
      console.log(error);
    }
    setTxProcesssing(false);
  };

  const handleGetADCSTTokens = async () => {
    setTxProcesssing(true);
    try {
      const caster = await Caster();
      const tx = await caster.getAdTokens();
      await tx.wait();
    } catch (e) {
      console.log(e);
    }
    setTxProcesssing(false);
  };
  return (
    <>
      {isLoading && <Loading />}
      <Header />
      <Center paddingTop={3}>
        {!isPublisher && (
          <Button
            variant={"outline"}
            colorScheme="orange"
            onClick={handleRegisterModalOpen}
          >
            Become Publisher
          </Button>
        )}
        {/* <SignInButton /> */}
        <Button
          isLoading={txProcessing}
          loadingText="transferring.."
          variant={"outline"}
          colorScheme="red"
          onClick={handleGetADCSTTokens}
        >
          Get ADCSTs
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
      <Center>
        <Button
          variant={"outline"}
          colorScheme="orange"
          isLoading={txProcessing}
          loadingText="transferring Funds"
          onClick={handleClaimEarnigs}
          isDisabled={tileData[1].value < "0"}
        >
          Claim Earnigs
        </Button>
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
                    name="Address"
                    placeholder="Address associated with FID"
                    value={formState.Address}
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
                    name="LeadCharge"
                    placeholder="Charge per Lead"
                    type="number"
                    value={formState.LeadCharge}
                    onChange={handleInputChange}
                    required
                  />
                </FormControl>
                <FormControl isRequired>
                  <Input
                    name="ClickCharge"
                    placeholder="Charge per Click"
                    value={formState.ClickCharge}
                    onChange={handleInputChange}
                    required
                  />
                </FormControl>
              </VStack>
              <ModalFooter>
                <Button
                  colorScheme="orange"
                  variant="outline"
                  type="submit"
                  isLoading={txProcessing}
                  loadingText="Adding.."
                >
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
