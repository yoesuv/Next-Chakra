import { useQuery } from "@tanstack/react-query";
import { PostModel } from "../models/post-model";
import { client } from "./api-service";

async function fetchPosts(): Promise<PostModel[]> {
  const result = await client.get("posts");
  return result.data;
}

const UseListPost = () =>
  useQuery({
    queryKey: ["listPost"],
    queryFn: () => {
      return fetchPosts();
    },
  });

export default UseListPost;
