import { Order } from '../order/order.model';
import Product from '../product/product.model';
import User from '../user/user.model';

const getStats = async () => {
  const totalOrders = await Order.countDocuments();

  const totalSales = await Order.aggregate([
    { $group: { _id: null, total: { $sum: '$totalAmount' } } },
  ]);

  const totalUsers = await User.countDocuments({ isDeleted: false });

  const totalProducts = await Product.countDocuments({ isDeleted: false });

  return {
    totalOrders,
    totalSales: totalSales[0]?.total || 0,
    totalUsers,
    totalProducts,
  };
};

export const AnalyticsServices = {
  getStats,
};
