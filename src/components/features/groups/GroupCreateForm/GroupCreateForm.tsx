'use client';

import Image from 'next/image';

import BottomCTA from '@/src/components/layout/BottomCTA/BottomCTA';
import Button from '@/src/components/ui/Button/Button';

import type { GroupType } from '../constants/groupType';
import { useGroupCreate } from '../hooks/useGroupCreate';

interface GroupCreateFormProps {
  type: GroupType;
}

const GroupCreateForm = ({ type }: GroupCreateFormProps) => {
  const {
    name,
    setName,
    imagePreview,
    fileInputRef,
    isPending,
    handleImageChange,
    handleSubmit,
  } = useGroupCreate(type);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="pt-14 px-7.5 pb-32 flex flex-col gap-8"
      >
        <div>
          <h2 className="font-heading-h4 mt-8">그룹 이름을 작성해주세요</h2>
          <div className="mt-5">
            <label
              htmlFor="group-name"
              className="pl-2 font-caption-n text-g-80"
            >
              그룹 이름
            </label>
            <input
              id="group-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="그룹 이름을 입력해주세요"
              className="mt-2 h-12 w-full rounded-xl border border-g-500 bg-g-700 px-2 font-body-s text-g-0 placeholder:text-g-400 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <h2 className="font-heading-h4">대표 이미지를 선택해주세요</h2>
          <div className="mt-5">
            <label
              htmlFor="group-image"
              className="pl-2 font-caption-n text-g-80"
            >
              대표 이미지
            </label>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 w-full aspect-square rounded-2xl bg-g-600 flex items-center justify-center overflow-hidden"
            >
              {imagePreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imagePreview}
                  alt="그룹 대표 이미지 미리보기"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src="/icons/image-placeholder.svg"
                  width={49}
                  height={49}
                  alt=""
                />
              )}
            </button>
            <input
              ref={fileInputRef}
              id="group-image"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleImageChange}
            />
          </div>
        </div>
      </form>

      <BottomCTA>
        <Button
          label={isPending ? '생성 중...' : '그룹 생성하기'}
          onClick={handleSubmit}
          disabled={isPending}
        />
      </BottomCTA>
    </>
  );
};

export default GroupCreateForm;
