import { DELETE, GET, POST } from "./APIClient";

export const getProfile = (url: string) => GET(url);

export const followUser = (url: string) => POST(url);

export const unFollowUser = (url: string) => DELETE(url);
