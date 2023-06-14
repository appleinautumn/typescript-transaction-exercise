import fs from 'fs';
import * as csv from 'fast-csv';
import { ParserOptionsArgs } from 'fast-csv';
import * as path from 'path';

import { Transaction } from '../models/transaction';

let data: Transaction[];

export async function loadDatabase() {
  const options: ParserOptionsArgs = {
    objectMode: true,
    delimiter: ',',
    quote: '"',
    headers: true,
    renameHeaders: false,
  };

  fs.createReadStream(path.resolve(__dirname, '../../data', 'data.csv'))
    .pipe(csv.parse(options))
    .on('error', (error) => {
      console.log(error);
    })
    .on('data', (row) => {
      data.push(row);
    })
    .on('end', (rowCount: number) => {
      return _db;
    });
}
