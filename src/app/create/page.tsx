import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
} from "@chakra-ui/react";

export default function Create() {
  return (
    <form noValidate>
      <Container centerContent={true}>
        <Heading mt={10}>Create Post</Heading>
        <FormControl isRequired mt={4}>
          <FormLabel>Post Title</FormLabel>
          <Input type="text" name="title" placeholder="input title here" />
        </FormControl>
        <FormControl isRequired mt={4}>
          <FormLabel>Post Body</FormLabel>
          <Textarea name="body" placeholder="input body here" />
        </FormControl>
        <FormControl isRequired mt={4}>
          <FormLabel>User Id</FormLabel>
          <NumberInput>
            <NumberInputField name="userId" placeholder="input user id here" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <HStack w="full" spacing={4} mt={5}>
          <Button type="button" w="full" colorScheme="red">
            RESET
          </Button>
          <Button type="submit" w="full" colorScheme="blue">
            SAVE
          </Button>
        </HStack>
      </Container>
    </form>
  );
}
