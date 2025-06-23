import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useContext } from 'react';
import { BsCheckCircle, BsClockHistory, BsList } from 'react-icons/bs';

import { ThemeContext } from '../../contexts/ThemeContext';
import './styles.css';

function Invoice({ item, status, installmentsValue, onClick }) {
  const [{ theme, isDark }] = useContext(ThemeContext);

  return (
    <section
      className="invoice"
      style={{
        backgroundColor: theme.backgroundColorSecondary,
      }}
    >
      <div className="header-invoice">
        <div className="status" color={status}>
          {status === 'Pendente' ? (
            <BsClockHistory size={40} />
          ) : status === 'Paga' ? (
            <BsCheckCircle size={40} />
          ) : null}
        </div>
        <div
          className={clsx('invoice-details', {
            ' dark': isDark,
          })}
          style={{ border: `1px solid ${theme.textColor}` }}
          onClick={onClick}
        >
          <BsList size={30} color={theme.textColor} />
        </div>
      </div>
      <div>
        <h2 style={{ color: theme.textColor }}>{item}</h2>
        <p style={{ color: theme.textColor }}>
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
