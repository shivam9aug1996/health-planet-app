export const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "https://health-planet.vercel.app/api";
