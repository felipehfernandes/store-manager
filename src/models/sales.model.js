const snakeize = require('snakeize');
const connection = require('./connection');

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES ()',
  );

  return insertId;
};

const insert = async (data, saleId) => {
  const columns = Object.keys(snakeize(data))
    .map((column) => `${column}`)
    .join(', ');
  
  const placeholders = Object.keys(snakeize(data))
    .map((_columns) => '?')
    .join(', ');
  
  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.sales_products (${columns}, sale_id) VALUES (${placeholders}, ?)`,
    [...Object.values(snakeize(data)), saleId],
  );

  return insertId;
};

module.exports = {
  insertSale,
  insert,
};