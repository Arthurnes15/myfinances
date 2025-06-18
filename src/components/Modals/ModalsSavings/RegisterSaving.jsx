import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { mixed, number, object, string } from 'yup';
import { BsCoin, BsPiggyBank, BsTags, BsXLg } from 'react-icons/bs';

import { convertToBase64 } from '../../../utils/convertToBase64';
import TextField from '../../Common/TextField';
import Label from '../../Common/Label';
import Input from '../../Common/Input';
import ModalComponent from '../../Common/Modal';
import ButtonSubmit from '../../Common/ButtonSubmit';
import axiosClient from '../../../config/axios';
import ImageUpload from '../../ImageUpload';
import './styles.css';

function ModalRegister({ open, close, setIsLoading }) {
  const user = useSelector((state) => state.auth.user.email);
  const [imgUrl, setImgUrl] = useState('');
  const inputRef = useRef(null);

  const schema = object({
    name: string().required('Campo obrigatório'),
    price: number()
      .typeError('Deve ser um número')
      .required('Campo obrigatório'),
    investment: number()
      .typeError('Deve ser um número')
      .required('Campo obrigatório'),
    image: mixed(),
  });

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleOpenFile() {
    inputRef.current.click();
  }

  function handleClearInputFile() {
    setImgUrl('');

    inputRef.current.value = '';
  }

  async function handleFileUpload(event) {
    const file = event.target.files[0];

    if (!file) {
      setImgUrl('');
      return;
    }

    setImgUrl(URL.createObjectURL(file));

    // TODO: Validar tamanho da imagem

    setValue('image', file);
  }

  async function handleSubmitSaving(data) {
    try {
      setIsLoading(true);

      const image =
        typeof data.image === 'object' ? await convertToBase64(data.image) : '';

      await axiosClient.post('savings', {
        name: data.name,
        price: data.price,
        investment: data.investment,
        image,
        user,
      });
      setIsLoading(false);
      close();
      document.location.reload();
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }

  if (open) {
    return (
      <ModalComponent
        title="Cadastrar Economia"
        open={open}
        close={close}
        className="modal-content"
        id="notEnough"
        content="Modal Insert Savings"
      >
        <section>
          <form onSubmit={handleSubmit(handleSubmitSaving)}>
            <Controller
              control={control}
              name="image"
              render={() => (
                <Input
                  type="file"
                  style={{ display: 'none' }}
                  ref={inputRef}
                  onChange={handleFileUpload}
                />
              )}
            ></Controller>

            <TextField>
              <ImageUpload onClick={handleOpenFile} />
            </TextField>

            {!!imgUrl && (
              <section className="image-preview">
                <div className="image-content">
                  <div className="remove-photo">
                    <button
                      type="button"
                      title="Remover Imagem"
                      onClick={handleClearInputFile}
                    >
                      <BsXLg size={25} />
                    </button>
                  </div>

                  <img src={imgUrl} alt="image" />
                </div>
              </section>
            )}

            <TextField errors={errors?.name?.message}>
              <Label htmlFor="saving">
                <BsPiggyBank size={16} />
                Economia:
              </Label>
              <Input
                type="text"
                placeholder="Economia"
                register={register('name')}
              />
            </TextField>

            <TextField errors={errors?.price?.message}>
              <Label htmlFor="price">
                <BsTags size={15} />
                Preço:
              </Label>
              <Input
                type="text"
                placeholder="Preço"
                register={register('price')}
              />
            </TextField>

            <TextField errors={errors?.investment?.message}>
              <Label htmlFor="investment">
                <BsCoin size={15} />
                Investimento:
              </Label>
              <Input
                type="text"
                placeholder="Valor"
                register={register('investment')}
              />
            </TextField>

            <ButtonSubmit>Cadastrar</ButtonSubmit>
          </form>
        </section>
      </ModalComponent>
    );
  } else {
    return <></>;
  }
}

export default ModalRegister;

ModalRegister.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  setIsLoading: PropTypes.func,
};
