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
  VStack,
} from "@chakra-ui/react";
import { pinFileToIPFS } from "@/utils/saveFileToIPFS";
import { saveMetaDataToIPFS } from "@/utils/saveMetaDataToIPFS";
import { BrowserProvider, Contract } from "ethers";
import { Address, ABI } from "@/Constants/ContractDetails";

interface CreateAdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateAdModal: React.FC<CreateAdModalProps> = ({ isOpen, onClose }) => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState<File | null>(null);
  const [input4, setInput4] = useState("");

  const handleInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput1(e.target.value);
  };

  const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput2(e.target.value);
  };
  const handleInputChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setInput3(e.target.files[0]);
    }
  };
  const handleInputChange4 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput4(e.target.value);
  };

  const handleSubmit = async () => {
    console.log(input3);
    if (input3) {
      const ipfsHash = await pinFileToIPFS(input3);
      console.log(ipfsHash);
      const obj = {
        title: input1,
        pickUpLine: input2,
        image: ipfsHash,
      };
      const metaDataHash = await saveMetaDataToIPFS(obj);
      console.log(metaDataHash);
      const provider = new BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const server = new Contract(Address, ABI, signer);
      const tx = await server.createAd(metaDataHash, input4);
      await tx.wait();
      onClose();
    }
    console.log("fuck");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Ad</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={2}>
            <Input
              placeholder="Ad Title"
              value={input1}
              onChange={handleInputChange1}
            />
            <Input
              placeholder="Ad Pick-up line"
              value={input2}
              onChange={handleInputChange2}
            />
            <Input
              placeholder="Total Budgget in ADCAST"
              value={input4}
              onChange={handleInputChange4}
            />
            <Input
              placeholder="Image "
              type="file"
              onChange={handleInputChange3}
            />
          </VStack>
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
