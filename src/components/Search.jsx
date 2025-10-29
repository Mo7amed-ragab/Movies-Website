import React from "react";
import { useNavigate } from "react-router-dom";
import { useLikedMovies } from "../context/useLikedMovies";

const Search = ({ search, setSearch }) => {
  const navigate = useNavigate();
  const { likedMoviesCount } = useLikedMovies();

  const handleLikedMoviesClick = () => {
    navigate("/liked-movies");
  };

  return (
    <div className="search flex items-center justify-between">
      <div className="flex items-center space-x-2 w-full">
        <img src="/images/search.svg" alt="search" className="w-5 h-5" />

        <input
          type="text"
          placeholder="Search through thousands of movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow py-2 text-white bg-dark-200 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />

        <button
          onClick={handleLikedMoviesClick}
          className="cursor-pointer relative ml-4 p-2 rounded-full bg-dark-100 hover:bg-dark-100/70 transition-colors duration-200"
          aria-label="Liked Movies"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-500"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 22.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          {likedMoviesCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {likedMoviesCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Search;
