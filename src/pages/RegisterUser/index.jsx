import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { object, string } from 'yup';

import { ThemeContext } from '../../contexts/ThemeContext';
import TextField from '../../components/Common/TextField';
import Input from '../../components/Common/Input';
import ButtonSubmit from '../../components/Common/ButtonSubmit';
import Loading from '../../components/Loading';
import Label from '../../components/Common/Label';
import HeaderInitial from '../../components/Common/HeaderInitial';
import axiosClient from '../../config/axios';
import './styles.css';
import ToggleTheme from '../../components/ToggleTheme';

function RegisterUser() {
  const schema = object({
    username: string().required('Campo obrigatório'),
    email: string()
      .email('Deve conter @')
      .required('Campo obrigatório')
      .max(50, 'Deve conter no máximo 50 caracteres'),
    password: string()
      .required('Campo obrigatório')
      .min(6, 'A senha deve conter no mínimo 6 caracteres')
      .max(50, 'A senha deve conter no máximo 50 caracteres '),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [{ theme }] = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmitUser(data) {
    setIsLoading(true);
    try {
      await axiosClient
        .post('users', {
          username: data.username,
          email: data.email,
          password: data.password,
        })
        .then(() => {
          navigate('/');
          toast.success('Usuário criado com sucesso');
        })
        .catch((err) => {
          toast.error(err.response.data.errors[0]);
        });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error('Ocorreu um erro, tente novamente');
      console.log(error);
    }
  }

  return (
    <article
      className="register-user"
      style={{ backgroundColor: theme.backgroundColor }}
    >
      <Loading isLoading={isLoading} />

      <section
        className="register-user-content"
        style={{ border: `1px solid ${theme.textColorSecondary}` }}
      >
        <HeaderInitial />

        <form onSubmit={handleSubmit(handleSubmitUser)}>
          <TextField errors={errors?.username?.message}>
            <Label htmlFor="username">Nome de Usuário: </Label>
            <Input
              type="text"
              placeholder="Nome de Usuário"
              register={register('username')}
            />
          </TextField>
          <TextField errors={errors?.email?.message}>
            <Label htmlFor="email">Email: </Label>
            <Input
              type="email"
              placeholder="Email"
              register={register('email')}
            />
          </TextField>
          <TextField errors={errors?.password?.message}>
            <Label htmlFor="email">Senha: </Label>
            <Input
              type="password"
              placeholder="Senha"
              register={register('password')}
            />
          </TextField>
          <div className="toggle">
            <ToggleTheme />
          </div>

          <ButtonSubmit>Cadastrar</ButtonSubmit>

          <div className="redirect-login">
            <p style={{ color: theme.textColor }}>
              Já tem conta? <a href="/">Entrar</a>
            </p>
          </div>
        </form>
      </section>
    </article>
  );
}

export default RegisterUser;
