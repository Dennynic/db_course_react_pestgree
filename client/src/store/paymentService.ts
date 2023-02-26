import { $host } from './lib';
import { Payment } from '../models';

const addPayment = async (data: any) => {
  const response = await $host.post<any>('/payment', data);
  return response.data;
};

const findAll = async () => {
  const response = await $host.get<Payment[]>('/payment');
  return response.data;
};

const findByClientId = async (id: any) => {
  const response = await $host.get(`/payment/client/${id}`);
  const [data] = response.data[0] as Payment[];
  return new Payment(data);
};

const PaymentService = {
  addPayment,
  findAll,
  findByClientId,
  //deleteAll
};

export default PaymentService;
