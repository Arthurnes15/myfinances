import PropTypes from 'prop-types';
import './styles.css';

function Input({ type, defaultValue, placeholder, register }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      {...register}
    />
  );
}

export default Input;

Input.propTypes = {
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  register: PropTypes.func,
};
