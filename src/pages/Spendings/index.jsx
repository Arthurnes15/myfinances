import {
  BsBookmarkStar,
  BsCalendarWeek,
  BsCashCoin,
  BsPencilSquare,
  BsPlus,
  BsTag,
  BsTrashFill,
  BsWallet,
  BsXCircle,
} from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { date, number, object, string } from 'yup';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import Modal from 'react-modal';

import { dateFormatter } from '../../utils/dataFormatter';
import * as actions from '../../store/modules/auth/actions';
import verifyUser from '../../utils/verifyUser';
import Sidebar from '../../components/Sidebar';
import Loading from '../../components/Loading';
import axiosClient from '../../config/axios';
import './styles.css';
import './modal.css';

Modal.setAppElement('#root');

function Spendings() {
  verifyUser();
  const schema = object({
    item: string().required('Campo obrigatório'),
    cost: number()
      .typeError('Deve ser um número')
      .required('Campo obrigatório'),
    date: date()
      .default(() => new Date())
      .typeError('Data inválida'),
    necessity: string().required('Campo obrigatório'),
    user: string().required(),
  });
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [spendings, setSpendings] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalEditIsOpen, setEditIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const necessities = [
    { value: 'Baixa', label: 'Baixa' },
    { value: 'Média', label: 'Média' },
    { value: 'Extrema', label: 'Extrema' },
  ];
  const user = useSelector((state) => state.auth.user.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let spendingData = useRef();

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
  }, [navigate, dispatch]);

  function openRegisterModal() {
    setIsOpen(true);
  }

  function closeRegisterModal() {
    setIsOpen(false);
  }

  function openEditModal(spending) {
    spendingData.current = { ...spending };
    setEditIsOpen(true);
  }

  function closeEditModal() {
    setEditIsOpen(false);
  }

  async function handleSubmitSpending(data) {
    setIsLoading(true);
    try {
      await axiosClient.post('/spendings', {
        item: data.item,
        necessity: data.necessity,
        date: data.date,
        cost: data.cost,
        user: data.user,
      });
      toast.success('Gasto salvo com sucesso');
      setIsLoading(false);
      setIsOpen(false);
      document.location.reload();
    } catch (err) {
      console.err(err);
      setIsLoading(false);
    }
  }

  async function handleEditSpending(data) {
    setIsLoading(true);
    try {
      await axiosClient.put(`/spendings/${spendingData.current._id}`, {
        item: data.item,
        necessity: data.necessity,
        date: data.date,
        cost: data.cost,
        user: data.user,
      });
      toast.success('Gasto editado com sucesso');
      setIsLoading(false);
      setIsOpen(false);
      document.location.reload();
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }

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
    } catch {
      console.log('Erro');
      setIsLoading(false);
    }
  }

  return (
    <article className="container-spendings">
      {/* Register Modal */}
      <Modal
        isOpen={modalIsOpen}
        parentSelector={() => document.querySelector('#root')}
        onRequestClose={closeRegisterModal}
        contentLabel="Modal Insert Spendings"
        overlayClassName="modal-overlay"
        className="modal_spending-content"
      >
        <header className="header_modal-spending">
          <h1>Adicionar Gasto</h1>
          <button
            type="button"
            onClick={closeRegisterModal}
            className="close_modal-spending"
          >
            <BsXCircle size={40} color="red" />
          </button>
        </header>

        <section>
          <form onSubmit={handleSubmit(handleSubmitSpending)}>
            <div className="text-fieldSpending">
              <label htmlFor="item">
                <BsTag size={15} />
                Item:
              </label>
              <input type="text" placeholder="Item" {...register('item')} />
              <span className="text-danger">{errors?.item?.message}</span>
            </div>
            <div className="text-fieldSpending">
              <label htmlFor="cost">
                <BsCashCoin size={15} /> Valor:
              </label>
              <input type="text" placeholder="Valor" {...register('cost')} />
              <span className="text-danger">{errors?.cost?.message}</span>
            </div>
            {/* <div className="text-fieldSpending">
              <label htmlFor="date">
                <BsCalendarWeek size={15} />
                Data:
              </label>
              <input type="date" placeholder="Data" {...register('date')} />
              <span className="text-danger">{errors?.date?.message}</span>
            </div> */}
            <div className="text-fieldSpending">
              <label htmlFor="necessity">
                <BsBookmarkStar />
                Grau de Necessidade:
              </label>
              <Controller
                control={control}
                name="necessity"
                render={({ field: { onChange } }) => (
                  <Select
                    options={necessities}
                    onChange={(e) => {
                      onChange(e.value);
                    }}
                    placeholder={'Selecione a necessidade'}
                  />
                )}
              />
              <span className="text-danger">{errors?.necessity?.message}</span>
            </div>
            <input type="hidden" defaultValue={user} {...register('user')} />

            <div className="insertSpending">
              <button type="submit">Cadastrar</button>
            </div>
          </form>
        </section>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={modalEditIsOpen}
        onRequestClose={closeEditModal}
        contentLabel="Modal Edit Spendings"
        overlayClassName="modal-overlay"
        className="modal_spending-content"
      >
        <header className="header_modal-spending">
          <h1>Editar Gasto</h1>
          <button
            type="button"
            onClick={closeEditModal}
            className="close_modal-spending"
          >
            <BsXCircle size={40} color="red" />
          </button>
        </header>

        <section>
          <form onSubmit={handleSubmit(handleEditSpending)}>
            <div className="text-fieldSpending">
              <label htmlFor="item">
                <BsTag size={15} />
                Novo Item:
              </label>
              <input
                type="text"
                placeholder="Item"
                defaultValue={spendingData.current?.item}
                {...register('item')}
              />
              <span className="text-danger">{errors?.item?.message}</span>
            </div>
            <div className="text-fieldSpending">
              <label htmlFor="cost">
                <BsCashCoin size={15} /> Novo Valor:
              </label>
              <input
                type="text"
                placeholder="Valor"
                defaultValue={spendingData.current?.cost}
                {...register('cost')}
              />
              <span className="text-danger">{errors?.cost?.message}</span>
            </div>
            <div className="text-fieldSpending">
              <label htmlFor="date">
                <BsCalendarWeek size={15} />
                Nova Data:
              </label>
              <input
                type="date"
                placeholder="Data"
                defaultValue={dateFormatter(spendingData.current?.date)}
                {...register('date')}
              />
              <span className="text-danger">{errors?.date?.message}</span>
            </div>
            <div className="text-fieldSpending">
              <label htmlFor="necessity">
                <BsBookmarkStar />
                Novo Grau de Necessidade:
              </label>
              <input
                type="text"
                placeholder="Necessidade"
                defaultValue={spendingData.current?.necessity}
                {...register('necessity')}
              />
              <span className="text-danger">{errors?.necessity?.message}</span>
            </div>
            <input type="hidden" defaultValue={user} {...register('user')} />

            <div className="insertSpending">
              <button type="submit">Editar</button>
            </div>
          </form>
        </section>
      </Modal>

      <Loading isLoading={isLoading} />
      <Sidebar />
      <section className="content-spendings">
        <header className="header-spendings">
          <BsWallet size={35} />
          <h1>Gastos</h1>
          <div className="addSpending">
            <button type="button" onClick={openRegisterModal}>
              <BsPlus size={30} color="white" />
            </button>
          </div>
        </header>
        <main className="all-spendings">
          <table className="spendings">
            <thead>
              <tr>
                <th>
                  <span>
                    <BsTag size={24} />
                    Item
                  </span>
                </th>
                <th>
                  <span>
                    <BsCashCoin size={24} />
                    Valor
                  </span>
                </th>
                <th>
                  <span>
                    <BsCalendarWeek size={24} />
                    Data
                  </span>
                </th>
                <th>
                  <span>
                    <BsBookmarkStar size={24} />
                    Necessidade
                  </span>
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {spendings.map((spending, index) => (
                <tr key={spending._id}>
                  <td>{spending.item}</td>
                  <td>
                    {spending.cost.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </td>
                  <td>{dateFormatter(spending.date)}</td>
                  <td>
                    <span className="necessity" color={spending.necessity}>
                      {spending.necessity}
                    </span>
                  </td>
                  <td>
                    <button type="button" className="edit-spending">
                      <BsPencilSquare
                        size={20}
                        color="white"
                        onClick={() => openEditModal(spending)}
                      />
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="delete-spending"
                      onClick={(e) => handleDelete(e, spending._id, index)}
                    >
                      <BsTrashFill size={20} color="white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </section>
    </article>
  );
}

export default Spendings;
