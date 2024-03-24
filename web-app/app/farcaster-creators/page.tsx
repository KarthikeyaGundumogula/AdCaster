"use client";
import React, { useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Center } from "@chakra-ui/react";
import Header from "@/components/Header";
import { getGraphData } from "@/utils/GetData";

const CreatorsTable: React.FC = () => {
  useEffect(() => {
    async function getCreators() {
      try {
        const query = `
        {
          ads(first: 5) {
            id
            AdId
            Advertiser
            TotalFunds
          }
          publishers(first: 5) {
            id
            PublisherFId
            Publisher
            TotalEarnings
          }
        }
        `;
        const data = await getGraphData(query);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    getCreators();
  }, []);

  return (
    <>
      <Header />
      <Center p="10">
        <Table variant="simple" width={"85%"}>
          <Thead>
            <Tr>
              <Th fontWeight={"bold"} fontSize={20}>
                FID
              </Th>
              <Th fontWeight={"bold"} fontSize={20}>
                Followers
              </Th>
              <Th fontWeight={"bold"} fontSize={20}>
                Verified
              </Th>
              <Th fontWeight={"bold"} fontSize={20}>
                Follower Rank
              </Th>
              <Th fontWeight={"bold"} fontSize={20}>
                Engagement Rank{" "}
              </Th>
              <Th fontWeight={"bold"} fontSize={20}>
                Fiel
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Option 1</Td>
              <Td>Option 2</Td>
              <Td>Option 3</Td>
              <Td>Option 4</Td>
              <Td>Option 5</Td>
              <Td>Option 6</Td>
            </Tr>
            {/* Add more rows here */}
          </Tbody>
        </Table>
      </Center>
    </>
  );
};

export default CreatorsTable;
