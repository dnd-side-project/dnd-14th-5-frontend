import Image from 'next/image';

const NotificationEmptyState = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-10 text-center">
      <Image
        src="/images/notification-empty.svg"
        alt="empty"
        width={150}
        height={150}
      />
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-heading-h3 font-semibold">
          알림 내역이 비어있어요
        </h3>
        <p className="text-caption-n text-g-80">
          새로운 소식이 도착하면 알려드릴게요
        </p>
      </div>
    </section>
  );
};

export default NotificationEmptyState;
