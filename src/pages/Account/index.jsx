import { BsEnvelopeAt, BsPersonCircle } from 'react-icons/bs';
import { useSelector } from 'react-redux';

import BottomBar from '../../components/Common/BottomBar';
import SVGPadlock from '../../assets/svgs/svg-padlock';
import './styles.css';

function Account() {
  const { username, email } = useSelector((state) => state.auth.user);
  return (
    <article>
      <BottomBar />
      <div className="header-account">
        <BsPersonCircle size={30} />
        <h2>{username}</h2>
      </div>

      <div className="private-data">
        <div className="data">
          <span>
            <BsEnvelopeAt size={20} color="white" />
          </span>
          <p>Email: {email}</p>
        </div>
        <div className="data">
          <span>
            <SVGPadlock width="20px" height="20px" stroke="white" />
          </span>
          <p>Alterar Senha</p>
        </div>
      </div>
    </article>
  );
}

export default Account;
