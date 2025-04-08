import { z } from 'zod';

export const zodSubscriptionSchema = z.object({
  body: z.object({
    productId: z.string({ required_error: 'Product id is required' }),
    purchaseId: z.string({ required_error: 'Purchase id is required' }),
    expiryDate: z.string({ required_error: 'Expiry date is required' }),
    purchaseDate: z
      .date()
      .or(
        z.string().refine(val => !isNaN(Date.parse(val)), 'Invalid date format')
      ),
    packageName: z.string({ required_error: 'Package name is required' }),
    purchaseToken: z.string({ required_error: 'Purchase token is required' }),
  }),
});
