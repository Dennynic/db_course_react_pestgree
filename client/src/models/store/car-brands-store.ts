import { observable, action, makeObservable } from 'mobx';
import { $host } from '../lib';
// models
import { BrandModel } from 'models';


class CarBrandsStore {
  items: BrandModel[] = [];
  
  constructor(){
    makeObservable(this, {
      items: observable,
      
      addItems: action
    });
  }

  addItems = (items: []) => {
    this.items = items;
  };

  fetchList = async () => {
    const response = await $host.get(`/auto`);
    this.addItems(response.data[0]);
  };
}

const store = new CarBrandsStore();

export default store;
