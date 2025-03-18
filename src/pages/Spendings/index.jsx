import verifyUser from '../../utils/verifyUser';
import Sidebar from '../../components/Sidebar';
import './styles.css';
import Loading from '../../components/Loading';

const Spendings = () => {
  verifyUser();

  return (
    <article>
      <Loading />
      <Sidebar />
      <div>
        <h1>Gastos</h1>
      </div>
    </article>
  );
};

export default Spendings;
