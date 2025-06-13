import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { BsCalendar2, BsCashCoin, BsListOl, BsTag } from 'react-icons/bs';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { date, number, object, string } from 'yup';
import { toast } from 'react-toastify';

import ModalComponent from '../../Common/Modal';
import TextField from '../../Common/TextField';
import Label from '../../Common/Label';
import Input from '../../Common/Input';
import ButtonSubmit from '../../Common/ButtonSubmit';
import axiosClient from '../../../config/axios';

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
              <Label htmlFor="item">
                <BsTag size={15} />
                Item:
              </Label>
              <Input
                type="text"
                placeholder="Nome"
                register={register('item')}
              />
            </TextField>
            <TextField errors={errors?.item?.message}>
              <Label htmlFor="price">
                <BsCashCoin size={15} />
                Preço:
              </Label>
              <Input
                type="text"
                placeholder="Valor"
                register={register('total')}
              />
            </TextField>
            <TextField errors={errors?.item?.message}>
              <Label htmlFor="installments">
                <BsListOl size={15} />
                Número de Parcelas:
              </Label>
              <Input
                type="number"
                placeholder="Parcelas"
                register={register('installments')}
              />
            </TextField>
            <TextField errors={errors?.item?.message}>
              <Label htmlFor="date">
                <BsCalendar2 size={15} />
                Data da Compra
              </Label>
              <Input
                type="date"
                placeholder="Data"
                register={register('date')}
              />
            </TextField>

            <ButtonSubmit>Cadastrar</ButtonSubmit>
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
