import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { ThemeContext } from '../../contexts/ThemeContext';

import Input from '../../components/Common/Input';
import Label from '../../components/Common/Label';
import TextField from '../../components/Common/TextField';
import ButtonSubmit from '../../components/Common/ButtonSubmit';
import HeaderInitial from '../../components/Common/HeaderInitial';
import ToggleTheme from '../../components/ToggleTheme';
import Loading from '../../components/Loading';
import axiosClient from '../../config/axios';
import './styles.css';

function ForgotPassword() {
  const schema = object({
    email: string()
      .email('Deve conter @')
      .required('Campo obrigatório')
      .max(50, 'Deve conter no máximo 50 caracteres'),
    newPassword: string()
      .required('Campo obrigatório')
      .min(6, 'A senha deve conter no mínimo 6 caracteres')
      .max(50, 'A senha deve conter no máximo 50 caracteres '),
    newPasswordConfirmed: string()
      .required('Campo obrigatório')
      .min(6, 'A senha deve conter no mínimo 6 caracteres')
      .max(50, 'A senha deve conter no máximo 50 caracteres '),
  });
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [{ theme }] = useContext(ThemeContext);
  const navigate = useNavigate();

  async function handleEditPassword(data) {
    try {
      setIsLoading(true);

      if (data.newPassword !== data.newPasswordConfirmed) {
        setIsLoading(false);
        toast.error('As senhas não coincidem');
        return;
      }

      await axiosClient
        .patch('/users/updateForgottenPassword', {
          email: data.email,
          newPassword: data.newPassword,
        })
        .then(() => {
          navigate('/');
          toast.success('Senha alterada com sucesso');
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
          toast.error(err.response.data.errors[0]);
        });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error('Ocorreu um erro, tente novamente');
    }
  }

  return (
    <article
      className="forgot-password"
      style={{ backgroundColor: theme.backgroundColor }}
    >
      <Loading isLoading={isLoading} />
      <section
        className="forgot-content"
        style={{ border: `1px solid ${theme.textColorSecondary}` }}
      >
        <HeaderInitial />
        <form onSubmit={handleSubmit(handleEditPassword)}>
          <TextField errors={errors?.email?.message}>
            <Label htmlFor="email">Qual é o seu email?</Label>
            <Input
              type="email"
              placeholder="E-mail"
              register={register('email')}
            />
          </TextField>
          <TextField errors={errors?.newPassword?.message}>
            <Label htmlFor="newPassword">Sua nova senha</Label>
            <Input
              type="password"
              placeholder="Nova senha"
              register={register('newPassword')}
            />
          </TextField>
          <TextField errors={errors?.newPasswordConfirmed?.message}>
            <Label htmlFor="newPasswordConfirmed">
              Confirme sua nova senha
            </Label>
            <Input
              type="password"
              placeholder="Nova senha"
              register={register('newPasswordConfirmed')}
            />
          </TextField>

          <div className="toggle">
            <ToggleTheme />
          </div>

          <ButtonSubmit>Alterar</ButtonSubmit>
        </form>
      </section>
    </article>
  );
}

export default ForgotPassword;
