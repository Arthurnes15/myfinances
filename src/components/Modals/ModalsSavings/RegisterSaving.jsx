import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { number, object, string } from 'yup';
import { BsCoin, BsPiggyBank, BsTags } from 'react-icons/bs';

import TextField from '../../Common/TextField';
import Label from '../../Common/Label';
import Input from '../../Common/Input';
import ModalComponent from '../../Common/Modal';
import ButtonSubmit from '../../Common/ButtonSubmit';
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
      <ModalComponent
        title="Cadastrar Economia"
        open={open}
        close={close}
        className="modal-content"
        content="Modal Insert Savings"
      >
        <section>
          <form onSubmit={handleSubmit(handleSubmitSaving)}>
            <TextField errors={errors?.name?.message}>
              <Label htmlFor="saving">
                <BsPiggyBank size={16} />
                Economia:
              </Label>
              <Input
                type="text"
                placeholder="Economia"
                register={register('name')}
              />
            </TextField>

            <TextField errors={errors?.price?.message}>
              <Label htmlFor="price">
                <BsTags size={15} />
                Preço:
              </Label>
              <Input
                type="text"
                placeholder="Preço"
                register={register('price')}
              />
            </TextField>

            <TextField errors={errors?.investment?.message}>
              <Label htmlFor="investment">
                <BsCoin size={15} />
                Investimento:
              </Label>
              <Input
                type="text"
                placeholder="Valor"
                register={register('investment')}
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
