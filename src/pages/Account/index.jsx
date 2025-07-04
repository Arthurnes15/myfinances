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
import Sidebar from '../../components/Common/Sidebar';
import Header from '../../components/Common/Header';
import HeaderMobile from '../../components/Common/HeaderMobile';
import BottomBar from '../../components/Common/BottomBar';
import Container from '../../components/Common/Container';
import Content from '../../components/Common/Content';
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
      <Sidebar />
      <BottomBar />

      <ModalEditPassword
        open={isOpen}
        close={() => setIsOpen(false)}
        setIsLoading={setIsLoading}
      />

      <Content>
        <Header
          icon={<BsPersonCircle size={30} color={theme.textColorSecondary} />}
          title="Seus Dados Pessoais"
          styleButton={{ display: 'none' }}
        />
        <div className="private-data">
          <div
            className="data"
            style={{ backgroundColor: theme.backgroundColorSecondary }}
          >
            <span>
              <BsPerson size={50} color={theme.textColorSecondary} />
            </span>
            <div className="data-content">
              <span style={{ color: theme.textColorSecondary }}>
                Nome de Usuário:
              </span>
              <span style={{ color: theme.textColorSecondary }}>
                {username}
              </span>
            </div>
          </div>
          <div
            className="data"
            style={{ backgroundColor: theme.backgroundColorSecondary }}
          >
            <span>
              <BsEnvelopeAt size={50} color={theme.textColorSecondary} />
            </span>
            <div className="data-content">
              <span style={{ color: theme.textColorSecondary }}>Email: </span>
              <span style={{ color: theme.textColorSecondary }}>{email}</span>
            </div>
          </div>
          <div
            className="data"
            style={{ backgroundColor: theme.backgroundColorSecondary }}
            onClick={() => setIsOpen(true)}
          >
            <span>
              <SVGPadlock
                width="50px"
                height="50px"
                stroke={theme.textColorSecondary}
              />
            </span>
            <span style={{ color: theme.textColorSecondary }}>
              Alterar Senha
            </span>
          </div>
          <div className="logout" onClick={handleLogout}>
            <BsBoxArrowLeft size={50} />
            <span>Sair</span>
          </div>
        </div>
      </Content>
    </Container>
  );
}

export default Account;
