import { useRouter } from 'next/navigation';
import { type ChangeEvent, useEffect, useState } from 'react';

import { useToast } from '@/src/hooks/useToast';

import type { GroupType } from '../constants/groupType';
import {
  type CreateGroupResponse,
  useCreateGroupMutation,
} from '../queries/useCreateGroupMutation';
import { useUploadImageMutation } from '../queries/useUploadImageMutation';

export const useGroupCreate = (type: GroupType) => {
  const router = useRouter();
  const { showToast } = useToast();
  const { mutateAsync: createGroup, isPending: isCreating } =
    useCreateGroupMutation();
  const { mutateAsync: uploadImage, isPending: isUploading } =
    useUploadImageMutation();
  const isPending = isCreating || isUploading;
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [createdGroupId, setCreatedGroup] =
    useState<CreateGroupResponse | null>(null);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      showToast({ message: '10MB 이하의 이미지만 업로드할 수 있어요.' });
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isPending) return;
    const trimmed = name.trim();
    if (!trimmed) return;

    try {
      const image = imageFile ? await uploadImage(imageFile) : null;
      const result = await createGroup({ name: trimmed, type, image });
      setCreatedGroup(result);
      setIsSuccessModalOpen(true);
    } catch {
      showToast({ message: '그룹 생성에 실패했어요.' });
    }
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    router.push('/groups');
  };

  return {
    name,
    setName,
    imagePreview,
    isPending,
    handleImageChange,
    handleSubmit,
    isSuccessModalOpen,
    handleCloseSuccessModal,
    createdGroupId,
  };
};
