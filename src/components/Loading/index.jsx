import PropTypes from 'prop-types';

import animation from '../../assets/images/loading.gif';
import './styles.css';

function Loading({ isLoading }) {
  if (!isLoading) return <></>;
  return (
    <section className="loading">
      <div className="loading-content" />
      <img src={animation} alt="loading-animation" />
    </section>
  );
}

Loading.defaultProps = {
  isLoading: false,
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
};

export default Loading;
