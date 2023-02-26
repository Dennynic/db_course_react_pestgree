import { observable, action, makeObservable } from 'mobx';
import { $host } from './lib';
import { Place } from '../models';

class PlaceStore {
  places: Place[] = [];

  constructor() {
    makeObservable(this, {
      places: observable,
      addToPlaces: action,
    });
  }

  addToPlaces = (items: Place[]) => {
    this.places = items;
  };

  findAll = async () => {
    const response = await $host.get<Place[]>('/place');

    this.addToPlaces(response.data);
  };

  findCarById = async (id: any) => {
    const response = await $host.get(`/place/${id}`);
    const [data] = response.data[0] as Place[];
    return new Place(data);
  };

  createRandom = async () => {
    const priceArr = [100, 200, 300, 400, 500];
    const priceIndex = Math.floor(Math.random() * priceArr.length);
    const placeData = {
      price: priceArr[priceIndex],
      startDate: null,
      isVacant: true,
    };
    const response = await $host.post<Place>(`/place`, placeData);
    if (response.status == 200) {
      this.findAll().then();
    }
  };
}

const store = new PlaceStore();

export default store;
