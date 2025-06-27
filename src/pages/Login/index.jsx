import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { string, object } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import { ThemeContext } from '../../contexts/ThemeContext';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/Loading';
import TextField from '../../components/Common/TextField/index';
import Label from '../../components/Common/Label';
import Input from '../../components/Common/Input';
import ButtonSubmit from '../../components/Common/ButtonSubmit';
import logo from '../../assets/images/logo.png';
import ToggleTheme from '../../components/ToggleTheme';
import './styles.css';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schema = object({
    email: string()
      .email('Deve conter @')
      .required('Campo obrigatório')
      .max(50, 'Deve conter no máximo 50 caracteres'),
    password: string().required('Campo obrigatório'),
  });
  const [{ theme }] = useContext(ThemeContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isLoading = useSelector((state) => state.auth.isLoading);

  function handleSubmitLogin(data) {
    dispatch(actions.loginRequest(data));
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/spendings');
    }
  }, [isLoggedIn, navigate]);

  return (
    <article
      className="login"
      style={{ backgroundColor: theme.backgroundColor }}
    >
      <Loading isLoading={isLoading} />
      <section
        className="login_content"
        style={{ border: `1px solid ${theme.textColorSecondary}` }}
      >
        <header className="title">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="text">
            <h1 style={{ color: theme.textColorSecondary }}>MyFinances</h1>
          </div>
        </header>
        <form onSubmit={handleSubmit(handleSubmitLogin)}>
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

          <ButtonSubmit>Entrar</ButtonSubmit>

          <div className="toggle">
            <ToggleTheme />
          </div>

          <div className="redirect">
            <p style={{ color: theme.textColor }}>
              Não possui conta? <a href="/register-user">Cadastre-se</a>
            </p>
          </div>
        </form>
      </section>
    </article>
  );
}

export default Login;
