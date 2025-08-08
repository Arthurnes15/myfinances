import { BsSearch, BsWallet } from 'react-icons/bs';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import * as actions from '../../store/modules/auth/actions';
import { ThemeContext } from '../../contexts/ThemeContext';
import useVerifyUser from '../../hooks/useVerifyUser';
import Sidebar from '../../components/Common/Sidebar';
import BottomBar from '../../components/Common/BottomBar';
import Loading from '../../components/Loading';
import Container from '../../components/Common/Container';
import ModalRegister from '../../components/Modals/ModalsSpendings/RegisterSpending';
import ModalEdit from '../../components/Modals/ModalsSpendings/EditSpending';
import SpendingsTable from '../../components/SpendingsTable';
import PlaceholderHeading from '../../components/Common/PlaceholderHeading';
import Header from '../../components/Common/Header';
import Content from '../../components/Common/Content';
import HeaderMobile from '../../components/Common/HeaderMobile';
import axiosClient from '../../config/axios';
import './styles.css';

function Spendings() {
  useVerifyUser();

  const [spendings, setSpendings] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalEditIsOpen, setEditIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [spendingToBeUpdated, setSpendingDataToBeUpdated] = useState({
    id: '',
    item: '',
    cost: 0,
    date: '',
  });
  const [idSpending, setIdSpending] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [{ theme }] = useContext(ThemeContext);
  const filteredSpendings = searchValue
    ? spendings.filter((spending) => {
        return spending.item.toLowerCase().includes(searchValue.toLowerCase());
      })
    : spendings;

  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        const response = await axiosClient.get('/spendings');
        setSpendings(response.data);

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
  }, [dispatch, setIsLoading]);

  async function handleDelete(e, id, index) {
    e.persist();
    try {
      setIsLoading(true);
      await axiosClient.delete(`/spendings/${id}`);
      const newSpendings = [...spendings];
      newSpendings.splice(index, 1);
      setSpendings(newSpendings);
      setIsLoading(false);
      toast.success('Gasto excluído com sucesso');
    } catch (err) {
      console.log('Erro desconhecido', err);
      setIsLoading(false);
    }
  }

  function openEditModal(spending) {
    const { _id, item, cost, date, necessity } = spending;
    setEditIsOpen(true);
    setSpendingDataToBeUpdated({
      item,
      cost,
      date,
      necessity,
    });
    setIdSpending(_id);
  }

  function handleSearchSpendings(e) {
    const { value } = e.target;
    setSearchValue(value);
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
        spendingDataToBeUpdated={spendingToBeUpdated}
      />

      <Loading isLoading={isLoading} />
      <Sidebar />
      <HeaderMobile />
      <BottomBar />

      <Content>
        <div className="header-spendings">
          <Header
            icon={<BsWallet size={35} color={theme.textColorSecondary} />}
            title="Gastos"
            onClick={() => setIsOpen(true)}
          />

          <div className="search-bar">
            <div className="icon">
              <BsSearch size={20} />
            </div>
            <input
              type="search"
              placeholder="Buscar um gasto"
              value={searchValue}
              onChange={handleSearchSpendings}
            />
          </div>
        </div>
        {spendings.length === 0 ? (
          <PlaceholderHeading text="Você ainda não cadastrou nenhum gasto" />
        ) : (
          filteredSpendings.length > 0 && (
            <SpendingsTable
              spendings={filteredSpendings}
              handleDelete={handleDelete}
              openEditModal={openEditModal}
            />
          )
        )}
      </Content>
    </Container>
  );
}

export default Spendings;
