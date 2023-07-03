import React, { useRef, useEffect } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';
import { AppRoute } from '../../../../const';
import { Camera } from '../../../../types/camera';

type SearchFormItemProps = {
  camera: Camera;
  isActive: boolean;
};

function SearchFormItem({camera, isActive}: SearchFormItemProps): JSX.Element {
  const navigate = useNavigate();

  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isActive) {
      itemRef.current?.focus();
    }
  }, [isActive]);

  const handleKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter') {
      navigate(generatePath(AppRoute.Product, {id: String(camera.id), tab: AppRoute.ProductDescriptionTab}));
    }
  };

  return (
    <li
      className="form-search__select-item"
      tabIndex={0}
      ref={itemRef}
      onClick={() => navigate(generatePath(AppRoute.Product, {id: String(camera.id), tab: AppRoute.ProductDescriptionTab}))}
      onKeyDown={handleKeyDown}
    >
      {camera.name}
    </li>
  );
}

export default SearchFormItem;
