const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const ProductsController = require('../../../src/controllers/products.controller');
const ProductsService = require('../../../src/services/products.service');
const ProductsMock = require('./mocks/products.mock');

describe('Products Controller', function () {
  describe('Testando as rotas do tipo GET', async function () {
    beforeEach(sinon.restore);
    it('Deve retornar todos os produtos', async function () {
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(ProductsService, 'findAll').resolves({
        type: null,
        message: ProductsMock.allProducts,
      });

      await ProductsController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(ProductsMock.allProducts);
    })

    it('Deve retornar um produto pelo id', async function () {
      const req = {
        params: {
          id: 1
        }
      };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(ProductsService, 'findById').resolves({
        type: null,
        message: ProductsMock.findById,
      });

      await ProductsController.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(ProductsMock.findById);
    })

    it('Deve retornar um erro caso o produto não seja encontrado pelo id', async function () {
      const req = {
        params: {
          id: 999,
        }
      };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(ProductsService, 'findById').resolves({
        type: 'PRODUCT_NOT_FOUND',
        message: 'Product not found',
      });

      await ProductsController.findById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'Product not found',
      });
    })
  })
});