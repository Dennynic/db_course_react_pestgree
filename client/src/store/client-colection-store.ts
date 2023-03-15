import { observable, action, makeObservable } from 'mobx';
import { $host, createObject } from './lib';
import { CarClientModel, Client } from '../models';

class ClientCollectionStore {
  carClients: CarClientModel[] = [];
  client: Client = new Client();

  constructor() {
    makeObservable(this, {
      carClients: observable,
      client: observable,
      setClient: action,
      setCarClient: action,
    });
  }

  async fetchAllClientInfo() {
    const response = await $host.get<CarClientModel[]>(`/client/all`);
    const model = response.data.map(item => {
      return createObject(item, CarClientModel) as CarClientModel;
    });

    this.setCarClient(model);
  }

  async create(clientData: Client) {
    const response = await $host.post<Client>('/client', clientData);
    if (response.data) this.fetchAllClientInfo();
  }

  async update(clientData: Client) {
    const response = await $host.put<Client>('/client', clientData);
    if (response.data) {
      this.setClient(clientData, this.client);
    }
  }

  async findByIdWithCars(id: number) {
    const response = await $host.get<Client[]>(`/client/all/${id}`);
    const data = response.data[0];
    this.setClient(data);
  }

  setCarClient(model: CarClientModel[]) {
    this.carClients = model;
  }

  setClient(data: any, oldClient?: Client) {
    let client = oldClient || new Client();

    client.setId(data.id!);
    client.setFirstName(data.firstName!);
    client.setLastName(data.lastName!);
    client.setSecondName(data.secondName!);
    client.setPhone(data.phone!);
    client.setbDate(data.bDate!);
    client.setCars(data.cars!);
    this.client = client;
  }
}

const store = new ClientCollectionStore();

export default store;
