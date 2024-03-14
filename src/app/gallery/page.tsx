"use client";

import { UseListPhoto } from "@/networks/photo-service";
import {
  Box,
  Card,
  CardBody,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

export default function Gallery() {
  const { data, isLoading } = UseListPhoto();

  if (isLoading) {
    return <Heading>Loading...</Heading>;
  }

  return (
    <Container maxW="container.xl">
      <SimpleGrid minChildWidth={250} gap={4}>
        {data?.map((item, index) => (
          <Box key={index}>
            <Card shadow="sm">
              <CardBody>
                <Image src={item.url} />
                <Text mt={4} fontWeight="medium" fontSize="md" noOfLines={1}>
                  {item.title}
                </Text>
              </CardBody>
            </Card>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
