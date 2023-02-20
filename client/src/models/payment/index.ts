
class Payment {
  private _id: number | null;
  private _summ: number | null;
  private _date: string;
  private _place: number| null;
  private _clientId: number| null;

 
 constuctor(){
   this._id = null;
   this._summ = null;
   this._date = '';
   this._place = null;
   this._clientId = null;
 }

 setId(id: number) {
   this._id = id;
 }

 setSumm(summ: number){
   this._summ = summ;
 }

 setDate(date: string){
   this._date = date;
 }

 setPlace(place: number){
   this._place = place;
 }

 setClient(clientId: number){
  this._clientId = clientId
 }

 get id() {
   return this._id;
 }

 get summ() {
   return this._summ;
 }

 get date(){
   return this._date;
 }

 get place(){
   return this._place;
 }

 get clientId(){
  return this._clientId;
 }

}

export default Payment;
