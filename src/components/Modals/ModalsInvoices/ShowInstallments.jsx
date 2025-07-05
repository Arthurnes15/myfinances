import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { boolean, number, object } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { ThemeContext } from '../../../contexts/ThemeContext';
import ModalComponent from '../../Common/Modal';
import Label from '../../Common/Label';
import Button from '../../Common/Button';
import axiosClient from '../../../config/axios';
import './styles.css';

function ModalInstallments({
  open,
  close,
  months,
  restToPay,
  setIsLoading,
  idInvoice,
}) {
  const schema = object({
    index: number(),
    checked: boolean(),
  });

  const [{ theme }] = useContext(ThemeContext);

  const { control, setValue, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      index: 0,
      checked: false,
    },
  });

  async function handleEditMonth(data) {
    setIsLoading(true);
    try {
      await axiosClient.put(`invoices/month/${idInvoice}`, {
        index: data.index,
        checked: data.checked,
      });
      setIsLoading(false);
      close();
      document.location.reload();
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  }

  async function handleDelete(e) {
    e.persist();
    try {
      setIsLoading(true);

      await axiosClient.delete(`invoices/${idInvoice}`);

      setIsLoading(false);
      document.location.reload();
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  return (
    <ModalComponent
      title="Meses das Parcelas"
      open={open}
      close={close}
      id="notEnough"
      className="modal-content"
      content="Modal Show Installments Months"
    >
      <form onSubmit={handleSubmit(handleEditMonth)}>
        {months?.map((month, index) => (
          <div key={index} className="months">
            <Label htmlFor="month">{month.month}</Label>
            <Controller
              control={control}
              name="checked"
              render={({ field: { onChange } }) => (
                <input
                  type="checkbox"
                  className="input-checked"
                  onChange={(e) => onChange(e.target.checked)}
                  defaultChecked={month.checked}
                  onClick={() => setValue('index', index)}
                />
              )}
            />
          </div>
        ))}

        <div className="restToPay" style={{ color: theme.textColor }}>
          Total a pagar:
          {' ' +
            restToPay?.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
        </div>

        <section className="change">
          <div className="deleteInvoice" onClick={(e) => handleDelete(e)}>
            <Button type="button">Excluir</Button>
          </div>
          <div className="updateInvoice">
            <Button type="submit">Salvar</Button>
          </div>
        </section>
      </form>
    </ModalComponent>
  );
}

export default ModalInstallments;

ModalInstallments.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  months: PropTypes.array,
  restToPay: PropTypes.number,
  setIsLoading: PropTypes.func,
  idInvoice: PropTypes.string,
  handleDelete: PropTypes.func,
};
