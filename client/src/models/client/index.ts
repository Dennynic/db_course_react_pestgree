import { observable } from 'mobx';

export interface IClient {
  id?: any | null;
  first_name: string;
  last_name: string;
  second_name: string;
  phone: string;
  birth_date: string;
}

@observable
class Client {
  private _id: number | null;
  private _firstName: String | null;
  private _lastName: String | null;
  private _secondName: String | null;
  private _phone: String | null;
  private _bDate: String | null;

  constuctor() {
    this._id = null;
    this._firstName = null;
    this._lastName = null;
    this._secondName = null;
    this._phone = null;
    this._bDate = null;
  }

  setId(id: number) {
    this._id = id;
  }

  setFirstName(first_name: String) {
    this._firstName = first_name;
  }

  setLastName(last_name: String) {
    this._lastName = last_name;
  }

  setSecondName(second_name: String) {
    this._secondName = second_name;
  }

  setPhone(phone: String) {
    this._phone = phone;
  }

  setbDate(birth_date: String) {
    this._bDate = birth_date;
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
}

export default Client;
