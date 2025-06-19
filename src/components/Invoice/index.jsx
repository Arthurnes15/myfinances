import PropTypes from 'prop-types';
import { BsCheckCircle, BsClockHistory, BsList } from 'react-icons/bs';

import './styles.css';

function Invoice({ item, status, installmentsValue, onClick }) {
  return (
    <section className="invoice">
      <div className="header-invoice">
        <div className="status" color={status}>
          {status === 'Pendente' ? (
            <BsClockHistory size={40} />
          ) : status === 'Paga' ? (
            <BsCheckCircle size={40} />
          ) : null}
        </div>
        <div className="invoice-details" onClick={onClick}>
          <BsList size={30} />
        </div>
      </div>
      <div>
        <h2>{item}</h2>
        <p>
          Valor da parcela:{' '}
          {installmentsValue.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
      </div>
    </section>
  );
}

export default Invoice;

Invoice.propTypes = {
  item: PropTypes.string,
  status: PropTypes.string,
  installmentsValue: PropTypes.number,
  onClick: PropTypes.func,
};
