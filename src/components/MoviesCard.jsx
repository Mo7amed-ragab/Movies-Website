import React, { useState } from "react";
import MovieDetailsDialog from "./MovieDetailsDialog";
import { useLikedMovies } from "../context/useLikedMovies";
import { Heart } from "lucide-react";

const MoviesCard = React.memo(({ movie }) => {
  const {
    id,
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
    adult,
    overview,
    popularity,
  } = movie; // Destructure movie object here
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimatingLike, setIsAnimatingLike] = useState(false);
  const { likeMovie, unlikeMovie, isMovieLiked } = useLikedMovies();

  const isLiked = isMovieLiked(id);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    setIsAnimatingLike(true);
    setTimeout(() => setIsAnimatingLike(false), 300); // Reset animation after 300ms
    if (isLiked) {
      unlikeMovie(id, title);
    } else {
      likeMovie(movie);
    }
  };

  return (
    <div
      className="movie-card relative cursor-pointer overflow-hidden rounded-2xl shadow-lg transform transition-all duration-300 ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? "scale(1.03) rotateZ(1deg)" : "scale(1)",
      }}
    >
      {adult && (
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          +18
        </span>
      )}

      {(isHovered || isLiked) && (
        <button
          onClick={handleLikeClick}
          className={`absolute cursor-pointer top-2 right-2 p-1 rounded-full transition-colors duration-200 z-10 ${
            isAnimatingLike ? "animate-pulse-once" : ""
          } ${
            isLiked
              ? "bg-white text-red-500"
              : "bg-dark-100/70 hover:bg-red-500 text-white"
          }`}
          aria-label="Like movie"
        >
          <Heart />
        </button>
      )}

      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "/no-movie.png"
        }
        alt={title}
        className="w-full h-auto transition-all duration-300 ease-in-out max-h-[300px] object-cover"
        style={{
          transform: isHovered ? "scale(1.05)" : "scale(1)",
          filter: isHovered ? "brightness(0.7)" : "brightness(1)",
        }}
      />

      <div className="mt-4 p-3 transition-all duration-300">
        <h3 className="font-semibold text-lg truncate text-white">{title}</h3>

        <div className="content flex items-center gap-2 mt-2 text-sm text-gray-300">
          <div className="rating flex items-center gap-1">
            <img src="/images/star.svg" alt="Star Icon" className="w-4 h-4" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>

          <span>•</span>
          <p className="lang uppercase">{original_language}</p>

          <span>•</span>
          <p className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>

      {isHovered && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 transition-all duration-300 rounded-2xl bg-gradient-to-t from-black/80 via-transparent to-transparent">
          <MovieDetailsDialog
            title={title}
            overview={overview}
            release_date={release_date}
            popularity={popularity}
            original_language={original_language}
            vote_average={vote_average}
          />
        </div>
      )}
    </div>
  );
});

export default MoviesCard;
