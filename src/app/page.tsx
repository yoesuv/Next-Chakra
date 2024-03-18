"use client";

import { PostModel } from "@/models/post-model";
import { UseListPost, deletePost } from "@/networks/post-service";
import AppAlertConfirm from "@/utils/app-alert-confirm";
import { useToast } from "@/utils/app-toast";
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
  Center,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { successToast, errorToast } = useToast();
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { data, isLoading } = UseListPost();
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
      successToast("Delete Post", "Success Delete Post");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.refresh();
    },
    onError: () => {
      errorToast("Delete Post", "Failed Delete Post");
    },
  });

  if (isLoading) {
    return (
      <Flex
        width={"100vw"}
        height={"90vh"}
        alignContent={"center"}
        justifyContent={"center"}
      >
        <Center>
          <Spinner size="lg" />
        </Center>
      </Flex>
    );
  }

  return (
    <div>
      <AppAlertConfirm
        props={{
          isOpen,
          onClose,
          onYes: actionDelete,
          cancelRef,
          title: "Delete",
          message: `Confirm Delete Post : ${post?.id}. ${post?.title}?`,
        }}
      />

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
