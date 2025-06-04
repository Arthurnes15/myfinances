import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import {
  BsTags,
  BsCoin,
  BsPercent,
  BsPencilSquare,
  BsTrashFill,
} from 'react-icons/bs';

import Button from '../Common/Button';
import './styles.css';

function Saving({ image, name, price, investment, percentage, onClick }) {
  const progressRef = useRef(null);

  useEffect(() => {
    progressRef.current.setAttribute('style', `width: ${percentage}%`);
  }, [progressRef, percentage]);

  return (
    <>
      <section className="saving">
        <div className="saving-image">
          <img src={image} alt="saving" />
        </div>
        <div className="saving-details">
          <header className="saving-header">
            <h3>{name}</h3>
          </header>
          <div className="saving-information">
            <p className="information">
              <BsTags size={22} /> Preço:{' '}
              {price.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
            <p className="information">
              <BsCoin size={22} /> Investimento:{' '}
              {investment.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
            <p className="information">
              <BsPercent size={22} /> Percentual de Investimento: {percentage} %
            </p>
            <div className="progress-actions">
              <div className="progress-bar">
                <div
                  ref={progressRef}
                  className="progress"
                  style={{ width: '30px' }}
                ></div>
              </div>
              <Button type="button" className="edit">
                <BsPencilSquare size={20} color="white" />
              </Button>
              <Button type="button" className="delete" onClick={onClick}>
                <BsTrashFill size={20} color="white" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Saving;

Saving.defaultProps = {
  image: '',
  name: '',
  price: 0,
  investment: 0,
  percentage: 0,
  onClick: '',
};

Saving.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  investment: PropTypes.number,
  percentage: PropTypes.number,
  onClick: PropTypes.func,
};
