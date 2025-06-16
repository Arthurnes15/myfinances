import PropTypes from 'prop-types';
import './styles.css';

function Input({
  type,
  style,
  ref,
  defaultValue,
  placeholder,
  register,
  onChange,
}) {
  return (
    <input
      type={type}
      style={style}
      ref={ref}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
      {...register}
    />
  );
}

export default Input;

Input.propTypes = {
  type: PropTypes.string,
  style: PropTypes.object,
  ref: PropTypes.object,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  register: PropTypes.func,
  onChange: PropTypes.func,
};
