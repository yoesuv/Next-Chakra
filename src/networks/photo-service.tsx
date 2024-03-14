import { PhotoModel } from "@/models/photo-model";
import { client } from "./api-service";
import { useQuery } from "@tanstack/react-query";

async function fetchPhotos(): Promise<PhotoModel[]> {
  const result = await client.get("photos", {
    params: {
      _limit: 20,
    },
  });
  return result.data;
}

export const UseListPhoto = () =>
  useQuery({
    queryKey: ["listPhoto"],
    queryFn: () => fetchPhotos(),
  });
