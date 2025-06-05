import { useEffect, useState } from 'react';
import { BsPiggyBank } from 'react-icons/bs';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import * as actions from '../../store/modules/auth/actions';
import verifyUser from '../../hooks/verifyUser';
import axiosClient from '../../config/axios';
import Loading from '../../components/Loading';
import Sidebar from '../../components/Common/Sidebar/index';
import Saving from '../../components/Saving';
import Navbar from '../../components/Navbar';
import ModalRegister from '../../components/Modals/ModalsSavings/RegisterSaving';
import Header from '../../components/Common/Header';
import Container from '../../components/Common/Container';
import fund from '../../assets/images/fund.jpg';
import './styles.css';

const Savings = () => {
  verifyUser();

  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [savings, setSavings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function openRegisterModal() {
    setIsOpen(true);
  }

  async function handleDelete(e, id, index) {
    e.persist();
    try {
      setIsLoading(true);
      await axiosClient.delete(`/savings/${id}`);
      const newSavings = [...savings];
      newSavings.splice(index, 1);
      setSavings(newSavings);
      setIsLoading(false);
      toast.success('Gasto excluído com sucesso');
    } catch {
      console.log('Erro');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        const response = await axiosClient.get('savings');
        setSavings(response.data);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        const status = get(error, 'response.status', 0);
        if (status === 401) {
          dispatch(actions.loginFailure());
        }
        console.error(error);
      }
    }
    getData();
  }, [dispatch]);

  return (
    <article>
      <ModalRegister
        open={modalIsOpen}
        close={() => setIsOpen(false)}
        setIsLoading={setIsLoading}
      />

      <Loading isLoading={isLoading} />
      <Navbar />
      <Sidebar />

      <Container>
        <Header
          icon={<BsPiggyBank size={35} />}
          title="Economias"
          onClick={openRegisterModal}
        />

        <main className="all-savings">
          {savings.map((saving, index) => (
            <Saving
              key={saving._id}
              image={saving.image || fund}
              name={saving.name}
              price={saving.price}
              investment={saving.investment}
              percentage={saving.percentage}
              onClick={(e) => handleDelete(e, saving._id, index)}
            />
          ))}
        </main>
      </Container>
    </article>
  );
};

export default Savings;
