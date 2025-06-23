import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BsBoxArrowLeft,
  BsEnvelopeAt,
  BsPerson,
  BsPersonCircle,
} from 'react-icons/bs';

import { ThemeContext } from '../../contexts/ThemeContext';
import * as actions from '../../store/modules/auth/actions';
import useVerifyUser from '../../hooks/useVerifyUser';
import HeaderMobile from '../../components/Common/HeaderMobile';
import BottomBar from '../../components/Common/BottomBar';
import Container from '../../components/Common/Container';
import ModalEditPassword from '../../components/Modals/ModalsAccount/EditPassword';
import SVGPadlock from '../../assets/svgs/svg-padlock';
import Loading from '../../components/Loading';
import './styles.css';

function Account() {
  useVerifyUser();
  const { username, email } = useSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [{ theme }] = useContext(ThemeContext);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(actions.loginFailure());
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <HeaderMobile />
      <BottomBar />

      <ModalEditPassword
        open={isOpen}
        close={() => setIsOpen(false)}
        setIsLoading={setIsLoading}
      />

      <div className="header-account">
        <BsPersonCircle size={30} color={theme.textColorSecondary} />
        <h1 style={{ color: theme.textColorSecondary }}>Seus dados pessoais</h1>
      </div>

      <div className="private-data">
        <div className="data">
          <span>
            <BsPerson size={25} color={theme.textColorSecondary} />
          </span>
          <div className="data-content">
            <span style={{ color: theme.textColorSecondary }}>
              Nome de Usuário:
            </span>
            <span style={{ color: theme.textColorSecondary }}>{username}</span>
          </div>
        </div>
        <div className="data">
          <span>
            <BsEnvelopeAt size={25} color={theme.textColorSecondary} />
          </span>
          <div className="data-content">
            <span style={{ color: theme.textColorSecondary }}>Email: </span>
            <span style={{ color: theme.textColorSecondary }}>{email}</span>
          </div>
        </div>
        <div className="data">
          <span>
            <SVGPadlock
              width="25px"
              height="25px"
              stroke={theme.textColorSecondary}
            />
          </span>
          <span
            style={{ color: theme.textColorSecondary }}
            onClick={() => setIsOpen(true)}
          >
            Alterar Senha
          </span>
        </div>
        <div className="data">
          <span>
            <BsBoxArrowLeft size={25} color="red" />
          </span>
          <span style={{ color: 'red' }} onClick={handleLogout}>
            Sair
          </span>
        </div>
      </div>
    </Container>
  );
}

export default Account;
