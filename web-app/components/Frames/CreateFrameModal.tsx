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

  const handleInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput1(e.target.value);
  };

  const handleInputChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setInput3(e.target.files[0]);
    }
  };

  const handleSubmit = () => {};

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Frame</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={2}>
            <Input
              placeholder="Ad-Id"
              value={input1}
              onChange={handleInputChange1}
            />
            <Input
              type="file"
              placeholder="Input 3"
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
  );
};

export default CreateFrameModal;
