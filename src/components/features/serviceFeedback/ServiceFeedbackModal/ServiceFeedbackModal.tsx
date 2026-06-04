'use client';

import { useState } from 'react';

import Button from '@/src/components/ui/Button/Button';
import Modal from '@/src/components/ui/Modal/Modal';
import { useToast } from '@/src/hooks/useToast';
import { isApiError } from '@/src/lib/api/error';
import { cn } from '@/src/lib/helpers/cn';

import { usePostServiceFeedbackQuery } from '../queries/usePostServiceFeedbacksQuery';
import StarRating from '../StarRating/StarRating';

interface ServiceFeedbackModalProps {
  onDismiss: () => void;
}

const ServiceFeedbackModal = ({ onDismiss }: ServiceFeedbackModalProps) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const [feedbackError, setFeedbackError] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const { mutate } = usePostServiceFeedbackQuery();
  const { showToast } = useToast();

  const handleSubmit = () => {
    if (feedback === '') {
      setFeedbackError(true);
      return;
    }

    setSubmitError(false);
    mutate(
      { serviceRating: rating, serviceFeedback: feedback },
      {
        onSuccess: () => {
          onDismiss();
          showToast({ message: '답변이 제출되었습니다.' });
        },
        onError: (error) => {
          if (isApiError(error) && error.status === 409) {
            onDismiss();
            showToast({
              message: '이미 피드백을 제출하셨습니다.',
              variant: 'alert',
            });
            return;
          }
          setSubmitError(true);
        },
      },
    );
  };

  return (
    <Modal isOpen onClose={onDismiss}>
      <section className="space-y-6">
        <div className="text-center space-y-3">
          <h3 className="font-heading-h3 text-g-0">
            Timo서비스 이용은 어떠셨나요?
          </h3>
          <p className="font-body-s text-g-80">
            소중한 의견을 반영하여 더 발전된 모습을 보여드릴게요.
          </p>
        </div>
        <StarRating className="mt-6" onChange={setRating} />
        <div className="space-y-1">
          <textarea
            className={cn(
              'font-body-s text-g-60 outline-1 p-4 rounded-4 h-50 w-full',
              feedbackError ? 'outline-r-300' : 'outline-g-40',
            )}
            placeholder="더 나은 서비스를 위해 좋았던 점이나 개선이 필요한 부분을 자유롭게 남겨주세요."
            value={feedback}
            onChange={(e) => {
              setFeedback(e.target.value);
              setFeedbackError(false);
            }}
          />
          {feedbackError && (
            <p className="font-body-s text-r-300">의견을 남겨주세요.</p>
          )}
        </div>
        {submitError && (
          <p className="font-body-s text-r-300 text-center">
            제출에 실패했습니다. 잠시 후 다시 시도해주세요.
          </p>
        )}
        <div className="flex gap-2">
          <Button
            label="나중에 하기"
            variant="secondary"
            className="bg-transparent backdrop-blur-[50px]"
            onClick={onDismiss}
          />
          <Button label="의견 보내기" onClick={handleSubmit} />
        </div>
      </section>
    </Modal>
  );
};

export default ServiceFeedbackModal;
