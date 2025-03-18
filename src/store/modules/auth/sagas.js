import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import * as actions from './actions';
import * as types from '../types';
import axiosClient from '../../../config/axios';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axiosClient.post, '/tokens', payload);
    yield put(actions.loginSuccess({ ...response.data }));

    toast.success('Você fez login');

    axiosClient.defaults.headers.Authorization = `Bearer ${response.data.token}`;
  } catch (e) {
    console.error('Error', e.message);
    toast.error('Usuário ou senha inválidos.');

    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axiosClient.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
]);
