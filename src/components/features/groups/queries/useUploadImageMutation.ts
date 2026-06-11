import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import api from '@/src/lib/api/instance';

import { IMAGE_ENDPOINT } from '../constants/url';

const uploadImageResponseSchema = z.object({ url: z.string() });

const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post(IMAGE_ENDPOINT.upload, formData);

  return uploadImageResponseSchema.parse(response.data).url;
};

export const useUploadImageMutation = () =>
  useMutation({ mutationFn: uploadImage });
