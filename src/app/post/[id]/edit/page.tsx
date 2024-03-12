"use client";

import { IFormPost } from "@/app/create/page";
import { ArrowBackIcon, EditIcon } from "@chakra-ui/icons";
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
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

export default function EdiPost() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IFormPost>();

  return (
    <form noValidate>
      <Container centerContent={true}>
        <Heading mt={10}>Edit Post</Heading>

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
          <Button
            type="button"
            w="full"
            colorScheme="red"
            onClick={router.back}
          >
            <ArrowBackIcon boxSize={3} />
            &nbsp;BACK
          </Button>
          <Button type="submit" w="full" colorScheme="blue">
            <EditIcon boxSize={3} />
            &nbsp;UPDATE
          </Button>
        </HStack>
      </Container>
    </form>
  );
}
