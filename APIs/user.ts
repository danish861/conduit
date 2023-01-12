import { GET, POST, PUT, DELETE } from "./APIClient";

interface userProps {
  username: string;
  email: string;
  password: string;
  bio?: string;
  image?: string;
}

// post sign-up users

export const postUser = (url: string, body: { user: userProps }) =>
  POST(url, body);
// console.log(body);

// get the USERDATA

export const getUser = (url: string) => GET(url);

// update the USERDATA

export const updateUser = (url: string, body: { user: userProps }) =>
  PUT(url, body);
