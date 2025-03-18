import { string, object } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../../store/modules/auth/actions';
import logo from '../../assets/images/logo.png';
import './styles.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';

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
    <article className="login">
      <Loading isLoading={isLoading} />
      <section className="login_content">
        <header className="title">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="text">
            <h1>MyFinances</h1>
          </div>
        </header>
        <form onSubmit={handleSubmit(handleSubmitLogin)}>
          <div className="text-fieldLogin">
            <label htmlFor="email">Email: </label>
            <input type="email" placeholder="Email" {...register('email')} />
            <span className="text-danger">{errors?.email?.message}</span>
          </div>
          <div className="text-fieldLogin">
            <label htmlFor="email">Senha: </label>
            <input
              type="password"
              placeholder="Senha"
              {...register('password')}
            />
            <span className="text-danger">{errors?.password?.message}</span>
          </div>
          <div className="loginButton">
            <button type="submit">Entrar</button>
          </div>
        </form>
      </section>
    </article>
  );
}

export default Login;
