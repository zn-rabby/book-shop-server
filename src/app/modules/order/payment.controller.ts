import catchAsync from '../../utils/catchAsync';

const paymentSuccessController = catchAsync(async (req, res) => {
  res.redirect(`https://book-shop-client-seven.vercel.app/pay-success`);
});

const paymentFailController = catchAsync(async (req, res) => {
  res.redirect(`https://book-shop-client-seven.vercel.app/pay-fail`);
});
const paymentCancelController = catchAsync(async (req, res) => {
  res.redirect(`https://book-shop-client-seven.vercel.app/pay-cancel`);
});

export const PaymentControllers = {
  paymentSuccessController,
  paymentFailController,
  paymentCancelController,
};
