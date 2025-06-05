import { BsWallet } from 'react-icons/bs';
import { useState } from 'react';

import verifyUser from '../../hooks/verifyUser';
import Sidebar from '../../components/Common/Sidebar';
import Navbar from '../../components/Navbar';
import Loading from '../../components/Loading';
import ModalRegister from '../../components/Modals/ModalsSpendings/RegisterSpending';
import ModalEdit from '../../components/Modals/ModalsSpendings/EditSpending';
import SpendingsTable from '../../components/SpendingsTable';
import Header from '../../components/Common/Header';
import Container from '../../components/Common/Container';

function Spendings() {
  verifyUser();

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
  const [necessity, setNecessity] = useState('');

  function openEditModal(spending) {
    const { _id, item, cost, date, necessity } = spending;
    setEditIsOpen(true);
    setSpendingData({
      item,
      cost,
      date,
    });
    setIdSpending(_id);
    setNecessity(necessity);
  }

  return (
    <article>
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
        necessity={necessity}
      />

      <Loading isLoading={isLoading} />
      <Sidebar />
      <Navbar />

      <Container>
        <Header
          icon={<BsWallet size={35} />}
          title="Gastos"
          onClick={() => setIsOpen(true)}
        />

        <SpendingsTable
          setIsLoading={setIsLoading}
          openEditModal={openEditModal}
        />
      </Container>
    </article>
  );
}

export default Spendings;
