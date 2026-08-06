import fs from 'fs/promises'
import path from 'path'
import mysql from 'mysql2/promise'

const poolConfig = {
  host: process.env.MYSQL_HOST || '127.0.0.1',
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER || 'app',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'investment_platform',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  decimalNumbers: true,
}

const pool = mysql.createPool(poolConfig)

let initPromise: Promise<void> | null = null

export async function initializeDatabase() {
  if (initPromise) {
    return initPromise
  }

  initPromise = (async () => {
    const initConfig = {
      ...poolConfig,
      database: undefined,
      multipleStatements: true,
      connectTimeout: 10000,
    }

    const connection = await mysql.createConnection(initConfig)

    try {
      const schemaPath = path.join(process.cwd(), 'db', 'schema.sql')
      const schemaSql = await fs.readFile(schemaPath, 'utf8')
      await connection.query(schemaSql)
    } finally {
      await connection.end()
    }
  })()

  return initPromise
}

export default pool
