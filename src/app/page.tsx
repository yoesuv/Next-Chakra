"use client";

import UseListPost from "@/networks/list-post-service";
import { Table, Tbody, Tr, Th, TableContainer, Button } from "@chakra-ui/react";

export default function Home() {
  const { data, isLoading, isError } = UseListPost();

  return (
    <TableContainer>
      <Table>
        <Tbody>
          {data?.map((item, index) => (
            <Tr>
              <Th>{index + 1}</Th>
              <Th>{item.title}</Th>
              <Th>
                <Button size="xs">Detail</Button>
              </Th>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
