import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, generatePath } from 'react-router-dom';
import { makeFakeCamera } from '../../../../utils/mocks';
import { AppRoute } from '../../../../const';
import SearchFormItem from './search-form-item';

describe('SearchFormItem component', () => {
  const mockCamera = makeFakeCamera();

  test('should navigate to product page when item is clicked', () => {
    render(
      <BrowserRouter>
        <SearchFormItem camera={mockCamera} isActive />
      </BrowserRouter>
    );

    const item = screen.getByText(mockCamera.name);
    fireEvent.click(item);

    expect(window.location.pathname).toBe(generatePath(AppRoute.Product, { id: String(mockCamera.id), tab: AppRoute.ProductDescriptionTab }));
  });

  test('should navigate to product page when Enter key is pressed', () => {
    render(
      <BrowserRouter>
        <SearchFormItem camera={mockCamera} isActive />
      </BrowserRouter>
    );

    const item = screen.getByText(mockCamera.name);
    fireEvent.keyDown(item, { key: 'Enter' });

    expect(window.location.pathname).toBe(generatePath(AppRoute.Product, { id: String(mockCamera.id), tab: AppRoute.ProductDescriptionTab }));
  });

  test('should focus the item when isActive prop is true', () => {
    render(
      <BrowserRouter>
        <SearchFormItem camera={mockCamera} isActive />
      </BrowserRouter>
    );

    const item = screen.getByText(mockCamera.name);
    expect(item).toHaveFocus();
  });

  test('should not focus the item when isActive prop is false', () => {
    render(
      <BrowserRouter>
        <SearchFormItem camera={mockCamera} isActive={false} />
      </BrowserRouter>
    );

    const item = screen.getByText(mockCamera.name);
    expect(item).not.toHaveFocus();
  });
});
