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
} from "@chakra-ui/react";

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CampaignModal: React.FC<CampaignModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Frame Options</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Heading size="md">Option 1</Heading>
          <Heading size="md">Option 2</Heading>
          <Heading size="md">Option 3</Heading>
          <Heading size="md">Option 4</Heading>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CampaignModal;
