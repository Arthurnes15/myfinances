import { BsWallet } from 'react-icons/bs';
import { useContext, useState } from 'react';

import { ThemeContext } from '../../contexts/ThemeContext';
import useVerifyUser from '../../hooks/useVerifyUser';
import Sidebar from '../../components/Common/Sidebar';
import BottomBar from '../../components/Common/BottomBar';
import Loading from '../../components/Loading';
import Container from '../../components/Common/Container';
import ModalRegister from '../../components/Modals/ModalsSpendings/RegisterSpending';
import ModalEdit from '../../components/Modals/ModalsSpendings/EditSpending';
import SpendingsTable from '../../components/SpendingsTable';
import Header from '../../components/Common/Header';
import Content from '../../components/Common/Content';
import HeaderMobile from '../../components/Common/HeaderMobile';

function Spendings() {
  useVerifyUser();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalEditIsOpen, setEditIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [spendingData, setSpendingData] = useState({
    id: '',
    item: '',
    cost: 0,
    date: '',
  });
  const [idSpending, setIdSpending] = useState('');
  const [{ theme }] = useContext(ThemeContext);

  function openEditModal(spending) {
    const { _id, item, cost, date, necessity } = spending;
    setEditIsOpen(true);
    setSpendingData({
      item,
      cost,
      date,
      necessity,
    });
    setIdSpending(_id);
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
        idSpending={idSpending}
        spendingData={spendingData}
      />

      <Loading isLoading={isLoading} />
      <Sidebar />
      <HeaderMobile />
      <BottomBar />

      <Content>
        <Header
          icon={<BsWallet size={35} color={theme.textColorSecondary} />}
          title="Gastos"
          onClick={() => setIsOpen(true)}
        />

        <SpendingsTable
          setIsLoading={setIsLoading}
          openEditModal={openEditModal}
        />
      </Content>
    </Container>
  );
}

export default Spendings;
