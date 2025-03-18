import verifyUser from '../../utils/verifyUser';
import Sidebar from '../../components/Sidebar';
import './styles.css';

const Invoices = () => {
  verifyUser();

  return (
    <article>
      <Sidebar />
      <div>
        <h1>Fatura</h1>
      </div>
    </article>
  );
};

export default Invoices;
