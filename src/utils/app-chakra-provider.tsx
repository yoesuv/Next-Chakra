"use-client";

import { ChakraProvider } from "@chakra-ui/react";

export function AppChakraProvider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider
      toastOptions={{
        defaultOptions: { position: "top-right" },
      }}
    >
      {children}
    </ChakraProvider>
  );
}
