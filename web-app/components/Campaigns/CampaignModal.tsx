import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Heading,
  Image,
  Grid,
  GridItem,
  HStack,
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
} from "@chakra-ui/react";
import { getGraphData } from "@/utils/GetData";
import { Caster } from "@/utils/CasterContract";

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  AdId: string;
}

const CampaignModal: React.FC<CampaignModalProps> = ({
  isOpen,
  onClose,
  AdId,
}) => {
  let title = "Frame";
  const [logo, setLogo] = useState(
    `https://picsum.photos/seed/${encodeURIComponent(title)}/200/300`
  );
  const [isCreatorModalOpen, setCreatorModalOpen] = React.useState(false);
  const [isAddAmountOpen, setAddAmountOpen] = React.useState(false);
  const [creators, setCreators] = useState([] as any);
  const [txProcessing, setTxprocessing] = useState(false);
  const [addedCreators, setAddedCreators] = useState([] as any);
  const [addedCreatorsModalOpen, setAddedCreatorsModalOpen] = useState(false);
  const [addAmount, setAddAmount] = useState("");

  const initialAds = [
    {
      title: "Campaign Title",
      value: "",
    },
    {
      title: "Campaign Status",
      value: "",
    },
    {
      title: "Campaign Budget",
      value: "",
    },
    {
      title: "Current Funds",
      value: "",
    },
    {
      title: "Total Views",
      value: "",
    },
    {
      title: "Total Leads",
      value: "",
    },
    {
      title: "Total Clicks",
      value: "",
    },
  ];
  const [ads, setAds] = useState(initialAds);

  useEffect(() => {
    async function getUser() {
      const query = `  
      {
        ads( where: {AdId: ${AdId} } ) {
          TotalFunds
          AdData
          AdStatus
          TotalClicks
          TotalViews
          CurrentFunds
        }
        publishers(first: 10) {
          PublisherFId
          ViewReward
          ClickReward
          Publisher
        }
      }
      `;
      const data = await getGraphData(query);
      if (data != undefined) {
        let a = initialAds.map((ad, index) => {
          switch (ad.title) {
            case "Campaign Status":
              return {
                ...ad,
                value: data.data.data.ads[0].AdStatus ? "Online" : "Offline",
              };
            case "Campaign Budget":
              return { ...ad, value: data.data.data.ads[0].TotalFunds };
            case "Current Funds":
              return { ...ad, value: data.data.data.ads[0].CurrentFunds };
            case "Total Views":
              return { ...ad, value: data.data.data.ads[0].TotalViews };
            case "Total Leads":
              return { ...ad, value: data.data.data.ads[0].TotalViews };
            case "Total Clicks":
              return { ...ad, value: data.data.data.ads[0].TotalClicks };
            default:
              return ad;
          }
        });
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${data.data.data.ads[0].AdData}`
        );
        const title = await res.json();
        a[0].value = title.title;
        setLogo(
          `${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${title.image}`
        );
        setAds(a);
        setCreators(data.data.data.publishers);
      }
    }
    getUser();
  }, [AdId]);

  const handleAddCreatorModal = () => {
    setCreatorModalOpen(true);
  };

  const handleCreatorModalClose = () => {
    setCreatorModalOpen(false);
  };

  const handleAddAmountModalClose = () => {
    setAddAmountOpen(false);
  };

  const handleAddAmountModalOpen = () => {
    setAddAmountOpen(true);
  };

  const handleCampaignStatus = async () => {
    setTxprocessing(true);
    if (ads[1].value === "Online") {
      try {
        const caster = await Caster();
        const tx = await caster.stopCampaign(AdId);
        await tx.wait();
      } catch (e) {
        console.log(e);
      }
    }
    if (ads[1].value === "Offline") {
      try {
        const caster = await Caster();
        const tx = await caster.startCampaign(AdId);
        await tx.wait();
      } catch (e) {
        console.log(e);
      }
    }
    setTxprocessing(false);
  };

  const handleAddCreator = async (Publisher: string) => {
    setTxprocessing(true);
    try {
      const caster = await Caster();
      const tx = await caster.SubscribetoPublisher(AdId, Publisher);
      await tx.wait();
    } catch (e) {
      console.log(e);
    }
    setTxprocessing(false);
  };

  const handleGetAddedCreatorsModalOpen = () => {
    setAddedCreatorsModalOpen(true);
    const query = ` {
      ads(where: { AdId: ${AdId} } ) {
        Publishers
    }
  }`;
    getGraphData(query).then((data) => {
      setAddedCreators(data?.data?.data?.ads[0]?.Publishers);
    });
  };

  const handleAddedCreatorsModalClose = () => {
    setAddedCreatorsModalOpen(false);
  };

  const handleAddFunds = async () => {
    setTxprocessing(true);
    try {
      const caster = await Caster();
      const tx = await caster.addFundsToCampaign(AdId, addAmount);
      await tx.wait();
    } catch (e) {
      console.log(e);
    }
    setTxprocessing(false);
    handleAddAmountModalClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="75%" isCentered={true}>
        <ModalOverlay />
        <ModalContent
          height="500px"
          width="85%"
          color={"rgba(240, 80, 39, 1)"}
          sx={{
            opacity: 0.5,
            backdropFilter: "blur(4px)",
            backgroundImage:
              "radial-gradient(circle farthest-side at 100% 0, rgba(2, 239, 225, .09), rgba(46, 29, 246, .03) 50%, rgba(0, 224, 255, .1))",
            border: "2px solid rgba(240, 80, 39, .3)",
          }}
        >
          <ModalHeader textDecoration={"underline"} fontStyle={"oblique"}>
            Campaign Details
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid
              templateColumns="repeat(4, 1fr)"
              templateRows="repeat(3,1fr)"
              gap={2}
            >
              <GridItem rowSpan={3} colSpan={1}>
                <Image
                  src={logo}
                  alt="frame"
                  width={500}
                  height={300}
                  objectFit="cover"
                  borderRadius={12}
                />
              </GridItem>
              {ads.map((ad) => (
                <GridItem rowSpan={1} colSpan={1} key={ad.title}>
                  <HStack>
                    <Heading size="md">{ad.title}:</Heading>
                    <Heading size="md" color={"brown"}>
                      {ad.value}
                    </Heading>
                  </HStack>
                </GridItem>
              ))}
              <GridItem rowSpan={1} colSpan={2}>
                <Button
                  colorScheme="blue"
                  variant={"outline"}
                  onClick={handleGetAddedCreatorsModalOpen}
                >
                  Added Creators{" "}
                </Button>
              </GridItem>
            </Grid>
            <Center>
              <HStack>
                <Button
                  colorScheme="orange"
                  variant={"outline"}
                  onClick={handleAddAmountModalOpen}
                >
                  Add Funds
                </Button>
                <Button
                  colorScheme="green"
                  variant={"outline"}
                  onClick={handleAddCreatorModal}
                  isDisabled={ads[1].value === "Offline"}
                >
                  Add Creator
                </Button>
                <Button
                  isLoading={txProcessing}
                  loadingText="processing.."
                  colorScheme="red"
                  variant={"outline"}
                  onClick={handleCampaignStatus}
                >
                  {ads[1].value === "Online"
                    ? "Stop Campaign"
                    : "Start Campaign"}
                </Button>
              </HStack>
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isAddAmountOpen} onClose={handleAddAmountModalClose}>
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
          <ModalHeader>Add Funds</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Amount"
              type="Number"
              onChange={(e) => {
                setAddAmount(e.target.value);
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              variant={"outline"}
              isLoading={txProcessing}
              loadingText="adding.."
              onClick={handleAddFunds}
            >
              Add
            </Button>
            <Button onClick={handleAddAmountModalClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isCreatorModalOpen}
        onClose={handleCreatorModalClose}
        size="lg"
        isCentered={true}
      >
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
          <ModalHeader textDecoration={"underline"} fontStyle={"oblique"}>
            Add Creators
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th textAlign={"center"} fontWeight={"bold"}>
                    Creator ID
                  </Th>
                  <Th textAlign={"center"} fontWeight={"bold"}>
                    Lead Cost
                  </Th>
                  <Th textAlign={"center"} fontWeight={"bold"}>
                    Click Reward
                  </Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {creators.map((creator: any) => (
                  <Tr key={creator.PublisherFIdFID}>
                    <Td textAlign={"center"}>{creator.PublisherFId}</Td>
                    <Td textAlign={"center"}>{creator.ViewReward}</Td>
                    <Td textAlign={"center"}>{creator.ClickReward}</Td>
                    <Td>
                      <Button
                        isLoading={txProcessing}
                        loadingText="adding.."
                        colorScheme="green"
                        variant="outline"
                        onClick={() => {
                          handleAddCreator(creator.Publisher);
                        }}
                      >
                        Add
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleCreatorModalClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={addedCreatorsModalOpen}
        onClose={handleAddedCreatorsModalClose}
      >
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
          <ModalHeader>Added Creators</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th textAlign={"center"} fontWeight={"bold"}>
                    Creator Address
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {/* Replace this with your actual data */}
                {addedCreators.map((creator: any) => (
                  <Tr key={creator}>
                    <Td textAlign={"center"}>{creator}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleAddedCreatorsModalClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CampaignModal;
