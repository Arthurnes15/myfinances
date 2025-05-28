import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  BsBookmarkStar,
  BsCalendarWeek,
  BsCashCoin,
  BsPencilSquare,
  BsTag,
  BsTrashFill,
} from 'react-icons/bs';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { dateFormatter } from '../../utils/dataFormatter';
import * as actions from '../../store/modules/auth/actions';
import Button from '../Button';
import axiosClient from '../../config/axios';
import './styles.css';

function Table({ setIsLoading, openEditModal }) {
  const [spendings, setSpendings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        const response = await axiosClient.get('/spendings');
        setSpendings(response.data);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        const status = get(error, 'response.status', 0);
        if (status === 401) {
          dispatch(actions.loginFailure());
        }
        console.error(error);
      }
    }
    getData();
  }, [dispatch, setIsLoading]);

  async function handleDelete(e, id, index) {
    e.persist();
    try {
      setIsLoading(true);
      await axiosClient.delete(`/spendings/${id}`);
      const newSpendings = [...spendings];
      newSpendings.splice(index, 1);
      setSpendings(newSpendings);
      setIsLoading(false);
      toast.success('Gasto excluído com sucesso');
    } catch {
      console.log('Erro');
      setIsLoading(false);
    }
  }

  return (
    <table className="spendings">
      <thead>
        <tr>
          <th>
            <span>
              <BsTag size={24} />
              Item
            </span>
          </th>
          <th>
            <span>
              <BsCashCoin size={24} />
              Valor
            </span>
          </th>
          <th>
            <span>
              <BsCalendarWeek size={24} />
              Data
            </span>
          </th>
          <th>
            <span>
              <BsBookmarkStar size={24} />
              Necessidade
            </span>
          </th>
          <th colSpan={2}></th>
        </tr>
      </thead>
      <tbody>
        {spendings.map((spending, index) => (
          <tr key={index}>
            <td>{spending.item}</td>
            <td>
              {spending.cost.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </td>
            <td>{dateFormatter(spending.date)}</td>
            <td>
              <span className="necessity" color={spending.necessity}>
                {spending.necessity}
              </span>
            </td>
            <td>
              <Button
                type="button"
                className="edit-spending"
                onClick={() => openEditModal(spending)}
              >
                <BsPencilSquare size={20} color="white" />
              </Button>
            </td>
            <td>
              <Button
                type="button"
                className="delete-spending"
                onClick={(e) => handleDelete(e, spending._id, index)}
              >
                <BsTrashFill size={20} color="white" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;

Table.propTypes = {
  setIsLoading: PropTypes.func,
  openEditModal: PropTypes.func,
  handleDelete: PropTypes.func,
};
