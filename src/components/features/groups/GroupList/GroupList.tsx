import Image from 'next/image';

interface GroupItem {
  id: string;
  name: string;
  type: 'friend' | 'character'; //TODO: 임시 타입 정의, 백엔드 정의에 맞춰 수정해야 함
  image: string;
}

interface GroupListProps {
  groups: GroupItem[];
}

const GroupList = ({ groups }: GroupListProps) => {
  return (
    <div>
      {groups.map((item) => (
        <div key={item.id}>
          <Image
            src={item.image || '/images/default-group.svg'}
            alt={item.name}
            width={100}
            height={100}
          />
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default GroupList;
