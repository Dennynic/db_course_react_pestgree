import Car from 'models/car';
class Client {
  private _id: number | null;
  private _firstName: string;
  private _lastName: string;
  private _secondName: string;
  private _phone: string;
  private _bDate: string;
  private _cars: Car[];

  constructor() {
    this._id = null;
    this._firstName = '';
    this._lastName = '';
    this._secondName = '';
    this._phone = '';
    this._bDate = '';
    this._cars = [];
  }

  setId(id: number) {
    this._id = id;
  }

  setFirstName(first_name: string) {
    this._firstName = first_name;
  }

  setLastName(last_name: string) {
    this._lastName = last_name;
  }

  setSecondName(second_name: string) {
    this._secondName = second_name;
  }

  setPhone(phone: string) {
    this._phone = phone;
  }

  setbDate(birth_date: string) {
    this._bDate = birth_date;
  }

  setCars(cars: Car[]) {
    const carsArr = cars.map((car) => {
      const _car = new Car({...car});
      return _car;
    })
    this._cars = carsArr;
  }

  get id() {
    return this._id;
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

  get cars() {
    return this._cars;
  }

  get fullName() {
    return `${this.lastName} ${ this.firstName} ${this.secondName}`;
  }
}

export default Client;
