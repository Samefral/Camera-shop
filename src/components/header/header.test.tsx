import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../const';
import Header from './header';


describe('Header component', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveAttribute('class', 'header');

    const homeLink = screen.getByText('Каталог');

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', AppRoute.Root);

    const basketLink = screen.getByTestId('basket-link');

    expect(basketLink).toBeInTheDocument();
    expect(basketLink).toHaveAttribute('href', AppRoute.Cart);
  });
});
