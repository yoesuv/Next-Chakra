"use client";

import UseListPost from "@/networks/list-post-service";
import { Heading } from "@chakra-ui/react";

export default function Home() {
  const { data, isLoading, isError } = UseListPost();

  return (
    <main>
      <div>
        <Heading>Next JS & Chakra UI {data?.length}</Heading>
      </div>
    </main>
  );
}
