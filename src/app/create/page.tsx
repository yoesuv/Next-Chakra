"use client";

import { PostModel } from "@/models/post-model";
import { createPost } from "@/networks/post-service";
import AppAlertConfirm from "@/utils/app-alert-confirm";
import { useToast } from "@/utils/app-toast";
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
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

export interface IFormPost {
  title: string;
  body: string;
  userId: number;
}

export default function Create() {
  const { successToast, errorToast } = useToast();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    control,
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
      successToast("Success", "Success Create Post");
    },
    onError: () => {
      errorToast("Error", "Failed Create Post");
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const clickReset = () => {
    onClose();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <AppAlertConfirm
        props={{
          isOpen,
          onClose,
          onYes: clickReset,
          cancelRef,
          title: "Reset",
          message: "Reset Form Create Post?",
        }}
      />

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
          <Textarea
            placeholder="input body here"
            minH={150}
            {...register("body")}
          />
          <FormErrorMessage>{errors.body?.message}</FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          mt={4}
          isInvalid={errors.userId?.message !== undefined}
        >
          <FormLabel>User Id</FormLabel>
          <Controller
            name="userId"
            control={control}
            render={({ field: { ref, ...restField } }) => (
              <NumberInput {...restField}>
                <NumberInputField
                  ref={ref}
                  placeholder="input user id here"
                  name={restField.name}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            )}
          />
          <FormErrorMessage>{errors.userId?.message}</FormErrorMessage>
        </FormControl>

        <HStack w="full" spacing={4} mt={5}>
          <Button type="button" w="full" colorScheme="red" onClick={onOpen}>
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
