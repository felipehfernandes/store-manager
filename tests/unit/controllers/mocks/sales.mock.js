const allSales = [
  {
    "saleId": 1,
    "productId": 1,
    "quantity": 5,
    "date": "2021-11-12T16:26:46.000Z",
  },
  {
    "saleId": 1,
    "productId": 2,
    "quantity": 10,
    "date": "2021-11-12T16:26:46.000Z",
  },
  {
    "saleId": 2,
    "productId": 3,
    "quantity": 15,
    "date": "2022-11-12T16:26:46.000Z",
  }
];

const saleById = [
  {
    "productId": 1,
    "quantity": 5,
    "date": "2022-11-12T16:26:46.000Z",
  },
  {
    "productId": 2,
    "quantity": 10,
    "date": "2022-11-12T16:26:46.000Z",
  }
];

const newSale = [
  {
    "productId": 1,
    "quantity": 1,
  },
  {
    "productId": 2,
    "quantity": 5,
  }
]

const missingProducts = [
  {
    "productId": "f",
    "quantity": 1,
  },
  {
    "productId": 2,
    "quantity": 5,
  }
]

const invalidQuantity = [
  {
    "productId": 1,
    "quantity": 0,
  },
  {
    "productId": 2,
    "quantity": 5,
  }
]

module.exports = {
  allSales,
  saleById,
  newSale,
  missingProducts,
  invalidQuantity,
}