import { PostModel } from "@/models/post-model";
import { client } from "./api-service";
import { useQuery } from "@tanstack/react-query";

async function fetchPosts(): Promise<PostModel[]> {
  const result = await client.get("posts");
  return result.data;
}

async function fetchDetailPosts(id: number): Promise<PostModel> {
  const result = await client.get("posts/" + id);
  return result.data;
}

export const UseListPost = () =>
  useQuery({
    queryKey: ["listPost"],
    queryFn: () => {
      return fetchPosts();
    },
  });

export const UseDetailPost = (id: number) =>
  useQuery({
    queryKey: ["detailPost"],
    queryFn: () => {
      return fetchDetailPosts(id);
    },
  });
