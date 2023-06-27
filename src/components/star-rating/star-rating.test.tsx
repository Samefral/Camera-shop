import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import StarRating from './star-rating';

describe('StarRating component', () => {
  it('renders correct number of stars based on rating prop', () => {
    const rating = 3;
    render(
      <BrowserRouter>
        <StarRating id='test' rating={rating} />
      </BrowserRouter>
    );

    const stars = screen.getAllByTestId('star');

    expect(stars).toHaveLength(5);
    expect(stars.filter((star) => star.getAttribute('xlink:href') === '#icon-full-star')).toHaveLength(rating);

  });
});
