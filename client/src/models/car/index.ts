
class Car {
   private _id: number ;
   private _regNumber: string;
   private _year: number ;
   private _brand: string;
   private _model: string;

  
  constructor({id, regNumber, year, brand, model}: any){
    this._id = id;
    this._regNumber = regNumber;
    this._year = year;
    this._brand = brand;
    this._model = model;
  }

  set id(id: number) {
    this._id = id;
  }

  set regNumber(regNumber: string){
    this._regNumber = regNumber;
  }

  set year(year: number){
    this._year = year;
  }

  set brand(brand: string){
    this._brand = brand;
  }

  set model(model: string){
    this._model = model;
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

  get fullModel(){
    return `${this._brand} ${this._model}`;
  }

}

export default Car;
