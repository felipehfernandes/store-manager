const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const SalesController = require('../../../src/controllers/sales.controller');
const SalesService = require('../../../src/services/sales.service')
const SalesMock = require('./mocks/sales.mock');

describe('Sales Controller', function () {
  describe('Testando as rotas do tipo POST', function () {
    beforeEach(sinon.restore);
    it('Deve criar uma nova venda', async function () {
      const req = {
        body: SalesMock.newSale
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(SalesService, 'insert').resolves({
        type: null,
        message: SalesMock.newSale,
      });

      await SalesController.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(SalesMock.newSale);
    });

    it('Deve retornar um erro de Product not found', async function () {
      const req = {
        body: SalesMock.missingProducts
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(SalesService, 'insert').resolves({
        type: 'ID_NOT_FOUND',
        message: 'Product not found',
      });

      await SalesController.create(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('Deve retornar um erro de quantidade', async function () {
      const req = {
        body: SalesMock.invalidQuantity
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(SalesService, 'insert').resolves({
        type: 'INVALID_VALUE',
        message: '"quantity" must be larger than or equal to 1',
      });

      await SalesController.create(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" must be larger than or equal to 1' });
    });
  });

  describe('Testando as rotas do tipo GET', function () {
    beforeEach(sinon.restore);
    it('Deve retornar todas as vendas', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(SalesService, 'findAll').resolves({
        type: null,
        message: SalesMock.allSales,
      });

      await SalesController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(SalesMock.allSales);
    });

    it('Deve retornar uma venda pelo ID', async function () {
      const req = {
        params: { id: 1 }
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(SalesService, 'findById').resolves({
        type: null,
        message: SalesMock.saleById,
      });

      await SalesController.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(SalesMock.saleById);
    });

    it('Deve retornar um erro de venda não encontrada', async function () {
      const req = {
        params: { id: 999 }
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(SalesService, 'findById').resolves({
        type: 'SALE_NOT_FOUND',
        message: 'Sale not found',
      });

      await SalesController.findById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });
})