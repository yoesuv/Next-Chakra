"use client";

import { UseListPost } from "@/networks/post-service";
import { EditIcon, InfoOutlineIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Table,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Button,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  const { data, isLoading, isError } = UseListPost();

  return (
    <TableContainer>
      <Table>
        <Tbody>
          {data?.map((item, index) => (
            <Tr key={item.id}>
              <Th>{index + 1}</Th>
              <Th>{item.title}</Th>
              <Th>
                <HStack>
                  <Spacer />
                  <Link href={"post/" + item.id}>
                    <Button size="xs" colorScheme="green">
                      <InfoOutlineIcon />
                    </Button>
                  </Link>
                  <Link href={"post/" + item.id + "/edit"}>
                    <Button size="xs" colorScheme="blue">
                      <EditIcon />
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button size="xs" colorScheme="red">
                      <DeleteIcon />
                    </Button>
                  </Link>
                </HStack>
              </Th>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
