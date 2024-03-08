"use client";

import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Container,
  Heading,
  VStack,
  Text,
  Box,
  IconButton,
} from "@chakra-ui/react";

export default function DetailPost() {
  return (
    <Container maxW="container.lg" mt={10}>
      <VStack alignItems="start">
        <Heading size="lg">
          <IconButton
            variant="ghost"
            aria-label="back to list post"
            icon={<ArrowBackIcon />}
          />{" "}
          Detail Posts
        </Heading>
        <Text>This is Title</Text>
        <Text>This is Body Lorem ipsum</Text>
      </VStack>
    </Container>
  );
}
