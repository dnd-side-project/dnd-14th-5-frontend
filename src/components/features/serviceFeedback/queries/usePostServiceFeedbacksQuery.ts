import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { post } from '@/src/lib/api';

import { SERVICE_FEEDBACKS_QUERY_KEYS } from '../constants/queryKey';
import { SERVICE_FEEDBACKS_ENDPOINTS } from '../constants/url';

const DataSchema = z.object({
  serviceRating: z.number(),
  serviceFeedback: z.string(),
});

type DataType = z.infer<typeof DataSchema>;

const postServiceFeedbacks = ({ serviceRating, serviceFeedback }: DataType) =>
  post(
    SERVICE_FEEDBACKS_ENDPOINTS['serviceFeedbacks'],
    {
      serviceRating,
      serviceFeedback,
    },
    {
      dataSchema: DataSchema,
    },
  );

export const usePostServiceFeedbackQuery = () =>
  useMutation({
    mutationKey: SERVICE_FEEDBACKS_QUERY_KEYS['serviceFeedbacks'],
    mutationFn: ({ serviceRating, serviceFeedback }: DataType) =>
      postServiceFeedbacks({ serviceRating, serviceFeedback }),
  });
