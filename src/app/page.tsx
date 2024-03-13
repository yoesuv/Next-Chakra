"use client";

import { PostModel } from "@/models/post-model";
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
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  VStack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRef, useState } from "react";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { data, isLoading, isError } = UseListPost();
  const [post, setPost] = useState<PostModel>();

  const onConfirmDelete = (post: PostModel) => {
    setPost(post);
    onOpen();
  };

  return (
    <div>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="2xl" fontWeight="bold">
              Delete
            </AlertDialogHeader>
            <AlertDialogBody fontSize="lg" fontWeight="medium">
              Confirm Delete Post : {post?.id}. {post?.title}?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

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

                    <Button
                      size="xs"
                      colorScheme="red"
                      onClick={() => {
                        onConfirmDelete(item);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </HStack>
                </Th>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
