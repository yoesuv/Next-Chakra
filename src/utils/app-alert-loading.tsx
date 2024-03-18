import {
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";

export interface IAlertLoading {
  isOpen: boolean;
  onClose: () => void;
}
export default function AppAlertLoading({ props }: { props: IAlertLoading }) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody py={10}>
          <Center>
            <VStack>
              <Spinner size="xl" />
              <Text fontWeight="medium">Loading...</Text>
            </VStack>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
