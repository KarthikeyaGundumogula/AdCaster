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
} from "@chakra-ui/react";

interface CreateAdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateAdModal: React.FC<CreateAdModalProps> = ({ isOpen, onClose }) => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");

  const handleInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput1(e.target.value);
  };

  const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput2(e.target.value);
  };

  const handleInputChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput3(e.target.value);
  };

  const handleSubmit = () => {
    // Handle form submission here
    // You can access the input values using input1, input2, input3
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Ad</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Input 1"
            value={input1}
            onChange={handleInputChange1}
          />
          <Input
            placeholder="Input 2"
            value={input2}
            onChange={handleInputChange2}
          />
          <Input
            placeholder="Input 3"
            value={input3}
            onChange={handleInputChange3}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Create
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateAdModal;
