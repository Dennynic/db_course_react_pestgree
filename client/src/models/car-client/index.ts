
class CarClientModel {
  private _carId: number;
  private _clientId: number;
  private _firstName: string;
  private _lastName: string;
  private _secondName: string;
  private _phone: number;
  private _bDate: string;
  private _model: string;
  private _brand: string;
  private _regNumber: string;
  private _year: number;
  private _placeid: number;
  private _price: number;
  private _summPayment: number;
  private _datePayment: string;
  private _startDate: string;
  


  constructor({
    carId,
    clientId,
    firstName,
    lastName,
    secondName,
    phone,
    bDate,
    brand,
    model,
    regNumber,
    year,
    placeid,
    price,
    summPayment,
    datePayment,
    startDate,
  }: any) {
    this._carId = carId;
    this._clientId = clientId;
    this._firstName = firstName;
    this._lastName = lastName;
    this._secondName = secondName;
    this._phone = phone;
    this._bDate = bDate;
    this._model = model ;
    this._brand = brand;
    this._regNumber = regNumber;
    this._year = year;
    this._placeid = placeid;
    this._price = price;
    this._summPayment = summPayment;
    this._datePayment = datePayment;
    this._startDate = startDate;
  }

  // set id(id: number) {
  //   this._id = id;
  // }

  // set firstName(firstName: string) {
  //   this._firstName = firstName;
  // }

  // set lastName(lastName: string) {
  //   this._lastName = lastName;
  // }

  // set secondName(secondName: string) {
  //   this._secondName = secondName;
  // }
  // set phone(phone: number) {
  //   this._phone = phone;
  // }
  // set bDate(bDate: string) {
  //   this._bDate = bDate;
  // }
  // set modelAuto(modelAuto: string) {
  //   this._modelAuto = modelAuto;
  // }
  // set markAuto(markAuto: string) {
  //   this._markAuto = markAuto;
  // }
  // set autoId(autoId: string) {
  //   this._autoId = autoId;
  // }
  // set yearAuto(yearAuto: number) {
  //   this._yearAuto = yearAuto;
  // }
  // set parckPlace(parckPlace: number) {
  //   this._parkPlace = parckPlace;
  // }
  // set parckPrice(parkPrice: number) {
  //   this._parkPrice = parkPrice;
  // }
  // set summPayment(summPayment: number) {
  //   this._summPayment = summPayment;
  // }
  // set datePayment(datePayment: string) {
  //   this._datePayment = datePayment;
  // }
  // set startPayment(startPayment: string) {
  //   this._startPayment = startPayment;
  // }

  get carId() {
    return this._carId;
  }

  get clientId() {
    return this._clientId;
  }

  get firstName() {
    return this._firstName;
  }

  get lastName() {
    return this._lastName;
  }
  get secondName() {
    return this._secondName;
  }
  get phone() {
    return this._phone;
  }
  get bDate() {
    return this._bDate;
  }
  get model() {
    return this._model;
  }
  get brand() {
    return this._brand;
  }
  get regNumber() {
    return this._regNumber;
  }
  get year() {
    return this._year;
  }
  get placeid() {
    return this._placeid;
  }
  get price() {
    return this._price;
  }
  get summPayment() {
    return this._summPayment;
  }
  get datePayment() {
    return this._datePayment;
  }
  get startDate() {
    return this._startDate;
  }
  get fullName() {
    return `${this.lastName} ${this.firstName} ${this.secondName}`;
  }

  get carModel() {
    return `${this._brand} ${ this._model}`;
  }
}

export default CarClientModel;
