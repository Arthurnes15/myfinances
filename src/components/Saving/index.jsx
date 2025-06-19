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

function Saving({
  image,
  name,
  price,
  investment,
  percentage,
  onEdit,
  onDelete,
}) {
  const progressRef = useRef(null);

  useEffect(() => {
    if (percentage === 100) {
      progressRef.current.setAttribute('style', `width: ${percentage}%`);
      progressRef.current.classList.remove('progress');
      progressRef.current.classList.add('fullProgress');
    } else {
      progressRef.current.setAttribute('style', `width: ${percentage}%`);
    }
  }, [progressRef, percentage]);

  return (
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
              <div ref={progressRef} className="progress">
                <div className="bubble"></div>
              </div>
            </div>
            <Button type="button" className="edit" onClick={onEdit}>
              <BsPencilSquare size={20} color="white" />
            </Button>
            <Button type="button" className="delete" onClick={onDelete}>
              <BsTrashFill size={20} color="white" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Saving;

Saving.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  investment: PropTypes.number,
  percentage: PropTypes.number,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};
