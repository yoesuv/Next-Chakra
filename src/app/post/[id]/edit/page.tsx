"use client";

import { IFormPost } from "@/app/create/page";
import { UseDetailPost } from "@/networks/post-service";
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
  NumberInput,
  NumberInputField,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

interface DetailPostProps {
  params: { id: string };
}

export default function EdiPost({ params }: DetailPostProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm<IFormPost>({
    mode: "onChange",
    resolver: yupResolver(schemaPost),
  });
  const { data, isLoading } = UseDetailPost(params.id);

  if (isLoading) {
    return (
      <Container centerContent={true}>
        <Heading mt={10}>Edit Post {params.id}</Heading>
        <Spinner mt={10} size="lg" />
      </Container>
    );
  }

  return (
    <form noValidate>
      <Container centerContent={true}>
        <Heading mt={10}>Edit Post {params.id}</Heading>

        <FormControl
          isRequired
          mt={4}
          isInvalid={errors.title?.message !== undefined}
        >
          <FormLabel>Post Title</FormLabel>
          <Input
            type="text"
            placeholder="input title here"
            {...register("title", {
              value: data?.title,
            })}
          />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          mt={4}
          isInvalid={errors.body?.message !== undefined}
        >
          <FormLabel>Post Body</FormLabel>
          <Textarea
            placeholder="input body here"
            {...register("body", {
              value: data?.body,
            })}
          />
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
                value: data?.userId,
                valueAsNumber: true,
              })}
            />
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
