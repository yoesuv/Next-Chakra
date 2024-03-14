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
    <Container maxW="container.xl" pb={8}>
      <SimpleGrid minChildWidth={250} gap={4}>
        {data?.map((item, index) => (
          <Box key={index}>
            <Card shadow="sm" borderRadius={6}>
              <CardBody p={0}>
                <Image src={item.url} borderTopRadius={6} />
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
