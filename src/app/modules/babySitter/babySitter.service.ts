import { USER_ROLES } from '../../../enums/user';
import { User } from '../user/user.model';

const getAllBabySitter = async (query: Record<string, unknown>) => {
  const { page, limit, searchTerm, ...filterData } = query;
  const anyConditions: any[] = [];

  // Filter by additional filterData fields
  if (Object.keys(filterData).length > 0) {
    const filterConditions = Object.entries(filterData).map(
      ([field, value]) => ({ [field]: value })
    );
    anyConditions.push({ $and: filterConditions });
  }

  anyConditions.push({ role: USER_ROLES.BABY_SITTER });

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

export const BabySitterService = {
  getAllBabySitter,
};
