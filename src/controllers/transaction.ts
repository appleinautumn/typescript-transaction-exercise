// import axios from 'axios';
import { RequestHandler } from 'express';
import _ from 'lodash';

import { TransactionDatabase, getData } from '../db';
import { Transaction } from '../models/transaction';

interface Filterable {
  id: number;
  account: string;
  amount: string;
  counterparty: string;
  date: string;
  location: string;
}

export const listTransactions: RequestHandler = async (req, res, next) => {
  const { sort: sortOriginal, ...filterObject } = req.query;

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

  // sort the list
  if (sortableFields.length > 0) {
    return res.success(_.sortBy(transactionList, sortableFields));
  }

  res.success(transactionList);
};

export const getTransaction: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  res.send('get');
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

  let fieldsArray: string[] = [];
  let validFields: string[] = [];

  if (str) {
    if (typeof str === 'string') {
      fieldsArray = str.split(',');

      if (fieldsArray.length > 0) {
        if (type === 'SORT') {
          // SORT
          validFields = fieldsArray.filter((field) => {
            return sortableFields.includes(field);
          });
        }
      }
    }
  }

  return validFields;
};
