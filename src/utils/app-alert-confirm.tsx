import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { RefObject } from "react";

export interface IAlertConfirm {
  isOpen: boolean;
  onClose: () => void;
  onYes: () => void;
  cancelRef: RefObject<HTMLButtonElement>;
  title: string;
  message: string;
}

export default function AppAlertConfirm({ props }: { props: IAlertConfirm }) {
  return (
    <AlertDialog
      isOpen={props.isOpen}
      leastDestructiveRef={props.cancelRef}
      onClose={props.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {props.title}
          </AlertDialogHeader>
          <AlertDialogBody>{props.message}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={props.cancelRef} onClick={props.onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={props.onYes} ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
