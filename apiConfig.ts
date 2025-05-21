const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "https://api.hpground.xyz"
    : "https://api.hpground.xyz";

export default API_BASE_URL;