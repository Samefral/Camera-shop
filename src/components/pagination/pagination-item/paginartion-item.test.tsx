import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import PaginationItem from './pagination-item';
import { BrowserRouter, generatePath } from 'react-router-dom';
import { AppRoute } from '../../../const';

describe('PaginationItem component', () => {
  it('should render correct page number', () => {
    const pageNumber = 3;

    render(
      <BrowserRouter>
        <PaginationItem pageNumber={pageNumber} isActive={false} />
      </BrowserRouter>
    );

    expect(screen.getByText(pageNumber.toString())).toBeInTheDocument();
  });

  it('should render active pagination link with correct class name', () => {
    const pageNumber = 1;

    render(
      <BrowserRouter>
        <PaginationItem pageNumber={pageNumber} isActive />
      </BrowserRouter>
    );

    const paginationLink = screen.getByText(pageNumber.toString());
    expect(paginationLink).toHaveClass('pagination__link pagination__link--active');
  });

  it('should render inactive pagination link with correct class name', () => {
    const pageNumber = 5;

    render(
      <BrowserRouter>
        <PaginationItem pageNumber={pageNumber} isActive={false} />
      </BrowserRouter>
    );

    const paginationLink = screen.getByText(pageNumber.toString());
    expect(paginationLink).toHaveClass('pagination__link');
  });

  it('should redirect to correct catalog page on link click', () => {
    const pageNumber = 2;

    render(
      <BrowserRouter>
        <PaginationItem pageNumber={pageNumber} isActive={false} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(pageNumber.toString()));
    expect(window.location.pathname).toBe(generatePath(AppRoute.Catalog, {page: String(pageNumber)}));
  });

});
