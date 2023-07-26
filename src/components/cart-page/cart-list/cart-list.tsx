import { useAppSelector } from '../../../hooks';
import { getCartCameras } from '../../../store/cart-data/selectors';
import CartItem from './cart-item/cart-item';

function CartList(): JSX.Element {
  const cartCameras = useAppSelector(getCartCameras);

  return (
    <ul className="basket__list">
      {cartCameras.map((camera) => (
        <CartItem key={camera.id} camera={camera} />
      ))}
    </ul>
  );
}

export default CartList;
