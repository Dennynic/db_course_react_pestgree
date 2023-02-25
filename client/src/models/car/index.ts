import { $host } from '../../store/lib';
import {Place} from '../../models'
class Car {
   private _id: number ;
   private _regNumber: string;
   private _year: string ;
   //private _brandId: string;
   private _brand: string;
   //private _modelId: string;
   private _model: string;
   private _place: Place;

  
  constructor({id, regNumber, year, brand, model, place, price, startDate}: any){
    this._id = id;
    this._regNumber = regNumber;
    this._year = year;
    this._brand = brand;
    this._model = model;
    this._place = new Place({price, place, startDate, autoId:id});
  }

  set id(id: number) {
    this._id = id;
  }

  set regNumber(regNumber: string){
    this._regNumber = regNumber;
  }

  set year(year: string){
    this._year = year;
  }

  set brand(brand: string){
    this._brand = brand;
  }

  set model(model: string){
    this._model = model;
  }

  set place(place: Place){
    this._place = place;
  }

  get id() {
    return this._id;
  }

  get regNumber() {
    return this._regNumber;
  }

  get year(){
    return this._year;
  }

  get brand(){
    return this._brand;
  }

  get model(){
    return this._model;
  }

  get place(){
    return this._place;
  }

  get fullModel(){
    return `${this._brand} ${this._model}`;
  }

}

export default Car;
