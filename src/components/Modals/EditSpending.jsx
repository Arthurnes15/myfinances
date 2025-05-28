import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { date, number, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  BsBookmarkStar,
  BsCalendarWeek,
  BsCashCoin,
  BsTag,
} from 'react-icons/bs';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import PropTypes from 'prop-types';

import { necessities } from '../../utils/necessities';
import Modal from '../Common/Modal';
import axiosClient from '../../config/axios';
import TextField from '../TextField';
import Input from '../Common/Input';

function ModalEdit({
  open,
  close,
  setIsLoading,
  idSpending,
  spendingData,
  necessity,
}) {
  const user = useSelector((state) => state.auth.user.email);

  const indexNecessity = necessities.findIndex(
    (value) => value.value === necessity
  );

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
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const { item, cost, dateSpending } = spendingData;
    setValue('item', item);
    setValue('cost', cost);
    setValue('date', dateSpending);
  }, [setValue, spendingData]);

  async function handleEditSpending(data) {
    setIsLoading(true);
    try {
      await axiosClient.put(`/spendings/${idSpending}`, {
        item: data.item,
        necessity: data.necessity,
        date: data.date,
        cost: data.cost,
        user: data.user,
      });
      setIsLoading(false);
      close;
      document.location.reload();
      toast.success('Gasto editado com sucesso');
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }

  return (
    <Modal
      title="Editar Gasto"
      open={open}
      close={close}
      className="modal-content"
      content="Modal Edit Spendings"
    >
      <section>
        <form onSubmit={handleSubmit(handleEditSpending)}>
          <TextField>
            <label htmlFor="item">
              <BsTag size={15} />
              Novo Item:
            </label>
            <Input
              type="text"
              placeholder="Item"
              register={register('item')}
            ></Input>
          </TextField>
          <TextField>
            <label htmlFor="cost">
              <BsCashCoin size={15} />
              Novo Valor:
            </label>
            <Input
              type="text"
              placeholder="Valor"
              register={register('cost')}
            ></Input>
          </TextField>
          <TextField>
            <label htmlFor="date">
              <BsCalendarWeek size={15} />
              Nova Data:
            </label>
            <Input
              type="date"
              placeholder="Item"
              register={register('date')}
            ></Input>
          </TextField>
          <TextField errors={errors?.item?.message}>
            <label htmlFor="item">
              <BsBookmarkStar size={15} />
              Grau de Necessidade:
            </label>
            <Controller
              control={control}
              name="necessity"
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

          <Input
            type="hidden"
            defaultValue={user}
            register={register('user')}
          />

          <div className="action">
            <button type="submit">Editar</button>
          </div>
        </form>
      </section>
    </Modal>
  );
}

export default ModalEdit;

ModalEdit.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  setIsLoading: PropTypes.func,
  idSpending: PropTypes.string,
  spendingData: PropTypes.object,
  necessity: PropTypes.string,
};
