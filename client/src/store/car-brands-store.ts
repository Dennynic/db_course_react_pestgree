import { observable, action, makeObservable } from 'mobx';

import { $host } from './lib';
// models
import { CarBrandModel } from 'models';

class CarBrandsStore {
  models: CarBrandModel[] = [];

  constructor() {
    makeObservable(this, {
      models: observable,
      addItems: action,
    });
  }

  fetchList = async () => {
    const response = await $host.get(`/auto`);
    this.addItems(response.data[0]);
    return response;
  };

  addItems = (items: []) => {
    this.models = items;
  };

  addBrand = async (value: string) => {
    try {
      await $host.post(`/brand`, { title: value }).then(() => this.fetchList());
      return true;
    } catch (error) {
      console.log("Error in addBrand")
      return Promise.reject(error);
    }
  };

  addModel = async (value: string, _id?: number) => {
    if(!_id){
      throw new Error('Need brand');
    }
    try {
      await $host.post(`/model`, { title: value, brandId: _id }).then(() => this.fetchList());
      return true;
    } catch (error) {
      console.log("Error in addModel")
      return Promise.reject(error);
    }
  };
}

const store = new CarBrandsStore();

export default store;
