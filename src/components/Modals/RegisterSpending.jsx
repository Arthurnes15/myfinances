import { date, number, object, string } from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BsBookmarkStar, BsCashCoin, BsTag } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { necessities } from '../../utils/necessities';
import axiosClient from '../../config/axios';
import Modal from '../Common/Modal';
import Input from '../Common/Input';
import TextField from '../TextField';

function ModalRegister({ open, close, setIsLoading }) {
  const user = useSelector((state) => state.auth.user.email);

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
      setIsLoading(false);
      close;
      document.location.reload();
      toast.success('Gasto salvo com sucesso');
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      toast.error('Erro ao salvar gasto');
    }
  }
  if (open) {
    return (
      <>
        <Modal
          title="Cadastrar Gasto"
          open={open}
          close={close}
          className="modal-content"
          content="Modal Insert Spendings"
        >
          <section>
            <form onSubmit={handleSubmit(handleSubmitSpending)}>
              <TextField errors={errors?.item?.message}>
                <label htmlFor="item">
                  <BsTag size={15} />
                  Item:
                </label>
                <Input
                  type="text"
                  placeholder="Item"
                  register={register('item')}
                ></Input>
              </TextField>
              <TextField errors={errors?.item?.message}>
                <label htmlFor="item">
                  <BsCashCoin size={15} />
                  Valor:
                </label>
                <Input
                  type="text"
                  placeholder="Valor"
                  register={register('cost')}
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
                <button type="submit">Cadastrar</button>
              </div>
            </form>
          </section>
        </Modal>
      </>
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
