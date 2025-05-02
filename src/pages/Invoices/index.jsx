import { useNavigate } from 'react-router-dom';

import animation from '../../assets/images/loading.gif';
import verifyUser from '../../hooks/verifyUser';
import Sidebar from '../../components/Sidebar';
import './styles.css';

const Invoices = () => {
  verifyUser();
  const navigate = useNavigate();

  return (
    <article>
      <Sidebar />
      <div className="invoices">
        <img src={animation} alt="animation" />
        <h1>Página em construção</h1>
        <div>
          <button onClick={() => navigate('/spendings')}>
            Voltar para principal
          </button>
        </div>
      </div>
    </article>
  );
};

export default Invoices;
