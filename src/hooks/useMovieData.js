import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "../appwrite.js";
import { toast } from "sonner";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const useMovieData = () => {
  const [search, setSearch] = useState("");
  const [Loading, setLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useDebounce(() => setDebouncedSearch(search), 500, [search]);

  const fetchMovies = async (query = "", page = 1) => {
    setLoading(true);

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
            query
          )}&page=${page}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      if (data.Response === "False") {
        toast.error(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);
      setTotalPages(data.total_pages || 0);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      toast.error(`Error fetching movies. Please try again later. : ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const TrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (error) {
      toast.error(`Error fetching trending movies. : ${error}`);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearch, currentPage);
  }, [debouncedSearch, currentPage]);

  useEffect(() => {
    TrendingMovies();
  }, []);

  return {
    search,
    setSearch,
    Loading,
    movieList,
    trendingMovies,
    currentPage,
    setCurrentPage,
    totalPages,
  };
};
