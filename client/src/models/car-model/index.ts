import { observable } from 'mobx';


class CarModel {
  @observable private _id: number | null;
  @observable private _title: String;
  
  

  constuctor(){
    this._id = null;
    this._title = '';
  }

  setId(id: number) {
    this._id = id;
  }

  setTitle(title: String){
    this._title = title;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

}

export default CarModel;
