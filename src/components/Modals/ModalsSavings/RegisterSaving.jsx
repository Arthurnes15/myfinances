import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { number, object, string } from 'yup';
import { BsCoin, BsPiggyBank, BsTags } from 'react-icons/bs';

import Input from '../../Common/Input';
import TextField from '../../TextField';
import Modal from '../../Common/Modal';
import axiosClient from '../../../config/axios';

function ModalRegister({ open, close, setIsLoading }) {
  const user = useSelector((state) => state.auth.user.email);
  const schema = object({
    name: string().required('Campo obrigatório'),
    price: number()
      .typeError('Deve ser um número')
      .required('Campo obrigatório'),
    investment: number()
      .typeError('Deve ser um número')
      .required('Campo obrigatório'),
    image: string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleSubmitSaving(data) {
    try {
      setIsLoading(true);

      await axiosClient.post('savings', {
        name: data.name,
        price: data.price,
        investment: data.investment,
        image: '',
        user,
      });
      setIsLoading(false);
      close();
      document.location.reload();
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }

  if (open) {
    return (
      <Modal
        title="Cadastrar Economia"
        open={open}
        close={close}
        className="modal-content"
        content="Modal Insert Savings"
      >
        <section>
          <form onSubmit={handleSubmit(handleSubmitSaving)}>
            <TextField errors={errors?.name?.message}>
              <label htmlFor="price">
                <BsPiggyBank size={16} />
                Economia:
              </label>
              <Input
                type="text"
                placeholder="Economia"
                register={register('name')}
              />
            </TextField>

            <TextField errors={errors?.price?.message}>
              <label htmlFor="price">
                <BsTags size={15} />
                Preço:
              </label>
              <Input
                type="text"
                placeholder="Preço"
                register={register('price')}
              />
            </TextField>

            <TextField errors={errors?.investment?.message}>
              <label htmlFor="investment">
                <BsCoin size={15} />
                Investimento:
              </label>
              <Input
                type="text"
                placeholder="Valor"
                register={register('investment')}
              />
            </TextField>

            <div className="action">
              <button type="submit">Cadastrar</button>
            </div>
          </form>
        </section>
      </Modal>
    );
  } else {
    return <></>;
  }
}

export default ModalRegister;

ModalRegister.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  setIsLoading: PropTypes.func,
};
