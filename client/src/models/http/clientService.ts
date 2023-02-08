import { $host } from '../lib';

import { IClient } from 'models/client';

const findAll = async () => {
  const response = await $host.get<IClient[]>('/client');
  return response.data;
};

const findById = async (id: any) => {
  const response = await $host.get<IClient>(`/client/${id}`);
  return response.data;
};

// const findByTitle = async (title: string) => {
//   const response = await $host.get<Client[]>(`/client?title=${title}`);
//   return response.data;
// }

const create = async (clientData: IClient) => {
  const response = await $host.post<any>('/client', clientData);
  return response.data;
};

const update = async (
  id: any,
  { first_name, last_name, second_name, phone, birth_date }: IClient,
) => {
  const response = await $host.put<any>(`/client/${id}`, {
    first_name,
    last_name,
    second_name,
    phone,
    birth_date,
  });
  return response.data;
};

const deleteById = async (id: any) => {
  const response = await $host.delete<any>(`/client/${id}`);
  return response.data;
};

const ClientService = {
  findAll,
  findById,
  //findByTitle,
  create,
  update,
  deleteById,
  //deleteAll
};

export default ClientService;
