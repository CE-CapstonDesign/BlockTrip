import axios from "axios";
import { useState, useEffect } from "react";

axios.defaults.withCredentials = true;

export const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const useApiInterceptor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use((config) => {
      setIsLoading(true);
      return config;
    });

    const responseInterceptor = instance.interceptors.response.use(
      (response) => {
        setIsLoading(false);
        return response;
      },
      (error) => {
        setIsLoading(false);
        setError(error);
        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return { isLoading, error };
};
