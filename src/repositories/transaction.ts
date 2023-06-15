import fs from 'fs';
import * as csv from 'fast-csv';
import { ParserOptionsArgs } from 'fast-csv';
import { HeaderArray, HeaderTransformFunction } from '@fast-csv/parse';
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

    // fs.createReadStream(path.resolve(__dirname, '../../data', 'data.csv'))
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

  list() {
    return this.#db;
  }

  get() {
    return this.#db;
  }
}
