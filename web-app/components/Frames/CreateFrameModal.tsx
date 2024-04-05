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
  useClipboard,
  HStack,
  Heading,
  FormControl,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { getGraphData } from "@/utils/GetData";
import { Caster } from "@/utils/CasterContract";
import { saveFileToIPFS } from "@/utils/saveFileToIPFS";
import { saveMetaDataToIPFS } from "@/utils/saveMetaDataToIPFS";

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
  const [frameCreating, setFrameCreating] = useState(false);
  const [adSubText, setAdSubText] = useState("");
  const [adDestinationUrl, setAdDestinationUrl] = useState("");
  const [adImage, setAdImage] = useState("");
  const [frameUrl, setFrameUrl] = useState(
    ""
  );
  const { hasCopied: hasUrlCopied, onCopy: onUrlCopy } = useClipboard(frameUrl);
  const [formState, setFormState] = useState({
    frameTitle: "",
    frameDescription: "",
  });
  const { id } = useParams();

  const [ads, setAds] = useState<
    {
      id: string;
      title: string;
      subText: string;
      destinationUrl: string;
      adImage: string;
    }[]
  >([]);
  useEffect(() => {
    let isMounted = true;
    async function getData() {
      let query = `{
      publishers(where: {Publisher: "${id}"}) {
        Ads
      }
    }`;
      try {
        let data = await getGraphData(query);
        const ids = data?.data.data.publishers[0].Ads;
        ids.map(async (id: string) => {
          let query = `{
          ads(where: {AdId: "${id}"}) {
            AdId
            AdData
          }
        }`;
          let data = await getGraphData(query);
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
              adImage: d.image,
              destinationUrl: d.destinationUrl,
            };
            if (isMounted && !ads.find((a) => a.id === ad.id)) {
              return [...ads, ad];
            }
            return ads;
          });
        });
      } catch (e) {
        console.error(e);
      }
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
    setFrameCreating(true);
    const ipfsHash = await saveFileToIPFS(input3!);
    const obj = {
      title: formState.frameTitle,
      description: formState.frameDescription,
      adId: selectedAdId,
      adSubText: adSubText,
      adImage: adImage,
      adDestinationUrl: adDestinationUrl,
      image: ipfsHash,
    };
    console.log(obj);
    const metaDataHash = await saveMetaDataToIPFS(obj);
    try {
      const caster = await Caster();
      let tx = await caster.createFrame(metaDataHash, selectedAdId);
      await tx.wait();
    } catch (e) {
      console.log(e);
    }
    setFrameUrl(`https://ad-caster.vercel.app/frames-api/${metaDataHash}`);
    setFrameCreating(false);
  };

  // Event handlers
  const handleAdSelect = (
    adId: string,
    adSubtext: string,
    adUrl: string,
    adImage: string
  ) => {
    setSelectedAdId(adId);
    setAdSubText(adSubtext);
    setAdDestinationUrl(adUrl);
    setAdImage(adImage);
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
                <HStack>
                  <Heading size="md">FrameUrl:</Heading>
                  <Text
                    color={"#01011f"}
                    onClick={onUrlCopy}
                    cursor="pointer"
                    fontStyle={"italic"}
                  >
                    {frameUrl.length > 13
                      ? `${frameUrl.substring(0, 25)}..`
                      : frameUrl}
                  </Text>
                  {hasUrlCopied && <Text color={"black"}>Copied!</Text>}
                </HStack>
              </VStack>
              <ModalFooter>
                <Button
                  isLoading={frameCreating}
                  loadingText="Creating.."
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
                  <Tr
                    key={ad.title}
                    onClick={() =>
                      handleAdSelect(
                        ad.id,
                        ad.subText,
                        ad.destinationUrl,
                        ad.adImage
                      )
                    }
                  >
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
