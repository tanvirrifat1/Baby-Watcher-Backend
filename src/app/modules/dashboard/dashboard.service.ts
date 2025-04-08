import { USER_ROLES } from '../../../enums/user';
import { Subscriptation } from '../subscription/subscription.model';
import { User } from '../user/user.model';

const totalStatistics = async () => {
  const [totalEarning, totalUser] = await Promise.all([
    Subscriptation.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$packagePrice' },
        },
      },
    ]).then(result => (result.length > 0 ? result[0].totalAmount : 0)),

    User.countDocuments({
      role: { $in: [USER_ROLES.PARENT, USER_ROLES.BABY_SITTER] },
    }),
  ]);

  return {
    totalEarning,
    totalUser,
  };
};

const getRecentTransactions = async (query: Record<string, unknown>) => {
  const { page, limit, searchTerm, ...filterData } = query;
  const anyConditions: any[] = [];

  // Filter by additional filterData fields
  if (Object.keys(filterData).length > 0) {
    const filterConditions = Object.entries(filterData).map(
      ([field, value]) => ({ [field]: value })
    );
    anyConditions.push({ $and: filterConditions });
  }

  const whereConditions =
    anyConditions.length > 0 ? { $and: anyConditions } : {};

  // Pagination setup
  const pages = parseInt(page as string) || 1;
  const size = parseInt(limit as string) || 10;
  const skip = (pages - 1) * size;

  // Fetch campaigns
  const result = await Subscriptation.find(whereConditions)
    .populate('userId')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(size)
    .lean();

  const count = await Subscriptation.countDocuments(whereConditions);

  return {
    result,
    meta: {
      page: pages,
      total: count,
    },
  };
};

const getAllUsers = async (query: Record<string, unknown>) => {
  const { page, limit, searchTerm, ...filterData } = query;
  const anyConditions: any[] = [];

  anyConditions.push({ role: { $ne: USER_ROLES.ADMIN } });

  // Filter by additional filterData fields
  if (Object.keys(filterData).length > 0) {
    const filterConditions = Object.entries(filterData).map(
      ([field, value]) => ({ [field]: value })
    );
    anyConditions.push({ $and: filterConditions });
  }

  const whereConditions =
    anyConditions.length > 0 ? { $and: anyConditions } : {};

  // Pagination setup
  const pages = parseInt(page as string) || 1;
  const size = parseInt(limit as string) || 10;
  const skip = (pages - 1) * size;

  // Fetch campaigns
  const result = await User.find(whereConditions)

    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(size)
    .lean();

  const count = await User.countDocuments(whereConditions);

  return {
    result,
    meta: {
      page: pages,
      total: count,
    },
  };
};

export const DashboardService = {
  totalStatistics,
  getRecentTransactions,
  getAllUsers,
};
