import { $host } from '../lib';


const findAll = async () => {
  const response = await $host.get('/auto');
  return response.data;
};

// const findById = async (id: any) => {
//   const response = await $host.get<IClient>(`/client/${id}`);
//   return response.data;
// };

// const findByTitle = async (title: string) => {
//   const response = await $host.get<Client[]>(`/client?title=${title}`);
//   return response.data;
// }

// const create = async (clientData: IClient) => {
//   const response = await $host.post<any>('/client', clientData);
//   return response.data;
// };


const ClientService = {
  findAll,
  //findById,
  //findByTitle,
  //create,
  //deleteAll
};

export default ClientService;
