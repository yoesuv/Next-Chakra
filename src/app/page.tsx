"use client";

import { PostModel } from "@/models/post-model";
import { UseListPost, deletePost } from "@/networks/post-service";
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
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Home() {
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { data, isLoading, isError } = UseListPost();
  const [post, setPost] = useState<PostModel>();

  const onConfirmDelete = (post: PostModel) => {
    setPost(post);
    onOpen();
  };

  const actionDelete = () => {
    onClose();
    mutationDelete.mutate();
  };

  const mutationDelete = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: async () => await deletePost(post?.id || 1),
    onSuccess: () => {
      toast({
        title: "Delete Post",
        description: "Success Delete Post",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.refresh();
    },
    onError: () => {
      toast({
        title: "Delete Post",
        description: "Failed Dele Post",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

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
              <Button colorScheme="red" onClick={actionDelete} ml={3}>
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
