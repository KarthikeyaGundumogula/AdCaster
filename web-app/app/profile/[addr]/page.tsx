import { Box, Center, Grid, GridItem, Heading } from "@chakra-ui/react";
import Header from "@/components/Header";

const EarningsComponent = () => {
  return (
    <>
      <Header />
      <Center>
        <Grid
          templateColumns="repeat(3, 1fr)"
          templateRows="repeat(2,1fr)"
          gap={30}
          height={500}
          p={10}
        >
          <GridItem>
            <Box
              height={200}
              borderBlockStart={1}
              borderWidth={2}
              borderColor={"black"}
              padding={10}
              borderRadius={12}
              boxShadow={"xl"}
              _hover={{
                height: 220,
              }}
            >
              <Center>
                <Box>
                  <Heading> No.Of Frames</Heading>
                  <Box>
                    0.
                    <Box as="span">00</Box>
                  </Box>
                </Box>
              </Center>
            </Box>
          </GridItem>
          <GridItem>
            <Box
              height={200}
              borderBlockStart={1}
              borderWidth={2}
              borderColor={"black"}
              padding={10}
              borderRadius={12}
              boxShadow={"xl"}
              _hover={{
                height: 220,
              }}
            >
              <Center>
                <Box>
                  <Heading> Total Ads</Heading>
                  <Box>
                    0.
                    <Box as="span">00</Box>
                  </Box>
                </Box>
              </Center>
            </Box>
          </GridItem>
          <GridItem>
            <Box
              height={200}
              borderBlockStart={1}
              borderWidth={2}
              borderColor={"black"}
              padding={10}
              borderRadius={12}
              boxShadow={"xl"}
              _hover={{
                height: 220,
              }}
            >
              <Center>
                <Box>
                  <Heading> ADCAST Balance</Heading>
                  <Box>
                    0.
                    <Box as="span">00</Box>
                  </Box>
                </Box>
              </Center>
            </Box>
          </GridItem>
          <GridItem>
            <Box
              height={200}
              borderBlockStart={1}
              borderWidth={2}
              borderColor={"black"}
              padding={10}
              borderRadius={12}
              boxShadow={"xl"}
              _hover={{
                height: 220,
              }}
            >
              <Center>
                <Box>
                  <Heading> Click Rewards</Heading>
                  <Box>
                    0.
                    <Box as="span">00</Box>
                  </Box>
                </Box>
              </Center>
            </Box>
          </GridItem>
          <GridItem>
            <Box
              height={200}
              borderBlockStart={1}
              borderWidth={2}
              borderColor={"black"}
              padding={10}
              borderRadius={12}
              boxShadow={"xl"}
              _hover={{
                height: 220,
              }}
            >
              <Center>
                <Box>
                  <Heading> View Rewards</Heading>
                  <Box>
                    0.
                    <Box as="span">00</Box>
                  </Box>
                </Box>
              </Center>
            </Box>
          </GridItem>
          <GridItem>
            <Box
              height={200}
              borderBlockStart={1}
              borderWidth={2}
              borderColor={"black"}
              padding={10}
              borderRadius={12}
              boxShadow={"xl"}
              _hover={{
                height: 220,
              }}
            >
              <Center>
                <Box>
                  <Heading> Ad Cost</Heading>
                  <Box>
                    0.
                    <Box as="span">00</Box>
                  </Box>
                </Box>
              </Center>
            </Box>
          </GridItem>
        </Grid>
      </Center>
    </>
  );
};

export default EarningsComponent;
