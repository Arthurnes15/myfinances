import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { BsCoin, BsPiggyBank, BsTags, BsXLg } from 'react-icons/bs';
import { object, number, string, mixed } from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import { convertToBase64 } from '../../../utils/convertToBase64';
import Input from '../../Common/Input';
import Modal from '../../Common/Modal';
import Label from '../../Common/Label';
import TextField from '../../Common/TextField';
import ButtonSubmit from '../../Common/ButtonSubmit';
import axiosClient from '../../../config/axios';
import ImageUpload from '../../ImageUpload';

function ModalEdit({ open, close, setIsLoading, savingData, idSaving }) {
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
    setValue,
    handleSubmit,
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
    setValue('image', '');
  }

  async function handleFileUpload(event) {
    const file = event.target.files[0];

    if (!file) {
      setImgUrl('');
      return;
    }

    if (file?.size > 1024000) {
      toast.error('Imagem maior que 1MB');
      setIsLoading(false);
      setImgUrl('');
      return;
    }

    setImgUrl(URL.createObjectURL(file));

    setValue('image', file);
  }

  useEffect(() => {
    const { name, price, investment, image } = savingData;
    setValue('name', name);
    setValue('price', price);
    setValue('investment', investment);
    setValue('image', image);
    setImgUrl(image);
  }, [setValue, savingData]);

  async function handleEditSaving(data) {
    setIsLoading(true);

    const image =
      typeof data.image === 'object'
        ? await convertToBase64(data.image)
        : data.image;

    try {
      await axiosClient.put(`savings/${idSaving}`, {
        name: data.name,
        price: data.price,
        investment: data.investment,
        image,
      });
      setIsLoading(false);
      document.location.reload();
      close();
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      toast.error('Erro ao editar economia');
    }
  }

  if (open) {
    return (
      <Modal
        title="Editar Economia"
        open={open}
        close={close}
        className="modal-content"
        id="notEnough"
        content="Modal Edit Savings"
      >
        <section>
          <form onSubmit={handleSubmit(handleEditSaving)}>
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
            />
            <TextField errors={errors?.name?.message}>
              <Label htmlFor="saving">
                <BsPiggyBank size={16} />
                Nova Economia:
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
                Novo Preço:
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
                Novo Valor do Investimento:
              </Label>
              <Input
                type="text"
                placeholder="Valor"
                register={register('investment')}
              />
            </TextField>

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

            <ButtonSubmit>Editar</ButtonSubmit>
          </form>
        </section>
      </Modal>
    );
  } else {
    return <></>;
  }
}

export default ModalEdit;

ModalEdit.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  setIsLoading: PropTypes.func,
  savingData: PropTypes.object,
  idSaving: PropTypes.string,
};
