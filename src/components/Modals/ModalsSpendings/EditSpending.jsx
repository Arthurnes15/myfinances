import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { date as dateYup, number, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  BsBookmarkStar,
  BsCalendarWeek,
  BsCashCoin,
  BsTag,
} from 'react-icons/bs';
import { useSelector } from 'react-redux';
import Select from 'react-select';

import { necessities } from '../../../utils/necessities';
import ModalComponent from '../../Common/Modal';
import TextField from '../../Common/TextField';
import Label from '../../Common/Label';
import Input from '../../Common/Input';
import ButtonSubmit from '../../Common/ButtonSubmit';
import axiosClient from '../../../config/axios';

function ModalEdit({ open, close, setIsLoading, idSpending, spendingData }) {
  const { item, cost, date, necessity } = spendingData;
  const indexNecessity = necessities.findIndex(
    (value) => value.value === necessity
  );
  const user = useSelector((state) => state.auth.user.email);
  const dateSpending = date.split('T')[0];

  const schema = object({
    item: string().required('Campo obrigatório'),
    cost: number()
      .typeError('Deve ser um número')
      .required('Campo obrigatório'),
    date: dateYup().typeError('Data inválida'),
    necessity: string().required('Campo obrigatório'),
  });

  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue('item', item);
    setValue('cost', cost);
    setValue('date', dateSpending);
    setValue('necessity', necessity);
  }, [setValue, cost, dateSpending, item, necessity]);

  async function handleEditSpending(data) {
    setIsLoading(true);
    try {
      await axiosClient.put(`/spendings/${idSpending}`, {
        item: data.item,
        necessity: data.necessity,
        date: data.date,
        cost: data.cost,
        user,
      });
      setIsLoading(false);
      close();
      document.location.reload();
      toast.success('Gasto editado com sucesso');
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }

  return (
    <ModalComponent
      title="Editar Gasto"
      open={open}
      close={close}
      className="modal-content"
      content="Modal Edit Spendings"
    >
      <section>
        <form onSubmit={handleSubmit(handleEditSpending)}>
          <TextField>
            <Label htmlFor="item">
              <BsTag size={15} />
              Novo Item:
            </Label>
            <Input type="text" placeholder="Item" register={register('item')} />
          </TextField>
          <TextField>
            <Label htmlFor="cost">
              <BsCashCoin size={15} />
              Novo Valor:
            </Label>
            <Input
              type="text"
              placeholder="Valor"
              register={register('cost')}
            />
          </TextField>
          <TextField>
            <Label htmlFor="date">
              <BsCalendarWeek size={15} />
              Nova Data:
            </Label>
            <Input
              type="date"
              style={{ width: '97%' }}
              register={register('date')}
            />
          </TextField>
          <TextField errors={errors?.item?.message}>
            <Label htmlFor="necessity">
              <BsBookmarkStar size={15} />
              Grau de Necessidade:
            </Label>
            <Controller
              control={control}
              name="necessity"
              defaultValue={necessities[indexNecessity]}
              render={({ field: { onChange } }) => (
                <Select
                  className="react-select-container"
                  options={necessities}
                  onChange={(e) => {
                    onChange(e.value);
                  }}
                  defaultValue={necessities[indexNecessity]}
                  placeholder="Selecione a necessidade"
                />
              )}
            />
          </TextField>

          <ButtonSubmit>Editar</ButtonSubmit>
        </form>
      </section>
    </ModalComponent>
  );
}

export default ModalEdit;

ModalEdit.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  setIsLoading: PropTypes.func,
  idSpending: PropTypes.string,
  spendingData: PropTypes.object,
};
