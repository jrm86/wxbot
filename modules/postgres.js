const { logger } = require("./logger");
const { Pool } = require("node-postgres");

const pgOptions = {
  user: process.env.PGUSER,
  password: process.env.PGPASS,
  host: process.env.PGHOST,
  database: process.env.PGDBASE,
  port: process.env.PGPORT,
};

const pool = new Pool(pgOptions);

/**
 * Returns JSON object on successful query, else returns null
 * @param {number} zipcode
 */
async function getLocation(zipcode) {
  logger.info("Querying zip database for " + zipcode);
  const client = await pool.connect();

  try {
    const res = await client.query(
      "SELECT * FROM zip_codes where zipcode = '" + zipcode + "'"
    );

    logger.info("Database query successful");
    logger.info(JSON.stringify(res.rows[0]));

    return res.rows[0];
  } catch (err) {
    logger.error(err.stack);
    return null;
  } finally {
    client.release();
    logger.info("DB client released");
  }
}

module.exports = {
  getLocation: getLocation,
};
