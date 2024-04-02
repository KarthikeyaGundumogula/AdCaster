import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
} from "@chakra-ui/react";

interface CreateAdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateFrameModal: React.FC<CreateAdModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [input1, setInput1] = useState("");
  const [input3, setInput3] = useState<File | null>(null);
  const [selectedAdId, setSelectedAdId] = useState("");
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);

  const ads = [
    {
      id: "ad1",
      field2: "Field 2 Value",
      field3: "Field 3 Value",
      field4: "Field 4 Value",
    },
    {
      id: "ad2",
      field2: "Field 2 Value",
      field3: "Field 3 Value",
      field4: "Field 4 Value",
    },
    {
      id: "ad3",
      field2: "Field 2 Value",
      field3: "Field 3 Value",
      field4: "Field 4 Value",
    },
  ];

  const handleInputChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setInput3(e.target.files[0]);
    }
  };

  const handleSubmit = () => {};

  // Event handlers
  const handleAdSelect = (adId: string) => {
    setSelectedAdId(adId);
    setIsAdModalOpen(false);
  };

  const openAdModal = () => {
    setIsAdModalOpen(true);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          color={"rgba(240, 80, 39, 1)"}
          sx={{
            opacity: 0.5,
            backdropFilter: "blur(4px)",
            backgroundImage:
              "radial-gradient(circle farthest-side at 100% 0, rgba(2, 139, 225, .09), rgba(46, 90, 246, .03) 50%, rgba(50, 124, 255, .1))",
            border: "2px solid rgba(240, 80, 39, .3)",
          }}
        >
          <ModalHeader>Create Frame</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={2}>
              <Input
                placeholder="Ad-Id"
                value={selectedAdId}
                onClick={openAdModal}
                onChange={() => {}}
              />
              <Input
                type="file"
                placeholder="Select your post"
                value={input3 ? input3.name : ""}
                onChange={handleInputChange3}
              />
              <Text>Your Frame URL</Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="orange"
              variant={"outline"}
              mr={3}
              onClick={handleSubmit}
            >
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isAdModalOpen}
        onClose={() => setIsAdModalOpen(false)}
        size={"3xl"}
      >
        <ModalOverlay />
        <ModalContent
          color={"rgba(240, 80, 39, 1)"}
          sx={{
            opacity: 0.5,
            backdropFilter: "blur(4px)",
            backgroundImage:
              "radial-gradient(circle farthest-side at 100% 0, rgba(2, 139, 225, .09), rgba(46, 90, 246, .03) 50%, rgba(50, 124, 255, .1))",
            border: "2px solid rgba(240, 80, 39, .3)",
          }}
        >
          <ModalHeader>Select Ad</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Ad ID</Th>
                  <Th>Title</Th>
                  <Th>Lead Reward</Th>
                  <Th>Click ReWard</Th>
                </Tr>
              </Thead>
              <Tbody>
                {/* Replace this with your actual data */}
                {ads.map((ad) => (
                  <Tr key={ad.id} onClick={() => handleAdSelect(ad.id)}>
                    <Td>{ad.id}</Td>
                    <Td>{ad.field2}</Td>
                    <Td>{ad.field3}</Td>
                    <Td>{ad.field4}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateFrameModal;
