function TabsList(): JSX.Element {
  return (
    <ul className="product__tabs-list">
      <li className="item-list">
        <span className="item-list__title">Артикул:</span>
        <p className="item-list__text"> DA4IU67AD5</p>
      </li>
      <li className="item-list">
        <span className="item-list__title">Категория:</span>
        <p className="item-list__text">Видеокамера</p>
      </li>
      <li className="item-list">
        <span className="item-list__title">Тип камеры:</span>
        <p className="item-list__text">Коллекционная</p>
      </li>
      <li className="item-list">
        <span className="item-list__title">Уровень:</span>
        <p className="item-list__text">Любительский</p>
      </li>
    </ul>
  );
}

export default TabsList;
