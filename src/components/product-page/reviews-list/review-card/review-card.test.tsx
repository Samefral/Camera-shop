import { render, screen } from '@testing-library/react';
import { formatDate } from '../../../../utils/utils';
import { makeFakeReview } from '../../../../utils/mocks';
import ReviewCard from './review-card';


describe('ReviewCard component', () => {
  const review = makeFakeReview();

  it('should render review data correctly', () => {
    render(<ReviewCard review={review} />);
    expect(screen.getByText(review.userName)).toBeInTheDocument();
    expect(screen.getByText(formatDate(review.createAt))).toBeInTheDocument();
    expect(screen.getByText(`Оценка: ${ review.rating.toString()}`)).toBeInTheDocument();
    expect(screen.getByText(review.advantage)).toBeInTheDocument();
    expect(screen.getByText(review.disadvantage)).toBeInTheDocument();
    expect(screen.getByText(review.review)).toBeInTheDocument();
  });

});
