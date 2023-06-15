import { RequestHandler } from 'express';
import _ from 'lodash';

import { Transaction, TransactionDatabase } from '../models/transaction';

export default class TransactionController {
  #repository: any;

  constructor(repo: any) {
    this.#repository = repo;
  }

  listTransactions: RequestHandler = async (req, res, next) => {
    try {
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

      // get data from database
      const data: TransactionDatabase<Transaction> = this.#repository.list(
        filters,
        sortableFields
      );

      res.success(data);
    } catch (e) {
      next(e);
    }
  };

  getTransaction: RequestHandler<{ id: string }> = async (req, res, next) => {
    try {
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
      const data: TransactionDatabase<Transaction> = this.#repository.get(
        Number(id)
      );

      res.success(formatTransactionWithFields(data, validFields));
    } catch (e) {
      next(e);
    }
  };
}

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
