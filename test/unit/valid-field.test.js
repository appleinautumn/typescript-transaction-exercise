const chai = require('chai');
const { faker } = require('@faker-js/faker');

const { expect } = chai;

const {
  formatTransactionWithFields,
  getValidFields,
} = require('../../dist/controllers/transaction');

describe('Test getValidFields for sorts', () => {
  it('should empty array for empty sort string ', async () => {
    const sortString = '';

    const sortableFields = getValidFields(sortString, 'SORT');

    expect(sortableFields.length).to.equal(0);
  });

  it('should return empty array for all invalid fields (aa,bb,cc)', async () => {
    const sortString = 'aa,bb,cc';

    const sortableFields = getValidFields(sortString, 'SORT');

    expect(sortableFields.includes('aa')).to.be.false;
    expect(sortableFields.includes('bb')).to.be.false;
    expect(sortableFields.includes('cc')).to.be.false;
  });

  it('should return 1 valid field in an array and exclude invalid fields (aa,bb)', async () => {
    const sortString = 'id,aa,bb';

    const sortableFields = getValidFields(sortString, 'SORT');

    expect(sortableFields.includes('id')).to.be.true;
    expect(sortableFields.includes('aa')).to.be.false;
    expect(sortableFields.includes('bb')).to.be.false;
  });
});

describe('Test getValidFields for sparse fields', () => {
  it('should return complete valid fields for empty field string ', async () => {
    const fieldString = '';

    const validFields = getValidFields(fieldString, 'FIELD');

    expect(validFields.includes('id')).to.be.true;
    expect(validFields.includes('account')).to.be.true;
    expect(validFields.includes('amount')).to.be.true;
    expect(validFields.includes('counterparty')).to.be.true;
    expect(validFields.includes('tags')).to.be.true;
    expect(validFields.includes('date')).to.be.true;
    expect(validFields.includes('location')).to.be.true;
  });

  it('should return complete valid fields for all invalid field string ', async () => {
    const fieldString = 'aa,bb,cc';

    const validFields = getValidFields(fieldString, 'FIELD');

    expect(validFields.includes('id')).to.be.true;
    expect(validFields.includes('account')).to.be.true;
    expect(validFields.includes('amount')).to.be.true;
    expect(validFields.includes('counterparty')).to.be.true;
    expect(validFields.includes('tags')).to.be.true;
    expect(validFields.includes('date')).to.be.true;
    expect(validFields.includes('location')).to.be.true;
    expect(validFields.includes('aa')).to.be.false;
    expect(validFields.includes('bb')).to.be.false;
    expect(validFields.includes('cc')).to.be.false;
  });

  it('should return 1 valid field for 1 valid and other invalid string', async () => {
    const fieldString = 'id,aa,bb';

    const validFields = getValidFields(fieldString, 'FIELD');

    expect(validFields.includes('id')).to.be.true;
    expect(validFields.includes('account')).to.be.false;
    expect(validFields.includes('amount')).to.be.false;
    expect(validFields.includes('counterparty')).to.be.false;
    expect(validFields.includes('tags')).to.be.false;
    expect(validFields.includes('date')).to.be.false;
    expect(validFields.includes('location')).to.be.false;
    expect(validFields.includes('aa')).to.be.false;
    expect(validFields.includes('bb')).to.be.false;
  });
});

describe('Test formatTransactionWithFields', () => {
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

  const locations = ['Australia', 'Japan', 'Indonesia', 'Singapore'];

  it('should return an empty object for empty fields', async () => {
    const transaction = {
      id: faker.number.int({ min: 1, max: 1000 }),
      account: faker.helpers.arrayElement(accounts),
      amount: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
      counterparty: faker.helpers.arrayElement(counterparties),
      tags: faker.helpers.arrayElements(tags, { min: 1, max: 4 }),
      date: '2022-06-03',
      location: faker.helpers.arrayElement(locations),
    };

    const fields = [''];

    const res = formatTransactionWithFields(transaction, fields);

    expect(Object.keys(res).length).to.equal(0);
  });

  it('should return an empty object for all invalid fields', async () => {
    const transaction = {
      id: faker.number.int({ min: 1, max: 1000 }),
      account: faker.helpers.arrayElement(accounts),
      amount: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
      counterparty: faker.helpers.arrayElement(counterparties),
      tags: faker.helpers.arrayElements(tags, { min: 1, max: 4 }),
      date: '2022-06-03',
      location: faker.helpers.arrayElement(locations),
    };

    const fields = ['aa, bb, cc'];

    const res = formatTransactionWithFields(transaction, fields);

    expect(Object.keys(res).length).to.equal(0);
  });

  it('should return valid fields and exlude invalid fields', async () => {
    const transaction = {
      id: faker.number.int({ min: 1, max: 1000 }),
      account: faker.helpers.arrayElement(accounts),
      amount: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
      counterparty: faker.helpers.arrayElement(counterparties),
      tags: faker.helpers.arrayElements(tags, { min: 1, max: 4 }),
      date: '2022-06-03',
      location: faker.helpers.arrayElement(locations),
    };

    const fields = ['id', 'account', 'counterparty', 'aa', 'bb'];

    const res = formatTransactionWithFields(transaction, fields);

    expect(Object.keys(res).length).to.equal(3);
    expect('id' in res).to.be.true;
    expect('account' in res).to.be.true;
    expect('amount' in res).to.be.false;
    expect('counterparty' in res).to.be.true;
    expect('tags' in res).to.be.false;
    expect('date' in res).to.be.false;
    expect('location' in res).to.be.false;
  });
});
