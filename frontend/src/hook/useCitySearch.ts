import { useState } from "react";
import { useFetch } from "./useFetch";
import type { City } from "../types/api";

export const useCitySearch = () => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const url =
    query.length >= 3
      ? `http://127.0.0.1:8000/api/cities/search?query=${encodeURIComponent(query)}`
      : null;

  const { data, loading, error } = useFetch<City[]>(url);

  const handleSearch = () => {
    if (search.trim().length >= 3) {
      setQuery(search.trim());
    }
  };

  return {
    search,
    setSearch,
    cities: data,
    loading,
    error,
    handleSearch,
  };
};
