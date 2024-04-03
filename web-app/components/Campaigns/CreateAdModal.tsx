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
  FormControl,
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
  const [formState, setFormState] = useState({
    adTitle: "",
    adPickUpLine: "",
    totalBudget: "",
    image: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState.image) {
      const ipfsHash = await pinFileToIPFS(formState.image);
      console.log(ipfsHash);
      const obj = {
        title: formState.adTitle,
        pickUpLine: formState.adPickUpLine,
        image: ipfsHash,
      };
      const metaDataHash = await saveMetaDataToIPFS(obj);
      console.log(metaDataHash);
      const provider = new BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const server = new Contract(Address, ABI, signer);
      const tx = await server.createAd(metaDataHash, formState.totalBudget);
      await tx.wait();
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        color={"rgba(240, 80, 39, 1)"}
        sx={{
          opacity: 0.5,
          backdropFilter: "blur(4px)",
          backgroundImage:
            "radial-gradient(circle farthest-side at 100% 0, rgba(2, 239, 225, .09), rgba(46, 90, 246, .03) 50%, rgba(50, 224, 255, .1))",
          border: "2px solid rgba(240, 80, 39, .3)",
        }}
      >
        <ModalHeader>Create Ad</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={2}>
              <FormControl isRequired>
                <Input
                  name="adTitle"
                  placeholder="Ad Title"
                  value={formState.adTitle}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl isRequired>
                <Input
                  name="adPickUpLine"
                  placeholder="Ad Pick-up line"
                  value={formState.adPickUpLine}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl isRequired>
                <Input
                  name="totalBudget"
                  placeholder="Total Budget in ADCAST"
                  type="number"
                  value={formState.totalBudget}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl isRequired>
                <Input name="image" type="file" onChange={handleInputChange} />
              </FormControl>
            </VStack>
            <ModalFooter>
              <Button
                colorScheme="orange"
                variant="outline"
                type="submit"
                isLoading={false}
                loadingText="Creating"
              >
                Submit
              </Button>{" "}
              <Button onClick={onClose} colorScheme="red">
                Close
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateAdModal;
