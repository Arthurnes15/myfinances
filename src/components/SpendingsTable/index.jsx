import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
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

import { dateFormatter } from '../../utils/dataFormatter';
import { ThemeContext } from '../../contexts/ThemeContext';
import * as actions from '../../store/modules/auth/actions';
import PlaceholderHeading from '../Common/PlaceholderHeading';
import Button from '../Common/Button';
import axiosClient from '../../config/axios';
import './styles.css';

function SpendingsTable({ setIsLoading, openEditModal }) {
  const [spendings, setSpendings] = useState([]);
  const [{ theme }] = useContext(ThemeContext);
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
    <main className="all-spendings">
      {spendings.length === 0 ? (
        <PlaceholderHeading text="Você ainda não cadastrou nenhum gasto" />
      ) : (
        <table
          className="spendings"
          style={{ border: `1px solid ${theme.textColor}` }}
        >
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
                <td
                  style={{
                    color: theme.textColor,
                    borderBottom: `1px solid ${theme.textColor}`,
                  }}
                >
                  {spending.item}
                </td>
                <td
                  style={{
                    color: theme.textColor,
                    borderBottom: `1px solid ${theme.textColor}`,
                  }}
                >
                  {spending.cost.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </td>
                <td
                  style={{
                    color: theme.textColor,
                    borderBottom: `1px solid ${theme.textColor}`,
                  }}
                >
                  {dateFormatter(spending.date)}
                </td>
                <td style={{ borderBottom: `1px solid ${theme.textColor}` }}>
                  <span className="necessity" color={spending.necessity}>
                    {spending.necessity}
                  </span>
                </td>
                <td style={{ borderBottom: `1px solid ${theme.textColor}` }}>
                  <Button
                    type="button"
                    className="edit"
                    onClick={() => openEditModal(spending)}
                  >
                    <BsPencilSquare size={20} color="white" />
                  </Button>
                </td>
                <td style={{ borderBottom: `1px solid ${theme.textColor}` }}>
                  <Button
                    type="button"
                    className="delete"
                    onClick={(e) => handleDelete(e, spending._id, index)}
                  >
                    <BsTrashFill size={20} color="white" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default SpendingsTable;

SpendingsTable.propTypes = {
  setIsLoading: PropTypes.func,
  openEditModal: PropTypes.func,
};
