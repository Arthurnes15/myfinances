import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { BsCoin, BsPiggyBank, BsTags } from 'react-icons/bs';
import { object, number, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import Input from '../../Common/Input';
import Modal from '../../Common/Modal';
import Label from '../../Common/Label';
import TextField from '../../Common/TextField';
import ButtonSubmit from '../../Common/ButtonSubmit';
import axiosClient from '../../../config/axios';

function ModalEdit({ open, close, setIsLoading, savingData, idSaving }) {
  const schema = object({
    name: string().required('Campo obrigatório'),
    price: number()
      .typeError('Deve ser um número')
      .required('Campo obrigatório'),
    investment: number()
      .typeError('Deve ser um número')
      .required('Campo obrigatório'),
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const { name, price, investment } = savingData;
    setValue('name', name);
    setValue('price', price);
    setValue('investment', investment);
  }, [setValue, savingData]);

  async function handleEditSaving(data) {
    setIsLoading(true);
    try {
      await axiosClient.put(`savings/${idSaving}`, {
        name: data.name,
        price: data.price,
        investment: data.investment,
      });
      setIsLoading(false);
      document.location.reload();
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      toast.error('Erro ao editar economia');
    }
  }

  if (open) {
    return (
      <Modal
        title="Editar Economia"
        open={open}
        close={close}
        className="modal-content"
        content="Modal Edit Savings"
      >
        <section>
          <form onSubmit={handleSubmit(handleEditSaving)}>
            <TextField errors={errors?.name?.message}>
              <Label htmlFor="saving">
                <BsPiggyBank size={16} />
                Nova Economia:
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
                Novo Preço:
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
                Novo Valor do Investimento:
              </Label>
              <Input
                type="text"
                placeholder="Valor"
                register={register('investment')}
              />
            </TextField>

            <ButtonSubmit>Editar</ButtonSubmit>
          </form>
        </section>
      </Modal>
    );
  } else {
    return <></>;
  }
}

export default ModalEdit;

ModalEdit.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  setIsLoading: PropTypes.func,
  savingData: PropTypes.object,
  idSaving: PropTypes.string,
};
