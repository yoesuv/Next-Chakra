import { Container, SimpleGrid, Skeleton } from "@chakra-ui/react";

export default function LoadingGallery() {
  return (
    <Container maxW="container.xl">
      <SimpleGrid minChildWidth={250} gap={4} mt={2}>
        <Skeleton height={80} />
        <Skeleton height={80} />
        <Skeleton height={80} />
        <Skeleton height={80} />
      </SimpleGrid>
    </Container>
  );
}
