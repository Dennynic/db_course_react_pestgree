
class Place {
  private _id: number | null;
  private _price: number | null;
  private _isVacant: boolean;
  private _startDate: string;
  private _autoId: number| null;

 
 constuctor(){
   this._id = null;
   this._price = null;
   this._startDate = '';
   this._isVacant = true;
   this._autoId = null;
 }

 setId(id: number) {
   this._id = id;
 }

 setPrice(price: number){
   this._price = price;
 }

 setStartDate(date: string){
   this._startDate = date;
 }

 setIsVacant(isVacant: boolean){
   this._isVacant = isVacant;
 }

 setAuto(autoId: number){
  this._autoId = autoId
 }

 get id() {
   return this._id;
 }

 get price() {
   return this._price;
 }

 get startDate(){
   return this._startDate;
 }

 get isVacant(){
   return this._isVacant;
 }

 get autoId(){
  return this._autoId;
 }

}

export default Place;
