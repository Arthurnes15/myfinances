import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { date, number, object, string } from 'yup';

import ModalComponent from '../../Common/Modal';
import TextField from '../../TextField';
import { BsCalendar2, BsCashCoin, BsListOl, BsTag } from 'react-icons/bs';
import Input from '../../Common/Input';
import axiosClient from '../../../config/axios';
import { toast } from 'react-toastify';

function ModalRegister({ open, close, setIsLoading }) {
  const user = useSelector((state) => state.auth.user.email);

  const schema = object({
    item: string().required('Campo obrigatório'),
    total: number()
      .typeError('Deve ser um número')
      .required('Campo obrigatório'),
    installments: string().required('Campo obrigatório'),
    date: date().typeError('Não é uma data'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleSubmitInvoice(data) {
    setIsLoading(true);
    try {
      await axiosClient.post('invoices', {
        item: data.item,
        total: data.total,
        installmentsNumber: data.installments,
        date: new Date(data.date).toISOString(),
        user,
      });
      setIsLoading(false);
      close();
      document.location.reload();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error('Erro ao cadastrar item');
    }
  }

  if (open) {
    return (
      <ModalComponent
        title="Cadastrar Item"
        open={open}
        close={close}
        className="modal-content"
        content="Modal Insert Invoices Items"
      >
        <section>
          <form onSubmit={handleSubmit(handleSubmitInvoice)}>
            <TextField errors={errors?.item?.message}>
              <label htmlFor="item">
                <BsTag size={15} />
                Item:
              </label>
              <Input
                type="text"
                placeholder="Nome"
                register={register('item')}
              />
            </TextField>
            <TextField errors={errors?.item?.message}>
              <label htmlFor="item">
                <BsCashCoin size={15} />
                Preço:
              </label>
              <Input
                type="text"
                placeholder="Valor"
                register={register('total')}
              />
            </TextField>
            <TextField errors={errors?.item?.message}>
              <label htmlFor="item">
                <BsListOl size={15} />
                Número de Parcelas:
              </label>
              <Input
                type="number"
                placeholder="Parcelas"
                register={register('installments')}
              />
            </TextField>
            <TextField errors={errors?.item?.message}>
              <label htmlFor="item">
                <BsCalendar2 size={15} />
                Data da Compra
              </label>
              <Input
                type="date"
                placeholder="Data"
                register={register('date')}
              />
            </TextField>
            <div className="action">
              <button type="submit">Cadastrar</button>
            </div>
          </form>
        </section>
      </ModalComponent>
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
