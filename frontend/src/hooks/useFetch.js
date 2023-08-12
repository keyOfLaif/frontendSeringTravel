import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading as true

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error('Failed to fetch');
        }

        const result = await res.json();
        setData(result.data);
        setError(null); // Clear previous errors on successful fetch
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Set loading to false after fetch (whether successful or not)
      }
    };

    fetchData();
  }, [url]);

  return {
    data,
    error,
    loading,
  };
};

export default useFetch;