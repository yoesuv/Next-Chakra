import Axios, { AxiosInstance } from "axios";

export const client: AxiosInstance = Axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  timeout: 30000,
});
client.interceptors.request.use((request) => {
  //console.log(`Request # `, JSON.stringify(request, null, 2));
  console.log(`Request # url ` + request.baseURL + request.url);
  return request;
});
client.interceptors.response.use((response) => {
  console.log(`Response # `, JSON.stringify(response.data, null, 2));
  return response;
});
