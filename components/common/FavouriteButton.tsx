import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { HiHeart } from "react-icons/hi";
import { deleteFavourite, postFavourite } from "../../api/favourite";
import authStore from "../../store/AuthStore";

interface IFavouriteButton {
  favoritesCount: number;
  slug: string;
}

const FavouriteButton = ({ favoritesCount, slug }: IFavouriteButton) => {
  const router = useRouter();

  const [favorited, setFavorited] = useState(false);
  const [favouritesCount, setFavouriteCount] = useState(favoritesCount);

  const favourite = async () => {
    const response = await postFavourite(`articles/${slug}/favorite`);
    setFavouriteCount(response.article.favoritesCount);
    setFavorited(response.article.favorited);
  };

  const unfavourite = async () => {
    const response = await deleteFavourite(`articles/${slug}/favorite`);
    setFavouriteCount(response.article.favoritesCount);
    setFavorited(response.article.favorited);
  };

  const handleFavourite = async () => {
    if (!authStore.isLoggedIn) {
      return router.push("/register");
    }

    favorited ? await unfavourite() : await favourite();
  };

  return (
    <>
      <button
        className={` text-green hover:text-white text-xs mr-2 px-2.5 py-0.5 border border-green   rounded hover:bg-green hover:outline-none  flex  items-center gap-1 h-7    ${
          favorited ? "bg-green text-gray-100" : "none"
        }`}
        onClick={handleFavourite}
      >
        <HiHeart fontSize={20} /> {favouritesCount}
      </button>
    </>
  );
};

export default FavouriteButton;
