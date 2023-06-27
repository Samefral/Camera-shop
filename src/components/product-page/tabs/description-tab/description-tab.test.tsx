import { render, screen } from '@testing-library/react';
import { makeFakeCamera } from '../../../../utils/mocks';
import DescriptionTab from './description-tab';

describe('DescriptionTab component', () => {
  const camera = makeFakeCamera();

  it('renders tab element with description', () => {
    render(
      <DescriptionTab camera={camera} isActive />
    );

    expect(screen.getByText(camera.description)).toBeInTheDocument();
  });

  it('renders inactive tab element', () => {
    render(
      <DescriptionTab camera={camera} isActive={false} />
    );

    expect(screen.getByTestId('description-tab')).not.toHaveClass('is-active');
  });

  it('renders active tab element', () => {
    render(
      <DescriptionTab camera={camera} isActive />
    );

    expect(screen.getByTestId('description-tab')).toHaveClass('is-active');
  });
});
