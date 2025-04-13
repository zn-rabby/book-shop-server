import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AnalyticsServices } from './analytics.service';

const getStatsController = catchAsync(async (req, res) => {
  const stats = await AnalyticsServices.getStats();
  sendResponse(res, {
    success: true,
    message: 'Stats data retrieved successfully',
    statusCode: 200,
    data: stats,
  });
});

export const AnalyticsControllers = {
  getStatsController,
};
