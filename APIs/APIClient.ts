import axios from "axios";
import { getCookie } from "cookies-next";

// axios.defaults.baseURL = "https://api.realworld.io/api/"

interface fetchDataProps {
  method: "get" | "post" | "put" | "delete";
  url: string;
  body?: {};
}

//   {[key: string]: any}

const fetchData = async ({ method, url, body }: fetchDataProps) => {
  const token = getCookie("authToken");
  try {
    const config = {
      baseURL: "https://api.realworld.io/api/",
      headers: {
        Authorization: !!token ? `Token ${token}` : "",
      },
    };

    const { data } =
      (method === "get" && (await axios.get(url, config))) ||
      (method === "post" && (await axios.post(url, body, config))) ||
      (method === "put" && (await axios.put(url, body, config))) ||
      (method === "delete" && (await axios.delete(url, config))) ||
      {};

    return data;
  } catch (error) {
    // console.log("errror from api client file", error);
    throw error;
  }
};

export const GET = (url: string) => fetchData({ method: "get", url });

export const POST = (url: string, body?: {}) =>
  fetchData({ method: "post", url, body });

export const PUT = (url: string, body?: {}) =>
  fetchData({ method: "put", url, body });

export const DELETE = (url: string) => fetchData({ method: "delete", url });

////////////////////////////////////////////////////////////////////////
