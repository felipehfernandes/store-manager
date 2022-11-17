const sinon = require('sinon');
const { expect } = require('chai');

const ProductsModel = require('../../../src/models/products.model');
const ProductsService = require('../../../src/services/products.service');
const ProductsMock = require('./mocks/products.mock');

describe('Products Service', function () {
  describe('Testando as rotas do tipo GET', function () {
    beforeEach(sinon.restore);
    it('Deve retornar todos os produtos', async function () {
      sinon.stub(ProductsModel, 'findAll').resolves(ProductsMock.allProducts.findAll);

      const result = await ProductsService.findAll();

      expect(result).to.be.deep.equal({
        type: null,
        message: ProductsMock.findAll,
      });
    })

    it('Deve retornar um produto pelo id', async function () {
      sinon.stub(ProductsModel, 'findById').resolves(ProductsMock.findById);

      const result = await ProductsService.findById(1);

      expect(result).to.be.deep.equal({
        type: null,
        message: ProductsMock.findById,
      });
    })

    it('Deve retornar um erro caso o produto não seja encontrado pelo id', async function () {
      sinon.stub(ProductsModel, 'findById').resolves();

      const result = await ProductsService.findById(1);

      expect(result).to.be.deep.equal(ProductsMock.errorFindById);
    })
  })
});