import { useQuery } from "@tanstack/react-query";
import { PostModel } from "../models/post-model";
import { client } from "./api-service";

async function fetchDetailPosts(id: number): Promise<PostModel> {
  const result = await client.get("posts/" + id);
  return result.data;
}

const UseDetailPost = (id: number) =>
  useQuery({
    queryKey: ["detailPost"],
    queryFn: () => {
      return fetchDetailPosts(id);
    },
  });

export default UseDetailPost;
