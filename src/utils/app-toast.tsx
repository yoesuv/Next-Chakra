import { useToast as ChakraUIToast } from "@chakra-ui/react";

export interface IToast {
  successToast: (title: string, description: string) => void;
  errorToast: (title: string, description: string) => void;
}

const useToast = (): IToast => {
  const toast = ChakraUIToast();
  const successToast = (title: string, description: string) => {
    toast({
      title: title,
      description: description,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const errorToast = (title: string, description: string) => {
    toast({
      title: title,
      description: description,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  return { successToast, errorToast };
};

export { useToast };
