import { useToast as ChakraUIToast } from "@chakra-ui/react";

export interface IToast {
  successToast: (title: string, description: string) => void;
}

const useToastSuccess = (): IToast => {
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

  return { successToast };
};

export { useToastSuccess };
