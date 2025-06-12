import PropTypes from 'prop-types';
import './styles.css';

function Input({ type, style, defaultValue, placeholder, register }) {
  return (
    <input
      type={type}
      style={style}
      placeholder={placeholder}
      defaultValue={defaultValue}
      {...register}
    />
  );
}

export default Input;

Input.propTypes = {
  type: PropTypes.string,
  style: PropTypes.object,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  register: PropTypes.func,
};
