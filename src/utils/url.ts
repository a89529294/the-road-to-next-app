export const getBaseUrl = () => {
  const environment = process.env.NODE_ENV;
  if (environment === "development") {
    return "http://localhost:3000";
  }
  return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
};
