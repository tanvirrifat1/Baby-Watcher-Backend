import { z } from 'zod';

const emergencyContactValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    contact: z
      .string({ required_error: 'Contact is required' })
      .min(6, 'minimum 6 characters required')
      .regex(/^\d+$/, 'Contact must be a number'),
  }),
});

export const EmergencyContactValidation = {
  emergencyContactValidation,
};
