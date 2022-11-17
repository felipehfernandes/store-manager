const snakeize = require('snakeize');
const camelize = require('camelize');
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

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT prod.*, sal.date FROM StoreManager.sales_products AS prod
    INNER JOIN StoreManager.sales AS sal ON prod.sale_id = sal.id
    ORDER BY prod.sale_id, prod.product_id`,
  );

  return camelize(result);
};

const findById = async (id) => {
  const [result] = await connection.execute(
    `SELECT prod.product_id, prod.quantity, sal.date FROM StoreManager.sales_products AS prod
    INNER JOIN StoreManager.sales AS sal ON prod.sale_id = sal.id
    WHERE prod.sale_id = ? ORDER BY prod.sale_id, prod.product_id`,
    [id],
  );

  return camelize(result);
};

module.exports = {
  insertSale,
  insert,
  findAll,
  findById,
};