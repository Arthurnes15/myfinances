import PropTypes from 'prop-types';

import './styles.css';

function ButtonSubmit({ children }) {
  return (
    <div className="button-submit">
      <button type="submit">{children}</button>
    </div>
  );
}

export default ButtonSubmit;

ButtonSubmit.propTypes = {
  children: PropTypes.node,
};
