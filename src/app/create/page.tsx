"use client";

import { PostModel } from "@/models/post-model";
import { createPost } from "@/networks/post-service";
import { schemaPost } from "@/utils/validations/post-validation";
import { AddIcon, RepeatIcon } from "@chakra-ui/icons";
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
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";

export interface IFormPost {
  title: string;
  body: string;
  userId: number;
}

export default function Create() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid, errors },
  } = useForm<IFormPost>({
    defaultValues: {
      title: "",
      body: "",
      userId: 0,
    },
    mode: "onChange",
    resolver: yupResolver(schemaPost),
  });

  const mutation = useMutation({
    mutationKey: ["createPost"],
    mutationFn: async (newPost: PostModel) => await createPost(newPost),
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast({
        title: "Create Post",
        description: "Success Create Post",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: "Create Post",
        description: "Failed Create Post",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const onSubmit: SubmitHandler<IFormPost> = (post) => {
    var newPost: PostModel = {
      id: 101,
      title: post.title,
      body: post.body,
      userId: post.userId,
    };
    mutation.mutate(newPost);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Container centerContent={true}>
        <Heading mt={10}>Create Post</Heading>
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
          <Button type="button" w="full" colorScheme="red">
            <RepeatIcon boxSize={3} />
            &nbsp;RESET
          </Button>
          <Button
            type="submit"
            w="full"
            colorScheme="blue"
            isDisabled={!isDirty || !isValid || mutation.isPending}
          >
            {mutation.isPending && <Spinner size="sm" />}
            {!mutation.isPending && <AddIcon boxSize={3} />}
            &nbsp;SAVE
          </Button>
        </HStack>
      </Container>
    </form>
  );
}
