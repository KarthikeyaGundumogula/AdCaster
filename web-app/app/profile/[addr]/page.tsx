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
              padding={10}
              borderRadius={12}
              _hover={{
                height: 220,
                width: "calc(100% + 10px)",
                transform: "translateY(-10px)",
              }}
              sx={{
                opacity: 0.8,
                backdropFilter: "blur(2px)",
                backgroundImage:
                  "radial-gradient(circle farthest-side at 100% 0, rgba(2, 239, 225, .09), rgba(46, 29, 246, .03) 50%, rgba(0, 224, 255, .1))",
                border: "1px solid rgba(240, 80, 39, .3)",
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
              padding={10}
              borderRadius={12}
              _hover={{
                height: 220,
                width: "calc(100% + 10px)",
                transform: "translateY(-10px)",
              }}
              sx={{
                opacity: 0.8,
                backdropFilter: "blur(2px)",
                backgroundImage:
                  "radial-gradient(circle farthest-side at 100% 0, rgba(2, 239, 225, .09), rgba(46, 29, 246, .03) 50%, rgba(0, 224, 255, .1))",
                border: "1px solid rgba(240, 80, 39, .3)",
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
              padding={10}
              borderRadius={12}
              _hover={{
                height: 220,
                width: "calc(100% + 10px)",
                transform: "translateY(-10px)",
              }}
              sx={{
                opacity: 0.8,
                backdropFilter: "blur(2px)",
                backgroundImage:
                  "radial-gradient(circle farthest-side at 100% 0, rgba(2, 239, 225, .09), rgba(46, 29, 246, .03) 50%, rgba(0, 224, 255, .1))",
                border: "1px solid rgba(240, 80, 39, .3)",
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
              padding={10}
              borderRadius={12}
              _hover={{
                height: 220,
                width: "calc(100% + 10px)",
                transform: "translateY(-10px)",
              }}
              sx={{
                opacity: 0.8,
                backdropFilter: "blur(2px)",
                backgroundImage:
                  "radial-gradient(circle farthest-side at 100% 0, rgba(2, 239, 225, .09), rgba(46, 29, 246, .03) 50%, rgba(0, 224, 255, .1))",
                border: "1px solid rgba(240, 80, 39, .3)",
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
              padding={10}
              borderRadius={12}
              _hover={{
                height: 220,
                width: "calc(100% + 10px)",
                transform: "translateY(-10px)",
              }}
              sx={{
                opacity: 0.8,
                backdropFilter: "blur(2px)",
                backgroundImage:
                  "radial-gradient(circle farthest-side at 100% 0, rgba(2, 239, 225, .09), rgba(46, 29, 246, .03) 50%, rgba(0, 224, 255, .1))",
                border: "1px solid rgba(240, 80, 39, .3)",
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
              padding={10}
              borderRadius={12}
              _hover={{
                height: 220,
                width: "calc(100% + 10px)",
                transform: "translateY(-10px)",
              }}
              sx={{
                opacity: 0.8,
                backdropFilter: "blur(2px)",
                backgroundImage:
                  "radial-gradient(circle farthest-side at 100% 0, rgba(2, 239, 225, .09), rgba(46, 29, 246, .03) 50%, rgba(0, 224, 255, .1))",
                border: "1px solid rgba(240, 80, 39, .3)",
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
        </Grid>
      </Center>
    </>
  );
};

export default EarningsComponent;
