"use client";

import { UseListPhoto } from "@/networks/photo-service";
import {
  Box,
  Card,
  CardBody,
  Container,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import LoadingGallery from "./loading-gallery";

export default function Gallery() {
  const { data, isLoading } = UseListPhoto();

  if (isLoading) {
    return <LoadingGallery />;
  }

  return (
    <Container maxW="container.xl" pb={8}>
      <SimpleGrid minChildWidth={250} gap={4} mt={2}>
        {data?.map((item, index) => (
          <Box key={index}>
            <Card shadow="sm" borderRadius={6}>
              <CardBody p={0}>
                <Image
                  src={item.url}
                  fallbackSrc="placeholder_image.png"
                  borderTopRadius={6}
                  alt={item.title}
                />
                <Box my={4} mx={2}>
                  <Text fontWeight="medium" fontSize="md" noOfLines={1}>
                    {item.title}
                  </Text>
                </Box>
              </CardBody>
            </Card>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
