import { render, screen } from '@testing-library/react';
import { makeFakeCamera } from '../../../../utils/mocks';
import CharacteristicsTab from './characteristics-tab';

describe('CharacteristicsTab component', () => {
  const camera = makeFakeCamera();

  it('renders tab element with characteristics', () => {
    render(
      <CharacteristicsTab camera={camera} isActive />
    );

    expect(screen.getByText(camera.level)).toBeInTheDocument();
    expect(screen.getByText(camera.category)).toBeInTheDocument();
    expect(screen.getByText(camera.type)).toBeInTheDocument();
  });

  it('renders inactive tab element', () => {
    render(
      <CharacteristicsTab camera={camera} isActive={false} />
    );

    expect(screen.getByTestId('characteristics-tab')).not.toHaveClass('is-active');
  });

  it('renders active tab element', () => {
    render(
      <CharacteristicsTab camera={camera} isActive />
    );

    expect(screen.getByTestId('characteristics-tab')).toHaveClass('is-active');
  });
});
