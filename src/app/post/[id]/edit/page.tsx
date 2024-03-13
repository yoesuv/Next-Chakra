"use client";

import { IFormPost } from "@/app/create/page";
import { schemaPost } from "@/utils/validations/post-validation";
import { ArrowBackIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
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
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

export default function EdiPost() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm<IFormPost>({
    mode: "onChange",
    resolver: yupResolver(schemaPost),
  });

  return (
    <form noValidate>
      <Container centerContent={true}>
        <Heading mt={10}>Edit Post</Heading>

        <FormControl
          isRequired
          mt={4}
          isInvalid={errors.title?.message !== undefined}
        >
          <FormLabel>Post Title</FormLabel>
          <Input
            type="text"
            placeholder="input title here"
            {...register("title")}
          />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          mt={4}
          isInvalid={errors.body?.message !== undefined}
        >
          <FormLabel>Post Body</FormLabel>
          <Textarea placeholder="input body here" {...register("body")} />
          <FormErrorMessage>{errors.body?.message}</FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          mt={4}
          isInvalid={errors.userId?.message !== undefined}
        >
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
          <FormErrorMessage>{errors.userId?.message}</FormErrorMessage>
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
          <Button
            type="submit"
            w="full"
            colorScheme="blue"
            isDisabled={!isDirty || !isValid}
          >
            <EditIcon boxSize={3} />
            &nbsp;UPDATE
          </Button>
        </HStack>
      </Container>
    </form>
  );
}
