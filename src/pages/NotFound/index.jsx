import { useNavigate } from 'react-router-dom';

import animation404 from '../../assets/images/404.gif';
import './styles.css';

function NotFound() {
  const navigate = useNavigate();

  return (
    <article>
      <div className="error404">
        <img src={animation404} alt="" />
        <h4>Página não encontrada</h4>
        <button type="button" onClick={() => navigate('/spendings')}>
          Voltar para página principal
        </button>
      </div>
    </article>
  );
}

export default NotFound;
