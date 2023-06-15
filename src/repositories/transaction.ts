import fs from 'fs';
import * as csv from 'fast-csv';
import { ParserOptionsArgs } from 'fast-csv';
import { HeaderArray, HeaderTransformFunction } from '@fast-csv/parse';
import createError from 'http-errors';
import _ from 'lodash';
import * as path from 'path';

import { Transaction, TransactionDatabase } from '../models/transaction';

export default class TransactionRepository {
  #db: any = {};

  constructor(filename: string) {
    const options: ParserOptionsArgs = {
      objectMode: true,
      delimiter: ',',
      quote: '"',
      headers: (headerArray) =>
        headerArray.map((header: string | null | undefined) =>
          header?.toLowerCase()
        ),
    };

    fs.createReadStream(path.resolve(__dirname, '../../data', filename))
      .pipe(csv.parse(options))
      .on('error', (error) => {
        console.log(error);
      })
      .on('data', (row) => {
        // make id integer
        const id = Number(row.id);

        // make tags an array
        const tags: string[] = row.tags.split(',');
        row.tags = tags.map((el) => el.trim());

        this.#db[id] = row;
      })
      .on('end', (rowCount: number) => {
        // console.log(rowCount);
      });
  }

  list(filters: any, sortableFields: string[]) {
    // convert it to list of transactions
    const transactionList: Transaction[] = [];
    Object.entries(this.#db).forEach(([key, val]) => {
      transactionList.push(val as Transaction);
    });

    // start filtering
    let filteredData: any;

    if (Object.keys(filters).length) {
      Object.entries(filters).forEach(([key, val]) => {
        filteredData = transactionList.filter((el) => {
          const k = key as string;
          return (el[k as keyof Transaction] as string).toLowerCase() === val;
        });
      });
    } else {
      filteredData = transactionList;
    }

    // sort the list
    if (sortableFields.length > 0) {
      return _.sortBy(filteredData, sortableFields);
    }

    return transactionList;
  }

  get(id: number) {
    // get transaction by id
    const transaction: Transaction = this.#db[id];

    if (!transaction) {
      throw createError(404, 'Transaction not found.');
    }

    return transaction;
  }
}
