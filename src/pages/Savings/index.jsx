import { number, object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import {
  BsCoin,
  BsImage,
  BsPiggyBank,
  BsPlus,
  BsTags,
  BsXCircle,
} from 'react-icons/bs';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

import * as actions from '../../store/modules/auth/actions';
import verifyUser from '../../hooks/verifyUser';
import axiosClient from '../../config/axios';
import Loading from '../../components/Loading';
import Sidebar from '../../components/Common/Sidebar/index';
import Saving from '../../components/Saving';
import Navbar from '../../components/Navbar';
import './styles.css';
import './modal.css';

const Savings = () => {
  verifyUser();
  const schema = object({
    name: string().required('Campo obrigatório'),
    price: number()
      .typeError('Deve ser um número')
      .required('Campo obrigatório'),
    investment: number()
      .typeError('Deve ser um número')
      .required('Campo obrigatório'),
    image: string(),
    user: string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [savings, setSavings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState('');
  const user = useSelector((state) => state.auth.user.email);

  function openRegisterModal() {
    setIsOpen(true);
  }

  function closeRegisterModal() {
    setIsOpen(false);
  }

  async function handleChange(e) {
    const file = e.target.files[0];
    const photoURL = URL.createObjectURL(file);
    setPhoto(photoURL);

    const formData = new FormData();
    formData.append('photo', file);

    try {
      setIsLoading(true);
      await axiosClient.post('/photos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Foto enviada com sucesso');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const { status } = get(err, 'response', '');
      toast.error('Erro ao enviar foto');

      if (status === 401) {
        dispatch(actions.loginFailure());
      }
    }
  }

  async function handleSubmitSaving(data) {
    try {
      setIsLoading(true);

      await axiosClient.post('/savings', {
        name: data.name,
        price: data.price,
        investment: data.investment,
        image: photo ? photo : '',
        user: data.user,
      });
      toast.success('Salvo com sucesso');
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
      {/* Register Modal */}
      <Modal
        isOpen={modalIsOpen}
        closeTimeoutMS={500}
        parentSelector={() => document.querySelector('#root')}
        onRequestClose={closeRegisterModal}
        contentLabel="Modal Insert Savings"
        overlayClassName="modal-overlay"
        className="modal_saving-content"
      >
        <header className="header_modal-saving">
          <h1>Adicionar Economias</h1>
          <button
            type="button"
            onClick={closeRegisterModal}
            className="close_modal-saving"
          >
            <BsXCircle size={40} color="red" />
          </button>
        </header>

        <section>
          <form onSubmit={handleSubmit(handleSubmitSaving)}>
            <div className="form-image">
              <div className="text-fieldSaving">
                <div className="selection-image">
                  <label htmlFor="image-file">
                    <BsImage size={15} />
                    Imagem
                  </label>
                  <input id="image-file" type="file" onChange={handleChange} />
                </div>
              </div>
            </div>
            <div className="text-fieldSaving">
              <label htmlFor="price">
                <BsPiggyBank size={16} />
                Economia:
              </label>
              <input type="text" placeholder="Economia" {...register('name')} />
              <span className="text-danger">{errors?.name?.message}</span>
            </div>
            <div className="text-fieldSaving">
              <label htmlFor="price">
                <BsTags size={15} />
                Preço:
              </label>
              <input type="text" placeholder="Preço" {...register('price')} />
              <span className="text-danger">{errors?.price?.message}</span>
            </div>
            <div className="text-fieldSaving">
              <label htmlFor="investment">
                <BsCoin size={15} /> Investimento:
              </label>
              <input
                type="text"
                placeholder="Valor"
                {...register('investment')}
              />
              <span className="text-danger">{errors?.investment?.message}</span>
            </div>
            <input type="hidden" defaultValue={user} {...register('user')} />

            <div className="insertSaving">
              <button type="submit">Cadastrar</button>
            </div>
          </form>
        </section>
      </Modal>

      <Loading isLoading={isLoading} />
      <Navbar />
      <Sidebar />

      <section className="content-savings">
        <header className="header-savings">
          <BsPiggyBank size={35} />
          <h1>Economias</h1>
          <div className="addSaving">
            <button type="button" onClick={openRegisterModal}>
              <BsPlus size={30} color="white" />
            </button>
          </div>
        </header>

        <main className="all-savings">
          {savings.map((saving, index) => (
            <Saving
              key={saving._id}
              image={saving.image}
              name={saving.name}
              price={saving.price}
              investment={saving.investment}
              percentage={saving.percentage}
              onClick={(e) => handleDelete(e, saving._id, index)}
            />
          ))}
        </main>
      </section>
    </article>
  );
};

export default Savings;
