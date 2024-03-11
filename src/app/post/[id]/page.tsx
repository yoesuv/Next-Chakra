"use client";

import { UseDetailPost } from "@/networks/post-service";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Container,
  Heading,
  VStack,
  Text,
  Box,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import LoadingDetailPost from "./loading-detail-post";

interface PostProps {
  params: { id: number };
}

export default function DetailPost({ params }: PostProps) {
  const router = useRouter();
  const { data, isLoading, isError, isPending } = UseDetailPost(params.id);

  if (isLoading || isPending) {
    return <LoadingDetailPost />;
  }

  return (
    <Container maxW="container.lg" mt={10}>
      <VStack alignItems="start">
        <HStack>
          <IconButton
            variant="ghost"
            aria-label="back to list post"
            icon={<ArrowBackIcon boxSize={7} />}
            onClick={router.back}
          />
          <Heading size="lg">Detail Posts {params.id}</Heading>
        </HStack>
        <Box mt={5}>
          <Text fontSize="2xl" fontWeight="medium">
            {data?.title}
          </Text>
        </Box>
        <Text fontSize="lg">{data?.body}</Text>
      </VStack>
    </Container>
  );
}
