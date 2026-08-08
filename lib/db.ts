import mysql from "mysql2/promise";

const globalForMysql = globalThis as unknown as {
  mysqlPool?: mysql.Pool;
};

function createPool() {
  const host = process.env.DATABASE_HOST || "localhost";
  const database = process.env.DATABASE_NAME;
  const user = process.env.DATABASE_USER;
  const password = process.env.DATABASE_PASSWORD;

  if (!database || !user || !password) {
    throw new Error(
      "Missing DATABASE_NAME, DATABASE_USER, or DATABASE_PASSWORD environment variables.",
    );
  }

  return mysql.createPool({
    host,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    charset: "utf8mb4",
  });
}

export const db = globalForMysql.mysqlPool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalForMysql.mysqlPool = db;
}
