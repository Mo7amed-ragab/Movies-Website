import { Toaster } from "sonner";
import { useMovieData } from "./hooks/useMovieData.js";
import Search from "./components/Search";
import Spinner from "./components/Spinner.jsx";
import Pagination from "./components/Pagination";
import MoviesCard from "./components/MoviesCard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LikedMoviesProvider } from "./context/LikedMoviesContext";
import React, { lazy, Suspense } from "react";

const LikedMoviesPage = lazy(() => import("./pages/LikedMoviesPage"));

function App() {
  const {
    search,
    setSearch,
    Loading,
    movieList,
    trendingMovies,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useMovieData();

  return (
    <Router>
      <LikedMoviesProvider>
        <Toaster richColors />
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <div className="pattern" />

                <div className="wrapper">
                  <header>
                    <img
                      src="/images/hero.png"
                      alt="Banner"
                      className="w-full h-auto object-cover animate-fade-in-scale max-h-[400px]"
                      loading="lazy" // Add lazy loading
                    />
                    <h1>
                      Find <span className="text-gradient">Movies</span> You'll
                      Enjoy Without the Hassle
                    </h1>

                    <Search search={search} setSearch={setSearch} />
                  </header>

                  {trendingMovies.length > 0 && (
                    <section className="trending">
                      <h2>Trending Movies</h2>

                      <ul>
                        {trendingMovies.map((movie, index) => {
                          return (
                            <li key={movie.$id}>
                              <p>{index + 1}</p>
                              <img
                                src={movie.poster_url}
                                alt={movie.title || "Movie Poster"}
                                loading="lazy"
                                width="127"
                                height="163"
                              />
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                  )}

                  <section className="all-movies">
                    <h2>All Movies</h2>

                    {Loading ? (
                      <Spinner />
                    ) : (
                      <ul>
                        {movieList.map((movie) => (
                          <li key={movie.id}>
                            <MoviesCard movie={movie} />
                          </li>
                        ))}
                      </ul>
                    )}

                    {totalPages > 1 && (
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                      />
                    )}
                  </section>
                </div>
              </main>
            }
          />
          <Route
            path="/liked-movies"
            element={
              <Suspense fallback={<div>Loading liked movies...</div>}>
                <LikedMoviesPage />
              </Suspense>
            }
          />
        </Routes>
      </LikedMoviesProvider>
    </Router>
  );
}

export default App;
