'use client';

import { useState } from 'react';

const GroupCreateForm = () => {
  const [name, setName] = useState('');

  return (
    <form className="pt-14 px-7.5">
      <h2 className="font-heading-h4 mt-8">그룹 이름을 작성해주세요</h2>
      <div className="mt-5">
        <label htmlFor="group-name" className="pl-2 font-caption-n text-g-80">
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
    </form>
  );
};

export default GroupCreateForm;
