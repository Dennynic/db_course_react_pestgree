import { CarModel } from '../../models';

class CarBrandModel {
  private _id: number | null;
  private _title: string;
  private _models: CarModel[];
  private _selectedBrand: number | null;
  private _selectedModel: number | null;

  constructor() {
    this._id = null;
    this._title = '';
    this._models = [];
    this._selectedBrand = null;
    this._selectedModel = null;
  }

  setId(id: number) {
    this._id = id;
  }

  setTitle(title: string) {
    this._title = title;
  }

  setItems(item: []) {
    this._models = item;
  }

  setSelectedBrand(id: number) {
    this._selectedBrand = id;
  }
  setSelectedModel(id: number) {
    this._selectedModel = id;
  }

  get brandid() {
    return this._id;
  }

  get brand() {
    return this._title;
  }

  get models() {
    return this._models;
  }

  get selectedBrand() {
    return this._selectedBrand;
  }

  get selectedModel() {
    return this._selectedModel;
  }
}

export default CarBrandModel;
