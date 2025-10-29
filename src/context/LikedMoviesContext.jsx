import React, { createContext, useState, useEffect } from "react";
import { toast } from "sonner";

const LikedMoviesContext = createContext();
const LOCAL_STORAGE_KEY = "likedMovies";

export const LikedMoviesProvider = ({ children }) => {
  const [likedMovies, setLikedMovies] = useState(() => {
    try {
      const item = localStorage.getItem(LOCAL_STORAGE_KEY);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error("Error reading from local storage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(likedMovies));
    } catch (error) {
      console.error("Error writing to local storage:", error);
    }
  }, [likedMovies]);

  const likeMovie = (movie) => {
    setLikedMovies((prevMovies) => {
      if (!prevMovies.some((m) => m.id === movie.id)) {
        toast.success(`"${movie.title}" added to liked movies!`);
        return [...prevMovies, movie];
      }
      return prevMovies;
    });
  };

  const unlikeMovie = (movieId, movieTitle) => {
    setLikedMovies((prevMovies) => {
      toast.info(`"${movieTitle}" removed from liked movies.`);
      return prevMovies.filter((m) => m.id !== movieId);
    });
  };

  const isMovieLiked = (movieId) => likedMovies.some((m) => m.id === movieId);

  const likedMoviesCount = likedMovies.length;

  return (
    <LikedMoviesContext.Provider
      value={{
        likedMovies,
        likeMovie,
        unlikeMovie,
        isMovieLiked,
        likedMoviesCount,
      }}
    >
      {children}
    </LikedMoviesContext.Provider>
  );
};

export { LikedMoviesContext };
