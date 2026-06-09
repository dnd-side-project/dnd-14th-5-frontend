import { useRouter } from 'next/navigation';
import { type ChangeEvent, useRef, useState } from 'react';

import { useToast } from '@/src/hooks/useToast';

import type { GroupType } from '../constants/groupType';
import { useCreateGroupMutation } from '../queries/useCreateGroupMutation';

export const useGroupCreate = (type: GroupType) => {
  const router = useRouter();
  const { showToast } = useToast();
  const { mutateAsync: createGroup, isPending } = useCreateGroupMutation();
  const [name, setName] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    try {
      await createGroup({ name: trimmed, type, image: null });
      router.push('/groups');
    } catch {
      showToast({ message: '그룹 생성에 실패했어요.' });
    }
  };

  return {
    name,
    setName,
    imagePreview,
    fileInputRef,
    isPending,
    handleImageChange,
    handleSubmit,
  };
};
