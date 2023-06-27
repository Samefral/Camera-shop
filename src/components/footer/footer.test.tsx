import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../const';
import Footer from './footer';

describe('Footer component', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const homeLink = screen.getByText('Каталог');

    expect(screen.getByText('Интернет-магазин фото- и видеотехники')).toBeInTheDocument();
    expect(screen.getByText('Навигация')).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', AppRoute.Root);

  });


});
