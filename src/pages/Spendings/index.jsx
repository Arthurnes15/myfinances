import { BsPlus, BsWallet } from 'react-icons/bs';
import { useState } from 'react';

import verifyUser from '../../hooks/verifyUser';
import Sidebar from '../../components/Common/Sidebar';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import ModalRegister from '../../components/Modals/RegisterSpending';
import ModalEdit from '../../components/Modals/EditSpending';
import Table from '../../components/Table';
import './styles.css';

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
    <article className="container-spendings">
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
      <section className="content-spendings">
        <header className="header-spendings">
          <BsWallet size={35} />
          <h1>Gastos</h1>
          <div className="addSpending">
            <Button type="button" onClick={() => setIsOpen(true)}>
              <BsPlus size={30} color="white" />
            </Button>
          </div>
        </header>
        <main className="all-spendings">
          <Table setIsLoading={setIsLoading} openEditModal={openEditModal} />
        </main>
      </section>
    </article>
  );
}

export default Spendings;
