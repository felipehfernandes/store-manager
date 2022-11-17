const sinon = require('sinon');
const { expect } = require('chai');

const SalesModel = require('../../../src/models/sales.model');
const ProductsModel = require('../../../src/models/products.model');
const SalesService = require('../../../src/services/sales.service');
const SalesMock = require('./mocks/sales.mock');

describe('Sales Service', function () {
  describe('Testando as rotas do tipo POST', function () {
    beforeEach(sinon.restore);
    it('Deve criar uma nova venda', async function () {
      sinon.stub(SalesModel, 'insertSale').resolves(3);
      sinon.stub(ProductsModel, 'findById').resolves(true);
      sinon.stub(SalesModel, 'insert').resolves();

      const result = await SalesService.insert(SalesMock.newSale);

      expect(result).to.be.deep.equal({
        type: null,
        message: SalesMock.newSaleReturn,
      })
    })

    it('Deve retornar um erro de Id not found', async function () {
      sinon.stub(ProductsModel, 'findById').resolves(false);

      const result = await SalesService.insert(SalesMock.missingProducts);

      expect(result.type).to.be.equal('ID_NOT_FOUND');
      expect(result.message).to.be.equal('Product not found');
    });

    it('Deve retornar um erro de quantidade', async function () {
      const result = await SalesService.insert(SalesMock.invalidQuantity);

      expect(result.type).to.be.equal('INVALID_VALUE');
      expect(result.message).to.be.equal('"quantity" must be greater than or equal to 1');
    });
  });

  describe('Testando as rotas do tipo GET', function () {
    beforeEach(sinon.restore);
    it('Deve retornar todas as vendas', async function () {
      sinon.stub(SalesModel, 'findAll').resolves(SalesMock.allSales);

      const result = await SalesService.findAll();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(SalesMock.allSales);
    });

    it('Deve retornar uma venda pelo id', async function () {
      sinon.stub(SalesModel, 'findById').resolves(SalesMock.saleById);

      const result = await SalesService.findById(1);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(SalesMock.saleById);
    });
  });
});