import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, generatePath } from 'react-router-dom';
import { makeFakeCamera } from '../../utils/mocks';
import { AppRoute } from '../../const';
import CameraCard from './camera-card';

describe('CameraCard component', () => {
  const mockCamera = makeFakeCamera();

  it('should render camera card', () => {
    render(
      <BrowserRouter>
        <CameraCard camera={mockCamera} isActive={false} />
      </BrowserRouter>
    );

    const cameraCardImage: HTMLImageElement = screen.getByRole('img');

    expect(cameraCardImage).toBeInTheDocument();
    expect(cameraCardImage.src).toBe(`${window.location.origin}${mockCamera.previewImg}`);
    expect(screen.getByText(mockCamera.reviewCount)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
  });

  it('should navigate to the product page on click to link', () => {
    render(
      <BrowserRouter>
        <CameraCard camera={mockCamera} isActive={false} />
      </BrowserRouter>
    );

    const cameraCardLink = screen.getByText('Подробнее');
    expect(cameraCardLink).toBeInTheDocument();
    fireEvent.click(cameraCardLink);
    expect(window.location.pathname).toBe(generatePath(AppRoute.Product, {id: String(mockCamera.id), tab: AppRoute.ProductDescriptionTab}));
  });


});
