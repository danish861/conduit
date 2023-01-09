import { DELETE, POST } from "./APIClient";

export const postFavourite = (url: string) => POST(url);

export const deleteFavourite = (url: string) => DELETE(url);
