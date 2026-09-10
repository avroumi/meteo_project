import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = <T>(url: string | null) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get<T>(url);
        setData(response.data);
      } catch {
        setError("Something Wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, refresh]);
  const refetch = () => {
    setRefresh((prev) => prev + 1);
  };

  return { data, loading, error, refetch };
};
