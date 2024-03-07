import {
  Flex,
  Text,
  Heading,
  Box,
  Container,
  Spacer,
  HStack,
} from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Box boxShadow="base">
      <Container>
        <Flex as="nav" py={2}>
          <Heading size="lg">NextJS & Chakra UI</Heading>
          <HStack ms={5}>
            <Text>Home</Text>
            <Text>Gallery</Text>
            <Text>Create</Text>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
