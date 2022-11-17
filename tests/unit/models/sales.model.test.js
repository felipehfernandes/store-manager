const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/connection');
const SalesModel = require('../../../src/models/sales.model');
const SalesMock = require('./mocks/sales.mock');

describe('Sales Model', function () {
  describe('Testando as rotas do tipo POST', function () {
    beforeEach(sinon.restore);
    it('Deve criar uma nova venda', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

      const result = await SalesModel.insertSale();

      expect(result).to.be.equal(1);
    })
  })
  describe('Testando as rotas do tipo GET', function () {
    beforeEach(sinon.restore);
    it('Deve retornar todas as vendas', async function () {
      sinon.stub(connection, 'execute').resolves([SalesMock.allSales]);

      const result = await SalesModel.findAll();

      expect(result).to.be.deep.equal(SalesMock.allSales);
      expect(result).to.be.a('array');
    })

    it('Deve retornar uma venda pelo id', async function () {
      sinon.stub(connection, 'execute').resolves([SalesMock.saleById]);

      const result = await SalesModel.findById(1);

      expect(result).to.be.deep.equal(SalesMock.saleById);
    })
  })
})