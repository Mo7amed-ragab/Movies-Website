import React from "react";
import { useLikedMovies } from "../context/useLikedMovies";
import MoviesCard from "../components/MoviesCard";

const LikedMoviesPage = () => {
  const { likedMovies } = useLikedMovies();

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img
            src="/images/hero.png"
            alt="Banner"
            className="w-full h-auto object-cover animate-fade-in-scale"
          />
          <h1>
            Your <span className="text-gradient">Liked</span> Movies
          </h1>
        </header>

        <section className="all-movies mt-20">
          <h2 className="text-4xl font-bold text-white mb-8">
            All Liked Movies
          </h2>
          {likedMovies.length === 0 ? (
            <p className="text-center text-gray-400 text-xl">
              You haven't liked any movies yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {likedMovies.map((movie) => (
                <li key={movie.id}>
                  <MoviesCard movie={movie} />
                </li>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default LikedMoviesPage;
