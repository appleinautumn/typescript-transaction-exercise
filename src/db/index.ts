import fs from 'fs';
import * as csv from 'fast-csv';
import { ParserOptionsArgs } from 'fast-csv';
import { HeaderArray, HeaderTransformFunction } from '@fast-csv/parse';
import * as path from 'path';

import { Transaction } from '../models/transaction';

export interface TransactionDatabase<T> {
  [key: string]: T;
}

// create a hashtable to simulate the database
const _db: TransactionDatabase<Transaction> = {};

export function getData() {
  return _db;
}

export async function loadDatabase() {
  const options: ParserOptionsArgs = {
    objectMode: true,
    delimiter: ',',
    quote: '"',
    headers: (headerArray) =>
      headerArray.map((header: string | null | undefined) =>
        header?.toLowerCase()
      ),
  };

  fs.createReadStream(path.resolve(__dirname, '../../data', 'data.csv'))
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

      _db[id] = row;
    })
    .on('end', (rowCount: number) => {
      // console.log(rowCount);
    });
}
