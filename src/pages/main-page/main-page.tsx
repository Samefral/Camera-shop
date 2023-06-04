import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/cameras-data/selectors';

function MainPage(): JSX.Element {
  const cameras = useAppSelector(getCameras);

  // eslint-disable-next-line no-console
  console.log(cameras);

  return (
    <main>
      <h1>Camera shop</h1>
    </main>
  );
}

export default MainPage;
