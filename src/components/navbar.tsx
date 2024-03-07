import {
  Flex,
  Text,
  Heading,
  Box,
  Container,
  Spacer,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Navbar() {
  return (
    <Box boxShadow="base">
      <Container>
        <Flex as="nav" py={2}>
          <Heading size="lg">NextJS & Chakra UI</Heading>
          <HStack ms={5}>
            <Link href="/">
              <Text>Home</Text>
            </Link>
            <Link href="/gallery">
              <Text>Gallery</Text>
            </Link>
            <Link href="/create">
              <Text>Create</Text>
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
