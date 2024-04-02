import React from "react";
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
  const logo = `https://picsum.photos/seed/${encodeURIComponent(
    title
  )}/200/300`;
  const [isCreatorModalOpen, setCreatorModalOpen] = React.useState(false);
  const [isAddAmountOpen, setAddAmountOpen] = React.useState(false);

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

  const creators = [
    { id: 1, field2: "Creator 1", field3: "10", field4: "5" },
    { id: 2, field2: "Creator 2", field3: "20", field4: "10" },
    { id: 3, field2: "Creator 3", field3: "15", field4: "8" },
  ];

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
          <ModalHeader>Campaign Details</ModalHeader>
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
                />
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <Heading size="md">Frame Title</Heading>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <Heading size="md">Frame Status</Heading>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <Heading size="md">Frame Budget</Heading>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <Heading size="md">Total Spent</Heading>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <Heading size="md">Total views</Heading>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <Heading size="md">Total Leads</Heading>
              </GridItem>
              <GridItem rowSpan={1} colSpan={3}>
                <Heading size="md">Total Clicks</Heading>
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
                >
                  Add Creator
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
            <Input placeholder="Amount" type="Number" />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" variant={"outline"}>
              Add
            </Button>
            <Button onClick={handleAddAmountModalClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isCreatorModalOpen}
        onClose={handleCreatorModalClose}
        size="3xl"
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
            Creators
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
                    Followers
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
                {/* Replace this with your actual data */}
                {creators.map((creator) => (
                  <Tr key={creator.id}>
                    <Td textAlign={"center"}>{creator.id}</Td>
                    <Td textAlign={"center"}>{creator.field2}</Td>
                    <Td textAlign={"center"}>{creator.field3}</Td>
                    <Td textAlign={"center"}>{creator.field4}</Td>
                    <Td>
                      <Button
                        isLoading={false}
                        loadingText="Adding"
                        colorScheme="green"
                        variant="outline"
                      >
                        Add Creator
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
    </>
  );
};

export default CampaignModal;
