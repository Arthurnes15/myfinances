import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { toast } from 'react-toastify';

import ModalComponent from '../../Common/Modal';
import TextField from '../../Common/TextField';
import Label from '../../Common/Label';
import Input from '../../Common/Input';
import SVGPadlock from '../../../assets/svgs/svg-padlock';
import ButtonSubmit from '../../Common/ButtonSubmit';
import axiosClient from '../../../config/axios';

function ModalEditPassword({ open, close, setIsLoading }) {
  const schema = object({
    password: string()
      .required('Campo obrigatório')
      .min(6, 'Deve conter 6 caracteres no mínimo')
      .max(50, 'Deve conter 50 caracteres no máximo'),
    passwordConfirmed: string()
      .required('Campo obrigatório')
      .min(6, 'Deve conter 6 caracteres no mínimo')
      .max(50, 'Deve conter 50 caracteres no máximo'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  async function handleEditPassword(data) {
    try {
      setIsLoading(true);

      if (data.password !== data.passwordConfirmed) {
        toast.error('As senhas não coincidem');
        setIsLoading(false);
        return;
      }

      await axiosClient.put('users/updatePassword', {
        password: data.password,
      });
      toast.success('Senha alterada com sucesso');
      close();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  if (open) {
    return (
      <ModalComponent
        title="Alterar Senha"
        open={open}
        close={close}
        className="modal-content"
        content="Modal Edit Password"
      >
        <section>
          <form onSubmit={handleSubmit(handleEditPassword)}>
            <TextField errors={errors?.password?.message}>
              <Label htmlFor="password">
                <SVGPadlock width="25px" height="25px" stroke="white" />
                Nova Senha:
              </Label>
              <Input
                type="password"
                placeholder="Sua nova senha"
                register={register('password')}
              />
            </TextField>
            <TextField errors={errors?.passwordConfirmed?.message}>
              <Label htmlFor="passwordConfirmed">
                <SVGPadlock width="25px" height="25px" stroke="white" />
                Confirme a Senha:
              </Label>
              <Input
                type="password"
                placeholder="Confirme sua nova senha"
                register={register('passwordConfirmed')}
              />
            </TextField>
            <ButtonSubmit>Alterar</ButtonSubmit>
          </form>
        </section>
      </ModalComponent>
    );
  }
}

export default ModalEditPassword;

ModalEditPassword.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  setIsLoading: PropTypes.func,
};
