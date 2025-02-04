/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import SSLCommerzPayment from 'sslcommerz-lts';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TPaymentResponse } from './order.interface';

const store_id = config.store_id;
const store_pass = config.store_pass;
const is_live = false; // true for live false for sandbox

const initiatePayment = async (paymentData: TPaymentResponse) => {
  const sslcz = new SSLCommerzPayment(store_id, store_pass, is_live);

  try {
    const apiResponse = await sslcz.init({
      ...paymentData,
    });

    return apiResponse.GatewayPageURL;
  } catch (error) {
    throw new AppError(400, 'Failed to initiate payment');
  }
};

export const SSLCommerzService = {
  initiatePayment,
};
