class CarModel {
  private _id: number | null;
  private _title: string;

  constuctor() {
    this._id = null;
    this._title = '';
  }

  setId(id: number) {
    this._id = id;
  }

  setTitle(title: string) {
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
