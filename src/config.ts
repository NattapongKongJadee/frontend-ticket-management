const apiBackend = import.meta.env.VITE_URL_BACKEND;

if (!apiBackend) {
  throw new Error("API is not defined.");
}

export default apiBackend;
