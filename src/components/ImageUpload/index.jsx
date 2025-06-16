import PropTypes from 'prop-types';
import { BsImage } from 'react-icons/bs';
import './styles.css';

function ImageUpload({ onClick }) {
  return (
    <button type="button" className="image-upload" onClick={onClick}>
      <BsImage size={16} />
      Adicionar Imagem
    </button>
  );
}

export default ImageUpload;

ImageUpload.propTypes = {
  onClick: PropTypes.func,
};
