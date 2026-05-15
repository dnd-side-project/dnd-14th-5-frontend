import Image from 'next/image';

interface GroupItem {
  id: string;
  name: string;
  type: 'friend' | 'character'; //TODO: 임시 타입 정의, 백엔드 정의에 맞춰 수정해야 함
  image: string;
}

interface GroupListProps {
  groups: GroupItem[];
  selectedId?: string;
}

const GroupList = ({ groups, selectedId }: GroupListProps) => {
  return (
    <div className="flex gap-4 overflow-x-auto py-2 scrollbar-x-transparent-track">
      {groups.map((item) => {
        const isSelected = selectedId === item.id;
        return (
          <div
            key={item.id}
            className="flex flex-col items-center gap-2 w-17.5 shrink-0"
          >
            <div className="relative">
              <Image
                src={item.image || '/images/default-group.svg'}
                alt={item.name}
                width={55}
                height={55}
                className="rounded-[10px]"
              />
              {!isSelected && (
                <div className="absolute inset-0 rounded-[10px] bg-g-900/60" />
              )}
            </div>
            <p className="font-caption-n text-g-0">{item.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default GroupList;
