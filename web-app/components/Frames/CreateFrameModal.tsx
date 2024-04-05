"use client";
import { useEffect, useState } from "react";
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
  FormControl,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { getGraphData } from "@/utils/GetData";

interface CreateAdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateFrameModal: React.FC<CreateAdModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [input3, setInput3] = useState<File | null>(null);
  const [selectedAdId, setSelectedAdId] = useState("");
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    frameTitle: "",
    frameDescription: "",
  });
  const { id } = useParams();

  const [ads, setAds] = useState<
    { id: string; title: string; subText: string }[]
  >([]);
  useEffect(() => {
    let isMounted = true;
    async function getData() {
      let query = `{
      publishers(where: {Publisher: "${id}"}) {
        Ads
      }
    }`;
      let data = await getGraphData(query);
      const ids = data?.data.data.publishers[0].Ads;
      ids.map(async (id: string) => {
        console.log(id);
        let query = `{
          ads(where: {AdId: "${id}"}) {
            AdId
            AdData
          }
        }`;
        let data = await getGraphData(query);
        console.log(data);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${data?.data.data.ads[0].AdData}`
        );
        const d = await res.json();
        if (!data?.data.data.ads) return;
        setAds((ads) => {
          const ad = {
            id: data?.data.data.ads[0].AdId,
            title: d.title,
            subText: d.pickUpLine,
          };
          if (isMounted && !ads.find((a) => a.id === ad.id)) {
            return [...ads, ad];
          }
          return ads;
        });
      });
    }
    getData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setInput3(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState);
  };

  // Event handlers
  const handleAdSelect = (adId: string) => {
    setSelectedAdId(adId);
    setIsAdModalOpen(false);
  };

  const openAdModal = async () => {
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
            <form onSubmit={handleSubmit}>
              <VStack spacing={2}>
                <FormControl isRequired>
                  <Input
                    name="frameTitle"
                    placeholder="Frame Title"
                    value={formState.frameTitle}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <Input
                    name="frameDescription"
                    placeholder="Frame Description"
                    value={formState.frameDescription}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <Input
                    type="text"
                    placeholder="Select Ad"
                    value={selectedAdId}
                    readOnly
                    onClick={openAdModal}
                  />
                </FormControl>
                <FormControl isRequired>
                  <Input
                    type="file"
                    placeholder="Select your post"
                    onChange={handleInputChange3}
                  />
                </FormControl>
                <Text
                  onClick={() =>
                    navigator.clipboard.writeText("https://adcast.com/frames/1")
                  }
                >
                  Your Frame URL
                </Text>
              </VStack>
              <ModalFooter>
                <Button
                  colorScheme="orange"
                  variant={"outline"}
                  mr={3}
                  type="submit"
                >
                  Create
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalBody>
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
                  <Th>Sub-Text</Th>
                </Tr>
              </Thead>
              <Tbody>
                {/* Replace this with your actual data */}
                {ads.map((ad) => (
                  <Tr key={ad.title} onClick={() => handleAdSelect(ad.id)}>
                    <Td>{ad.id}</Td>
                    <Td>{ad.title}</Td>
                    <Td>{ad.subText}</Td>
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
