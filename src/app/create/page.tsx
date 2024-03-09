"use client";

import { AddIcon, RepeatIcon } from "@chakra-ui/icons";
import {
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
import { useForm, SubmitHandler } from "react-hook-form";

export interface IFormPost {
  title: string;
  body: string;
  userId: number;
}

export default function Create() {
  const { register, handleSubmit } = useForm<IFormPost>();

  const onSubmit: SubmitHandler<IFormPost> = (post) => {
    console.log(JSON.stringify(post));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Container centerContent={true}>
        <Heading mt={10}>Create Post</Heading>
        <FormControl isRequired mt={4}>
          <FormLabel>Post Title</FormLabel>
          <Input
            type="text"
            placeholder="input title here"
            {...register("title")}
          />
        </FormControl>
        <FormControl isRequired mt={4}>
          <FormLabel>Post Body</FormLabel>
          <Textarea placeholder="input body here" {...register("body")} />
        </FormControl>
        <FormControl isRequired mt={4}>
          <FormLabel>User Id</FormLabel>
          <NumberInput>
            <NumberInputField
              placeholder="input user id here"
              {...register("userId", {
                valueAsNumber: true,
              })}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <HStack w="full" spacing={4} mt={5}>
          <Button type="button" w="full" colorScheme="red">
            <RepeatIcon boxSize={3} />
            &nbsp;RESET
          </Button>
          <Button type="submit" w="full" colorScheme="blue">
            <AddIcon boxSize={3} />
            &nbsp;SAVE
          </Button>
        </HStack>
      </Container>
    </form>
  );
}
