import { date, number, object, string } from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BsBookmarkStar, BsCashCoin, BsTag } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { necessities } from '../../../utils/necessities';
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
    cost: number()
      .typeError('Deve ser um número')
      .required('Campo obrigatório'),
    date: date()
      .default(() => new Date())
      .typeError('Data inválida'),
    necessity: string().required('Campo obrigatório'),
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
      await axiosClient.post('spendings', {
        item: data.item,
        necessity: data.necessity,
        date: data.date,
        cost: data.cost,
        user,
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
      <ModalComponent
        title="Cadastrar Gasto"
        open={open}
        close={close}
        className="modal-content"
        content="Modal Insert Spendings"
      >
        <section>
          <form onSubmit={handleSubmit(handleSubmitSpending)}>
            <TextField errors={errors?.item?.message}>
              <Label htmlFor="item">
                <BsTag size={15} />
                Item:
              </Label>
              <Input
                type="text"
                placeholder="Item"
                register={register('item')}
              />
            </TextField>
            <TextField errors={errors?.item?.message}>
              <Label htmlFor="cost">
                <BsCashCoin size={15} />
                Valor:
              </Label>
              <Input
                type="text"
                placeholder="Valor"
                register={register('cost')}
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
