import { CarModel } from '../../models';

class BrandModel {
  private _id: number | null;
  private _title: String;
  private _items: CarModel[];
  private _selectedBrand: number | null;
  private _selectedModel: number | null;

  constuctor() {
    this._id = null;
    this._title = '';
    this._items = [];
    this._selectedBrand = null;
    this._selectedModel = null;
  }

  setId(id: number) {
    this._id = id;
  }

  setTitle(title: String) {
    this._title = title;
  }

  setItems(items: []) {
    this._items = items;
  }

  setSelectedBrand(id: number) {
    this._selectedBrand = id;
  }
  setSelectedModel(id: number) {
    this._selectedModel = id;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get items() {
    return this._items;
  }

  get selectedBrand() {
    return this._selectedBrand;
  }

  get selectedModel() {
    return this._selectedModel;
  }
}

export default BrandModel;
