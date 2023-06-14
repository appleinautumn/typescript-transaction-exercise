// import axios from 'axios';
import { RequestHandler } from 'express';
import _ from 'lodash';

import { TransactionDatabase, getData } from '../db';
import { Transaction } from '../models/transaction';
import { parseCsvString } from '../util/csv';

async function getData(): Promise<string> {
  const dataUrl =
    'https://raw.githubusercontent.com/bunker-tech/take-home-exercises/main/shared/sample_transactions.csv';

  const { data, status } = await axios({
    method: 'get',
    url: dataUrl,
  });

  return data;
}

export const listTransactions: RequestHandler = async (req, res, next) => {
  res.send('list');
};

export const getTransaction: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  res.send('get');
};
