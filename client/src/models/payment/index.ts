class Payment {
  private _id: number | null;
  private _summ: number | null;
  private _date: string;
  private _placeId: number | null;
  private _clientId: number | null;

  constructor({ id, summ, date, placeId, clientId }: any) {
    this._id = id;
    this._summ = summ;
    this._date = date;
    this._placeId = placeId;
    this._clientId = clientId;
  }

  setId(id: number) {
    this._id = id;
  }

  setSumm(summ: number) {
    this._summ = summ;
  }

  setDate(date: string) {
    this._date = date;
  }

  setPlace(placeId: number) {
    this._placeId = placeId;
  }

  setClient(clientId: number) {
    this._clientId = clientId;
  }

  get id() {
    return this._id;
  }

  get summ() {
    return this._summ;
  }

  get date() {
    return this._date;
  }

  get placeId() {
    return this._placeId;
  }

  get clientId() {
    return this._clientId;
  }
}

export default Payment;
