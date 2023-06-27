import { render, screen, fireEvent } from '@testing-library/react';
import SortForm from './sort-form';

describe('SortForm component', () => {
  it('should render correctly', () => {
    render(<SortForm />);

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
    expect(screen.getByText('по цене')).toBeInTheDocument();
    expect(screen.getByText('по популярности')).toBeInTheDocument();
    expect(screen.getByText('по цене')).toBeInTheDocument();
    expect(screen.getByText('по цене')).toBeInTheDocument();

  });

  it('should toggle sort order correctly', () => {
    render(<SortForm />);

    const ascendingRadiobutton: HTMLInputElement = screen.getByLabelText('По возрастанию');
    const descendingRadiobutton: HTMLInputElement = screen.getByLabelText('По убыванию');

    expect(ascendingRadiobutton.checked).toBe(false);
    expect(descendingRadiobutton.checked).toBe(false);

    fireEvent.click(descendingRadiobutton);

    expect(ascendingRadiobutton.checked).toBe(false);
    expect(descendingRadiobutton.checked).toBe(true);
  });


});
