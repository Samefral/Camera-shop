import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFoundPage(): JSX.Element {
  return (
    <section className="not-found-page" style={{textAlign: 'center', marginTop: '100px', marginBottom: '100px'}}>
      <h1>404. Page not found</h1>
      <Link to={AppRoute.Root} style={{textUnderlineOffset: '7px'}}>Вернуться на главную</Link>
    </section>
  );
}

export default NotFoundPage;
