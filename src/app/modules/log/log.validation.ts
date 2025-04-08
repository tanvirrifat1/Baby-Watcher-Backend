import { z } from 'zod';

const LogSchema = z.object({
  body: z.object({
    date: z.coerce.date(),
    time: z
      .string()
      .regex(
        /^(0?[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/,
        'Invalid time format (hh:mm AM/PM)'
      ),
    otherAct: z.string().min(1, 'Specific activity is required').optional(),
    activity: z.string().min(1, 'Regular activity is required').optional(),
  }),
});

const updateLogSchema = z.object({
  body: z.object({
    date: z.coerce.date().optional(),
    time: z
      .string()
      .regex(
        /^(0?[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/,
        'Invalid time format (hh:mm AM/PM)'
      )
      .optional(),
    otherAct: z.string().min(1, 'Specific activity is required').optional(),
    activity: z.string().min(1, 'Regular activity is required').optional(),
  }),
});

export const LogValidation = {
  LogSchema,
  updateLogSchema,
};
