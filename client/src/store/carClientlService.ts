import { $host } from './lib';
import { Car } from '../models';

const findAll = async () => {
  const response = await $host.get('/auto');
  return response.data;
};

const findCarById = async (id: any) => {
  const response = await $host.get(`auto/car/${id}`);
  const [data]  = response.data[0] as Car[];
  return new Car(data);
};


const createCar = async (carData: any) => {
  const response = await $host.post<any>('/auto', carData);
  return response.data;
};

const update = async({id, regNumber, year, carBrandId, carModelId, place, startDate }: any) => {
  try{
    const response = await $host.put<Car>(`auto/car/${id}`, {regNumber, year, carBrandId, carModelId, place, startDate}) 
    console.log("Car update response", response);
  }catch(error){
    console.log(error)
  }
  
}

const CarClientService = {
  findAll,
  findCarById,
  update,
  createCar,
  //deleteAll
};

export default CarClientService;
