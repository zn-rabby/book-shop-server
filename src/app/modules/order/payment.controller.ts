import catchAsync from '../../utils/catchAsync';

const paymentSuccessController = catchAsync(async (req, res) => {
    console.log(req.transactionId);
  res.redirect(`http://localhost:5173/pay-success`);
});

const paymentFailController = catchAsync(async (req, res) => {
  res.redirect(`http://localhost:5173/pay-fail`);
});
const paymentCancelController = catchAsync(async (req, res) => {
  res.redirect(`http://localhost:5173/pay-cancel`);
});

export const PaymentControllers = {
  paymentSuccessController,
  paymentFailController,
  paymentCancelController,
};
