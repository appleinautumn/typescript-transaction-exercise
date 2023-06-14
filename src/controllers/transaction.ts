import { RequestHandler } from 'express';
import _ from 'lodash';

import { TransactionDatabase, getData } from '../db';
import { Transaction } from '../models/transaction';

export const listTransactions: RequestHandler = async (req, res, next) => {
  const { sort: sortOriginal, ...filterObject } = req.query;

  let filters: any = {};

  // convert filters of union type to object type
  Object.entries(filterObject).forEach(([key, val]) => {
    filters[key] = val;
  });

  // convert sorts of union type to string type
  let sortString = '';
  if (sortOriginal) {
    if (typeof sortOriginal === 'string') {
      sortString = sortOriginal;
    }
  }

  // get sortable fields
  const sortableFields = getValidFields(sortString, 'SORT');
  console.log({ sortableFields });

  // get data from database
  const data: TransactionDatabase<Transaction> = getData();

  // convert it to list of transactions
  const transactionList: Transaction[] = [];
  Object.entries(data).forEach(([key, val]) => {
    transactionList.push(val);
  });

  // start filtering
  let filteredData: any;
  Object.entries(filters).forEach(([key, val]) => {
    filteredData = transactionList.filter((el) => {
      const k = key as string;
      console.log(el[k as keyof Transaction] as string, val);

      return (el[k as keyof Transaction] as string).toLowerCase() === val;
    });

    console.log({ filteredData });
  });

  // sort the list
  if (sortableFields.length > 0) {
    return res.success(_.sortBy(filteredData, sortableFields));
  }

  res.success(filteredData);
};

export const getTransaction: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  const { fields: fieldsOriginal } = req.query;

  // convert fields union type to string type
  let fieldString = '';
  if (fieldsOriginal) {
    if (typeof fieldsOriginal === 'string') {
      fieldString = fieldsOriginal;
    }
  }

  // get searchable fields
  const validFields = getValidFields(fieldString, 'FIELD');

  // get data
  const data: TransactionDatabase<Transaction> = getData();

  // get transaction by id
  const transaction: Transaction = data[Number(id)];

  if (!transaction) {
    return res.json({});
    // throw new Error('not found');
  }

  res.success(formatTransactionWithFields(transaction, validFields));
};

const getValidFields: (str: string, type: 'FIELD' | 'SORT') => string[] = (
  str: string,
  type: 'FIELD' | 'SORT'
) => {
  const sortableFields: string[] = [
    'id',
    'account',
    'amount',
    'counterparty',
    'date',
    'location',
  ];

  const searchableFields: string[] = [
    'id',
    'account',
    'amount',
    'counterparty',
    'tags',
    'date',
    'location',
  ];

  let fieldsArray: string[] = [];
  let validFields: string[] = [];

  if (str) {
    if (typeof str === 'string') {
      fieldsArray = str.split(',');

      if (fieldsArray.length > 0) {
        if (type === 'FIELD') {
          validFields = fieldsArray.filter((field) => {
            return searchableFields.includes(field);
          });
        } else {
          // SORT
          validFields = fieldsArray.filter((field) => {
            return sortableFields.includes(field);
          });
        }
      }
    }
  }

  if (type === 'FIELD' && validFields.length === 0) {
    validFields = searchableFields;
  }

  return validFields;
};

const formatTransactionWithFields: (
  t: Transaction,
  f: string[]
) => Transaction = (transaction: Transaction, fields: string[]) => {
  const o: any = {};
  Object.entries(transaction).forEach(([key, val]) => {
    if (fields.includes(key)) {
      o[key] = val;
    }
  });

  return o;
};
