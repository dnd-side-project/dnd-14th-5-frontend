'use client';

import Card from '@/src/components/ui/Card/Card';
import Icon from '@/src/components/ui/Icon/Icon';

const SummaryCard = () => {
  const handleCardClick = () => {
    // TODO: 카드 클릭 시 오늘의 회고 상세 페이지로 이동하도록 구현 필요
    console.log('오늘의 질문 카드 클릭됨');
  };

  return (
    // TODO: 카드 배경은 감정상태 색상의 50컬러, Stroke는 감정상태 색상의 200컬러: API에서 오늘의 category 받아와야 함.
    <Card className="rounded-2xl bg-g-500 p-5">
      <button
        type="button"
        onClick={handleCardClick}
        aria-label="오늘 질문 상세 보기"
        className="w-full"
      >
        <div className="flex items-start justify-between gap-4">
          <p className="text-left text-body-m text-g-0">
            {/* TODO: API에서 오늘의 질문 받아오기; */}
            오늘 하루 중 가장 재미있었던 순간은 언제였나요?
          </p>
          <Icon name="chevronLeft" size={24} className="pt-1 rotate-180" />
        </div>
      </button>
      <p className="pt-4 line-clamp-2 text-body-s text-g-80">
        {/* TODO: API에서 오늘의 회고 답변 받아오기 */}
        오늘 하루 중 가장 즐거웠던 순간은 점심시간이었습니다. 팀원들과 회사
        뒤편에 새로 생긴 퓨전 한식당을 찾았는데, 아직 입소문이 덜 났는지 손님이
        우리 테이블밖에 없어 마치 가게를 통째로 빌린 기분이었습니다. 조용한
        분위기 덕분에 음식의 맛을 음미하기 좋았고, 무엇보다 한가해진 사장님이
        저희 테이블을 전담 마크해주신 덕에 식사 내내 유쾌한 시간을 보냈습니다.
        부장님이 매운 맛에 땀을 흘리시자마자 기다렸다는 듯 얼음물을 챙겨주시는
        사장님의 센스에 다들 빵 터졌네요. 북적이는 구내식당을 벗어나 우리끼리
        오붓하고 느긋하게 웃을 수 있었던 그 1시간이 오늘 저에게는 최고의
        힐링이었습니다.
      </p>
    </Card>
  );
};

export default SummaryCard;
