import {
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

export default function Create() {
  return (
    <Container centerContent={true}>
      <Heading mt={10}>Create Post</Heading>
      <FormControl isRequired mt={4}>
        <FormLabel>Post Title</FormLabel>
        <Input type="text" name="title" placeholder="input title here" />
      </FormControl>
      <FormControl isRequired mt={4}>
        <FormLabel>Post Body</FormLabel>
        <Input type="text" name="body" placeholder="input body here" />
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
    </Container>
  );
}
