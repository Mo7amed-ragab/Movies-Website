import { useContext } from "react";
import { LikedMoviesContext } from "./LikedMoviesContext";

export const useLikedMovies = () => {
  const context = useContext(LikedMoviesContext);
  if (context === undefined) {
    throw new Error("useLikedMovies must be used within a LikedMoviesProvider");
  }
  return context;
};
