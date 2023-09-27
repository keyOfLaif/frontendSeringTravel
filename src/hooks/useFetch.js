import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // menginisiasi loading sebagai true

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error('Gagagl mengambil data');
        }

        const result = await res.json();
        setData(result.data);
        setError(null); // Menghapus error dari error yang ada sebelumnya ketika berhasil mengambil data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Mendefinisikan setLoading sebagai false setelah melakukan pengambilan data (baik success ataupun tidak)
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