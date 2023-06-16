import { Link } from 'react-router-dom';

function UpBtn(): JSX.Element {
  return (
    <Link
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }}
      className="up-btn"
      to="#"
    >
      <svg width="12" height="18" aria-hidden="true">
        <use xlinkHref="#icon-arrow2"></use>
      </svg>
    </Link>
  );
}

export default UpBtn;
