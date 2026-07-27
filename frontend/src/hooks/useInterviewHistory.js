import { useCallback, useEffect, useState } from "react";
import api from "../services/api";

function useInterviewHistory({ page = 1, limit = 5 } = {}) {
  const [history, setHistory] = useState([]);
  const [meta, setMeta] = useState({
    currentPage: page,
    totalPages: 1,
    totalCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/interviews/history", {
        params: { page, limit },
      });

      setHistory(response.data.history || []);
      setMeta({
        currentPage: response.data.currentPage || page,
        totalPages: response.data.totalPages || 1,
        totalCount: response.data.totalCount || 0,
      });
    } catch (fetchError) {
      setError(
        fetchError.response?.data?.message ||
          "Unable to load interview history.",
      );
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    history,
    meta,
    loading,
    error,
    refetch: fetchHistory,
    setHistory,
    setMeta,
    setError,
  };
}

export default useInterviewHistory;
