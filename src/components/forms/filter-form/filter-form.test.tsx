import { render, screen } from '@testing-library/react';
import FilterForm from './filter-form';

describe('FilterForm component', () => {

  it('should render correctly', () => {
    render(<FilterForm />);

    expect(screen.getByText('Фильтр')).toBeInTheDocument();
    expect(screen.getByText('Цена, ₽')).toBeInTheDocument();

    expect(screen.getByText('Категория')).toBeInTheDocument();
    expect(screen.getByText('Фотокамера')).toBeInTheDocument();
    expect(screen.getByText('Видеокамера')).toBeInTheDocument();

    expect(screen.getByText('Тип камеры')).toBeInTheDocument();

    expect(screen.getByText('Уровень')).toBeInTheDocument();


  });

  it('renders the reset button', () => {
    render(<FilterForm />);
    const resetButton = screen.getByRole('button', { name: /сбросить фильтры/i });
    expect(resetButton).toBeInTheDocument();
  });


});
