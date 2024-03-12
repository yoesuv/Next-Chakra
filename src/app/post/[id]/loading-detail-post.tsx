import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  HStack,
  Heading,
  IconButton,
  SkeletonText,
  Skeleton,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function LoadingDetailPost() {
  const router = useRouter();
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
          <Heading size="lg">Loading...</Heading>
        </HStack>

        <Box mt={5} w="25%">
          <Skeleton height={4} />
        </Box>
        <Box mt={2} w="full">
          <SkeletonText noOfLines={2} skeletonHeight={3} />
        </Box>
      </VStack>
    </Container>
  );
}
