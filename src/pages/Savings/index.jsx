import { useContext, useEffect, useState } from 'react';
import { BsPiggyBank } from 'react-icons/bs';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { ThemeContext } from '../../contexts/ThemeContext';
import * as actions from '../../store/modules/auth/actions';
import useVerifyUser from '../../hooks/useVerifyUser';
import axiosClient from '../../config/axios';
import Loading from '../../components/Loading';
import Sidebar from '../../components/Common/Sidebar/index';
import Container from '../../components/Common/Container';
import Saving from '../../components/Saving';
import BottomBar from '../../components/Common/BottomBar';
import ModalRegister from '../../components/Modals/ModalsSavings/RegisterSaving';
import ModalEdit from '../../components/Modals/ModalsSavings/EditSaving';
import Header from '../../components/Common/Header';
import HeaderMobile from '../../components/Common/HeaderMobile';
import Content from '../../components/Common/Content';
import fund from '../../assets/images/fund.jpg';
import './styles.css';

const Savings = () => {
  useVerifyUser();

  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalEditIsOpen, setEditIsOpen] = useState(false);
  const [savings, setSavings] = useState([]);
  const [savingData, setSavingData] = useState({
    name: '',
    price: 0,
    investment: 0,
  });
  const [idSaving, setIdSaving] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [{ theme }] = useContext(ThemeContext);

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

  function openEditModal(saving) {
    const { _id, name, price, investment } = saving;
    setEditIsOpen(true);
    setSavingData({
      name,
      price,
      investment,
    });
    setIdSaving(_id);
  }

  return (
    <Container>
      <ModalRegister
        open={modalIsOpen}
        close={() => setIsOpen(false)}
        setIsLoading={setIsLoading}
      />

      <ModalEdit
        open={modalEditIsOpen}
        close={() => setEditIsOpen(false)}
        setIsLoading={setIsLoading}
        savingData={savingData}
        idSaving={idSaving}
      />

      <Loading isLoading={isLoading} />
      <HeaderMobile />
      <BottomBar />
      <Sidebar />

      <Content>
        <Header
          icon={<BsPiggyBank size={35} color={theme.textColorSecondary} />}
          title="Economias"
          onClick={openRegisterModal}
        />

        <main className="all-savings">
          {savings.map((saving, index) => (
            <Saving
              key={index}
              image={saving.image || fund}
              name={saving.name}
              price={saving.price}
              investment={saving.investment}
              percentage={saving.percentage}
              onEdit={() => openEditModal(saving)}
              onDelete={(e) => handleDelete(e, saving._id, index)}
            />
          ))}
        </main>
      </Content>
    </Container>
  );
};

export default Savings;
