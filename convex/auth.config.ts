if (!process.env.NEXT_PUBLIC_CLERK_FRONTEND_API_URL) {
  throw new Error(
    "Missing NEXT_PUBLIC_CLERK_FRONTEND_API_URL in your .env file",
  );
}
const authConfig = {
  providers: [
    {
      domain: process.env.NEXT_PUBLIC_CLERK_FRONTEND_API_URL,
      applicationID: "convex",
    },
  ],
};

export default authConfig;
