const config = {
  // API
  httpPort: Number(process.env.HTTP_PORT || 80),

  // DATABASE
  dbHost: process.env.DATABASE_HOST || "localhost",
  dbPort: Number(process.env.DATABASE_PORT || 5432),
};

export { config };
