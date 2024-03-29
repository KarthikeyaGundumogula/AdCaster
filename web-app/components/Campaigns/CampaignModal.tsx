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

  const handleAddCreatorModal = () => {
    setCreatorModalOpen(true);
  };

  const handleCreatorModalClose = () => {
    setCreatorModalOpen(false);
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
          <ModalHeader>Frame Options</ModalHeader>
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
                <Button colorScheme="blue">Add Funds</Button>
                <Button colorScheme="green" onClick={handleAddCreatorModal}>
                  Add Creator
                </Button>
              </HStack>
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isCreatorModalOpen}
        onClose={handleCreatorModalClose}
        size="75%"
        isCentered={true}
      >
        <ModalOverlay />
        <ModalContent height="500px" width="85%">
          <ModalHeader textDecoration={"underline"} fontStyle={"oblique"}>
            Creators
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns="repeat(5, 1fr)" gap={2}>
              <GridItem colSpan={1}>
                <Heading size="md">Name</Heading>
              </GridItem>
              <GridItem colSpan={1}>
                <Heading size="md">Followers</Heading>
              </GridItem>
              <GridItem colSpan={1}>
                <Heading size="md">Ad Cost</Heading>
              </GridItem>
              <GridItem colSpan={1}>
                <Heading size="md">Platforms: {""}</Heading>
              </GridItem>
              <GridItem colSpan={1}>
                <Button colorScheme="green">Add Creator</Button>
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={handleCreatorModalClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CampaignModal;
