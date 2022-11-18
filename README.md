# Store Manager!

<details>
  <summary><strong>👨‍💻 What was developed</strong></summary>
  <br />

An API that uses the MSC (model-service-controller) architecture! Developed using TDD.

The built API is a sales management system in dropshipping format where it is possible to create, view, delete and update products and sales.

The MySQL database was used for data management. Also, the API is to be RESTful.

  <br />
</details>

<details>
  <summary id="diagrama-scripts"><strong>🎲 ER Diagram, Entities and Scripts</strong></summary>

#### Entity-Relationship Diagram

To guide the manipulation of the tables, use the following DER:

![DER](./public/erStoreManager.png)

---

#### Tables

The database will have three tables:

- The `products` table, with the `id` and `name` attributes;
- The `sales` table, with the `id` and `date` attributes;
- The `sales_products` table, with the `sale_id`, `product_id` and `quantity` attributes;
- The database creation script can be seen [here](migration.sql);
- The script that populates the database can be seen [here](seed.sql);

The `products` table has the following format: _(The id will be generated automatically)_

![Tabela Produtos](./public/tableproducts.png)

The `sales` table has the following format: _(The id and date are generated automatically)_

![Tabela Vendas](./public/tablesales.png)

The `sales_products` table is the table that makes the `N:N` relationship between `products` and `sales` and has the following format: _(The product and the sale are deleted automatically)_

![Tabela Vendas-Produtos](./public/tablesalesproducts.png)

---

#### Ready-made script tips

- Create the database and generate the tables:

```sh
  npm run migration
```

- Clean and populate the database:

```sh
  npm run seed
```

- Start the Node server:

```sh
  npm start
```

- Start the Node server with nodemon:

```sh
  npm run debug
```

- Run the unit tests:

```sh
  npm run test:mocha
```

- Run the linter:

```sh
  npm run lint
```

  <br />
</details>
