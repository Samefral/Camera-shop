import React, { useRef, useState } from 'react';
import { useAppSelector } from '../../../hooks';
import { getCameras } from '../../../store/cameras-data/selectors';
import { Cameras } from '../../../types/camera';
import SearchFormItem from './search-form-item/search-form-item';

type SearchFormProps = {
  isCamerasLoading: boolean;
};

function SearchForm({isCamerasLoading}: SearchFormProps): JSX.Element {
  const cameras = useAppSelector(getCameras);

  const formContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchInputElement = searchInputRef.current as HTMLInputElement;
  const resetBtnRef = useRef<HTMLButtonElement>(null);

  const [isSearchDropdownVisible, setSearchDropdownVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([] as Cameras);
  const [activeItemIndex, setActiveItemIndex] = useState<number>(-1);

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = evt.target.value;

    const filteredResults = inputValue.trim() === '' ? [] : cameras.filter((camera) =>
      camera.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    setSearchResults(filteredResults);
    setSearchDropdownVisible(filteredResults.length > 0);
  };

  const handleInputFocus = () => {
    setActiveItemIndex(-1);
    setSearchDropdownVisible(searchResults.length !== 0);
  };

  const handleFormContainerBlur = (evt: React.FocusEvent<HTMLDivElement>) => {
    const focusElement = evt.relatedTarget;

    if (!formContainerRef.current?.contains(focusElement)) {
      setSearchDropdownVisible(false);
    }
  };

  const handleInputKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'ArrowDown') {
      evt.preventDefault();
      setActiveItemIndex(0);
    }
  };

  const handleListKeyDown = (evt: React.KeyboardEvent<HTMLUListElement>) => {
    evt.preventDefault();

    switch (evt.key) {
      case 'ArrowUp':
        if (activeItemIndex > 0) {
          setActiveItemIndex(activeItemIndex - 1);
        } else {
          searchInputElement.focus();
        }
        break;
      case 'ArrowDown':
        setActiveItemIndex((prevIndex) => prevIndex < searchResults.length - 1 ? prevIndex + 1 : 0);
        break;
      case 'Tab':
        if (activeItemIndex < searchResults.length - 1) {
          setActiveItemIndex(activeItemIndex + 1);
        } else {
          resetBtnRef.current?.focus();
        }
        break;
    }

  };

  const handleSearchReset = () => {
    searchInputElement.value = '';
    setSearchDropdownVisible(false);
    setSearchResults([]);
  };

  return (
    <div
      className={isSearchDropdownVisible ? 'form-search list-opened' : 'form-search'}
      ref={formContainerRef}
      onBlur={handleFormContainerBlur}
    >
      <form onSubmit={(evt) => evt.preventDefault()}>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder={isCamerasLoading ? 'Камеры загружаются...' : 'Поиск по сайту'}
            ref={searchInputRef}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleInputKeyDown}
            disabled={isCamerasLoading}
          />
        </label>
        <ul
          className='form-search__select-list scroller'
          onKeyDown={handleListKeyDown}
        >
          {searchResults.map((camera, index) => (
            <SearchFormItem key={camera.id} camera={camera} isActive={activeItemIndex === index} />
          ))}
        </ul>
      </form>
      <button
        className="form-search__reset"
        type="reset"
        ref={resetBtnRef}
        onClick={handleSearchReset}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default SearchForm;
