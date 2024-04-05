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
import { saveFileToIPFS } from "@/utils/saveFileToIPFS";
import { saveMetaDataToIPFS } from "@/utils/saveMetaDataToIPFS";
import { Caster } from "@/utils/CasterContract";

interface CreateAdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateAdModal: React.FC<CreateAdModalProps> = ({ isOpen, onClose }) => {
  const [txProcessing, setTxProcesssing] = useState(false);
  const [adImage, setAdImage] = useState<File>();
  const [formState, setFormState] = useState({
    adTitle: "",
    adPickUpLine: "",
    totalBudget: "",
    url: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAdImage(e.target.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (adImage) {
      setTxProcesssing(true);
      console.log(adImage);
      const ipfsHash = await saveFileToIPFS(adImage);
      console.log(ipfsHash);
      if (ipfsHash) {
        const obj = {
          title: formState.adTitle,
          pickUpLine: formState.adPickUpLine,
          destinationUrl: formState.url,
          image: ipfsHash,
        };
        const metaDataHash = await saveMetaDataToIPFS(obj);
        console.log(metaDataHash);
        try {
          const caster = await Caster();
          const tx = await caster.createAd(metaDataHash, formState.totalBudget);
          await tx.wait();
        } catch (e) {
          console.log(e);
        }
      }
      setTxProcesssing(false);
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
                <Input
                  name="url"
                  placeholder="Ad Destination url"
                  value={formState.url}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl isRequired>
                <Input name="image" type="file" onChange={handleImageUpload} />
              </FormControl>
            </VStack>
            <ModalFooter>
              <Button
                colorScheme="orange"
                variant="outline"
                type="submit"
                isLoading={txProcessing}
                loadingText="Creating.."
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
