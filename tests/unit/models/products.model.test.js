const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/connection');
const ProductsModel = require('../../../src/models/products.model');
const ProductsMock = require('./mocks/products.mock');

describe('Products Model', function () {
  describe('Testando as rotas do tipo GET', function () {
    beforeEach(sinon.restore);
    it('Deve retornar todos os produtos', async function () {
      sinon.stub(connection, 'execute').resolves([ProductsMock.allProducts]);

      const result = await ProductsModel.findAll();

      expect(result).to.be.deep.equal(ProductsMock.allProducts);
      expect(result).to.be.a('array');
    })

    it('Deve retornar um produto pelo id', async function () {
      sinon.stub(connection, 'execute').resolves([[ProductsMock.findById]]);

      const result = await ProductsModel.findById(1);

      expect(result).to.be.deep.equal(ProductsMock.findById);
      expect(result).to.be.a('object');
    })

    it('Deve retornar um erro caso o produto não seja encontrado pelo id', async function () {
      sinon.stub(connection, 'execute').resolves([[ProductsMock.errorFindById]]);

      const result = await ProductsModel.findById(999);

      expect(result).to.be.deep.equal(ProductsMock.errorFindById);
      expect(result).to.be.a('object');
    })
  })
});