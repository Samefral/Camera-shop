import React from 'react';

type StarRatingProps = {
  rating: number;
  id: string;
}

const MAX_RATING = 5;

function StarRating({rating, id}: StarRatingProps): JSX.Element {
  const availableRatings = [];

  for (let i = 0; i < MAX_RATING; i++) {
    availableRatings.push(i);
  }

  return (
    <React.Fragment>
      {availableRatings.map((rate) => (
        <svg width="17" height="16" aria-hidden="true" key={`${id}-${rate}`}>
          <use data-testid="star" xlinkHref={rate < rating ? '#icon-full-star' : '#icon-star'}></use>
        </svg>
      ))}
    </React.Fragment>
  );
}

export default StarRating;
