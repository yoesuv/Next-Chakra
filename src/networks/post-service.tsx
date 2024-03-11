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

export const createPost = async (post: PostModel): Promise<PostModel> => {
  const result = await client.post("posts", JSON.stringify(post));
  return result.data;
};

export const updatePost = async (post: PostModel): Promise<PostModel> => {
  const result = await client.put("posts/" + post.id, JSON.stringify(post));
  return result.data;
};

export const deletePost = async (id: number): Promise<PostModel> => {
  const result = await client.delete("posts/" + id);
  return result.data;
};

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
    gcTime: 0,
  });
