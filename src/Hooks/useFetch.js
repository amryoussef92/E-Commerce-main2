import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetch(type, url, body = null, config = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let res;
        if (type === "get" || type === "delete") {
          res = await axios[type](url, config);
        } else if (type === "post" || type === "put" || type === "patch") {
          res = await axios[type](url, body, config);
        } else {
          throw new Error("Invalid request type");
        }

        if (res.status === 200 || res.status === 201) {
          setData(res.data);
        } else {
          throw new Error(`Request failed with status ${res.status}`);
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, url, body]);

  return { data, loading, error };
}
