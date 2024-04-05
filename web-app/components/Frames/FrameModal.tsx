import React, { useEffect, useState } from "react";
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
  useClipboard,
  Text,
  FormControl,
  FormLabel,
  Input,
  Center,
} from "@chakra-ui/react";
import { getGraphData } from "@/utils/GetData";
import { Caster } from "@/utils/CasterContract";

interface FrameModalProps {
  isOpen: boolean;
  onClose: () => void;
  frameId: string;
}

const FrameModal: React.FC<FrameModalProps> = ({
  isOpen,
  onClose,
  frameId,
}) => {
  let title = "Frame";
  const log = `https://picsum.photos/seed/${encodeURIComponent(title)}/200/300`;

  const [frameTitle, setFrameTitle] = useState("");
  const [frameDescription, setFrameDescription] = useState("");
  const [totalViews, setTotalViews] = useState("");
  const [totalClicks, setTotalClicks] = useState("");
  const [totalEarnings, setTotalEarnings] = useState("");
  const [adId, setAdId] = useState("");
  const [logo, setLogo] = useState(log);
  const [cast, setCast] = useState(log);
  const [isUpdateCastURl, setIsUpdateCastURl] = useState(false);
  const [txProcessing, setTxProcessing] = useState(false);
  const [ad, setAd] = useState({
    Advertiser: "",
    Title: "",
    PickUpLine: "",
    Image: "",
  });
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);

  const { hasCopied: hasUrlCopied, onCopy: onUrlCopy } = useClipboard(cast);
  useEffect(() => {
    async function getUser() {
      const query = `  
      {
        frames(where: {FrameId: "${frameId}"}) {
          AdId
          FrameId
          TotalClicks
          TotalViews
          TotalEarnings
          CastedURL
        }
      }
      `;
      const data = await getGraphData(query);
      if (data != undefined) {
        setAdId(data.data.data.frames[0].AdId);
        setTotalClicks(data.data.data.frames[0].TotalClicks);
        setTotalViews(data.data.data.frames[0].TotalViews);
        setTotalEarnings(data.data.data.frames[0].TotalEarnings);
        setCast(data.data.data.frames[0].CastedURL);
        const query = `  
        {
          ads(where: {AdId: "${data.data.data.frames[0].AdId}"}) {
            Advertiser
            AdData
          }
        }
        `;
        const res = await getGraphData(query);
        if (res) {
          let da = await fetch(
            `${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${res.data.data.ads[0].AdData}`
          );
          let a = await da.json();
          const obj = {
            Title: a.title,
            PickUpLine: a.pickUpLine,
            Image: a.image,
            Advertiser: res.data.data.ads[0].Advertiser,
          };
          setAd(obj);
          da = await fetch(
            `${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${frameId}`
          );
          a = await da.json();
          setFrameTitle(a.title);
          setFrameDescription(a.description);
          setLogo(`${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${a.image}`);
        } else {
          console.error("Data structure is not as expected");
        }
      }
    }
    getUser();
  }, [frameId]);
  const handleUpdateCast = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTxProcessing(true);
    try {
      const caster = await Caster();
      const tx = await caster.castFrame(frameId, cast);
    } catch (e) {
      console.error(e);
    }
    setTxProcessing(false);
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
            opacity: 0.8,
            backdropFilter: "blur(2px)",
            backgroundImage:
              "radial-gradient(circle farthest-side at 100% 0, rgba(2, 239, 225, .09), rgba(46, 29, 246, .03) 70%, rgba(0, 224, 255, .1))",
            border: "1px solid rgba(240, 80, 39, .3)",
          }}
        >
          <ModalHeader>Frame Details</ModalHeader>
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
                  borderRadius={12}
                />
              </GridItem>
              {[
                { title: "Frame Title", value: frameTitle },
                {
                  title: "Frame Description",
                  value: frameDescription,
                },
                { title: "Total Views", value: totalViews },
                { title: "Total Leads", value: totalViews },
                {
                  title: "Total Clicks",
                  value: totalClicks,
                },
                {
                  title: "Total Earnings",
                  value: totalEarnings,
                },
              ].map((item, index) => (
                <GridItem key={index} rowSpan={1} colSpan={index === 1 ? 2 : 1}>
                  <HStack>
                    <Heading size="md">{item.title}:</Heading>
                    <Text color="#01011f">{item.value}</Text>
                  </HStack>
                </GridItem>
              ))}
              <GridItem rowSpan={1} colSpan={1}>
                <HStack>
                  <Heading size="md" paddingLeft={3}>
                    AD:
                  </Heading>
                  <Button
                    colorScheme="orange"
                    variant={"outline"}
                    onClick={() => setIsAdModalOpen(true)}
                  >
                    {adId}
                  </Button>
                </HStack>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <HStack>
                  <Heading size="md">CAST:</Heading>
                  <Text
                    color={"#01011f"}
                    onClick={onUrlCopy}
                    cursor="pointer"
                    fontStyle={"italic"}
                  >
                    {cast.length > 13 ? `${cast.substring(0, 25)}..` : cast}
                  </Text>
                  {hasUrlCopied && <Text color={"black"}>Copied!</Text>}
                </HStack>
              </GridItem>
            </Grid>
            <Center>
              <Button
                colorScheme="orange"
                variant={"outline"}
                onClick={() => setIsUpdateCastURl(true)}
              >
                Update Cast
              </Button>
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
      <Modal isOpen={isAdModalOpen} onClose={() => setIsAdModalOpen(false)}>
        <ModalOverlay />
        <ModalContent
          color={"rgba(240, 80, 39, 1)"}
          sx={{
            opacity: 0.8,
            backdropFilter: "blur(2px)",
            backgroundImage:
              "radial-gradient(circle farthest-side at 100% 0, rgba(2, 239, 225, .09), rgba(46, 29, 246, .03) 70%, rgba(0, 224, 255, .1))",
            border: "1px solid rgba(240, 80, 39, .3)",
          }}
        >
          <ModalHeader>Ad Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid
              templateColumns="repeat(2, 1fr)"
              templateRows="repeat(3, 1fr)"
              gap={2}
            >
              <GridItem rowSpan={3} colSpan={1}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${ad.Image}`}
                  alt="Ad Image"
                  h={40}
                  width={40}
                  borderRadius={12}
                />
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <HStack>
                  <Heading size="md">Advertiser:</Heading>
                  <Text color={"brown"}>
                    {ad.Advertiser.length > 20
                      ? `${ad.Advertiser.substring(0, 20)}..`
                      : ad.Advertiser}
                  </Text>
                </HStack>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <HStack>
                  <Heading size="md">Title:</Heading>
                  <Text color={"brown"}>{ad.Title}</Text>
                </HStack>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <HStack>
                  <Heading size="md">PickUpLine:</Heading>
                  <Text color={"brown"}>{ad.PickUpLine}</Text>
                </HStack>
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isUpdateCastURl} onClose={() => setIsUpdateCastURl(false)}>
        <ModalOverlay />
        <ModalContent
          color={"rgba(240, 80, 39, 1)"}
          sx={{
            opacity: 0.8,
            backdropFilter: "blur(2px)",
            backgroundImage:
              "radial-gradient(circle farthest-side at 100% 0, rgba(2, 239, 225, .09), rgba(46, 29, 246, .03) 70%, rgba(0, 224, 255, .1))",
            border: "1px solid rgba(240, 80, 39, .3)",
          }}
        >
          <ModalHeader>Update Cast URL</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleUpdateCast}>
              <FormControl id="castUrl" isRequired>
                <FormLabel>Cast URL</FormLabel>
                <Input
                  type="text"
                  value={cast}
                  onChange={(e) => setCast(e.target.value)}
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                mt={4}
                isLoading={txProcessing}
                loadingText="updating.."
              >
                Update Cast URL
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsUpdateCastURl(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FrameModal;
