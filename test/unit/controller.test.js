const chai = require('chai');
const { faker } = require('@faker-js/faker');
const sinon = require('sinon');

const { expect } = chai;

const TransactionRepository = require('../../dist/repositories/transaction');
const TransactionController = require('../../dist/controllers/transaction');

const repository = new TransactionRepository.default('data.csv');
const controller = new TransactionController.default(repository);

describe('CRM Controller Unit Test', () => {
  let success;
  let status;
  let res;
  let next;

  beforeEach(() => {
    success = sinon.spy();
    status = sinon.stub();
    res = { success, status };
    // status.returns(res);
    next = sinon.spy();
  });

  afterEach(() => {
    sinon.restore();
  });

  const accounts = ['Savings', 'Checking', 'Joint Account'];

  const tags = [
    'Entertainment',
    'General Expenses',
    'Groceries',
    'Dining',
    'Travel',
    'Transportation',
  ];

  const counterparties = [
    'ACME',
    'Uber',
    'Grab',
    'Gojek',
    'Fairprice',
    'Starbucks',
    'Amazon',
    'Wallmart',
    'Google',
  ];

  describe('Test index method', async () => {
    it('should list transactions', async () => {
      const req = {
        query: {},
        body: {},
        user: {},
      };

      const stubResponse = [
        {
          id: faker.number.int({ min: 1, max: 1000 }),
          account: faker.helpers.arrayElement(accounts),
          amount: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
          counterparty: faker.helpers.arrayElement(counterparties),
          tags: faker.helpers.arrayElements(tags, { min: 1, max: 4 }),
          date: '2022-06-03',
          location: 'Japan',
        },
        {
          id: faker.number.int({ min: 1, max: 1000 }),
          account: faker.helpers.arrayElement(accounts),
          amount: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
          counterparty: faker.helpers.arrayElement(counterparties),
          tags: faker.helpers.arrayElements(tags, { min: 1, max: 4 }),
          date: '2022-06-03',
          location: 'Japan',
        },
      ];

      // stub listCount
      const stub1 = sinon.stub(repository, 'list').returns(stubResponse);

      // call listTransactions
      await controller.listTransactions(req, res, next);

      expect(stub1.calledOnce).to.be.true;
      expect(success.calledOnce).to.be.true;
      expect(success.args[0][0]).to.be.an('array');
      expect(success.args[0][0][0].id).to.to.equal(stubResponse[0].id);
      expect(success.args[0][0][0].account).to.to.equal(
        stubResponse[0].account
      );
      expect(success.args[0][0][0].amount).to.to.equal(stubResponse[0].amount);
      expect(success.args[0][0][0].counterparty).to.to.equal(
        stubResponse[0].counterparty
      );
      expect(success.args[0][0][0].date).to.to.equal(stubResponse[0].date);
      expect(success.args[0][0][0].location).to.to.equal(
        stubResponse[0].location
      );

      expect(success.args[0][0][1].id).to.to.equal(stubResponse[1].id);
      expect(success.args[0][0][1].account).to.to.equal(
        stubResponse[1].account
      );
      expect(success.args[0][0][1].amount).to.to.equal(stubResponse[1].amount);
      expect(success.args[0][0][1].counterparty).to.to.equal(
        stubResponse[1].counterparty
      );
      expect(success.args[0][0][1].date).to.to.equal(stubResponse[1].date);
      expect(success.args[0][0][1].location).to.to.equal(
        stubResponse[1].location
      );
    });

    it('should get a transactions by id', async () => {
      const transactionId = 100;

      const req = {
        params: {
          id: transactionId,
        },
        query: {},
        body: {},
        user: {},
      };

      const stubResponse = {
        id: transactionId,
        account: faker.helpers.arrayElement(accounts),
        amount: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
        counterparty: faker.helpers.arrayElement(counterparties),
        tags: faker.helpers.arrayElements(tags, { min: 1, max: 4 }),
        date: '2022-06-03',
        location: 'Japan',
      };

      // stub get
      const stub1 = sinon.stub(repository, 'get').returns(stubResponse);

      // call getTransaction
      await controller.getTransaction(req, res, next);

      expect(stub1.calledOnce).to.be.true;
      expect(success.calledOnce).to.be.true;

      expect(success.args[0][0].id).to.equal(stubResponse.id);
      expect(success.args[0][0].account).to.equal(stubResponse.account);
      expect(success.args[0][0].amount).to.equal(stubResponse.amount);
      expect(success.args[0][0].counterparty).to.equal(
        stubResponse.counterparty
      );
      expect(success.args[0][0].date).to.equal(stubResponse.date);
      expect(success.args[0][0].location).to.equal(stubResponse.location);
    });
  });
});
