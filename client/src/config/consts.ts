export const MAIN_PAGE = `/`;
//export const CAR_PAGE = `/cars`;
export const PLACE_PAGE = `/places`;
export const CLIENT_PAGE = `/clients`;
export const PAYMENT_PAGE = `/payments`;
export const REPORT_PAGE = `/reports`;
export const REPORT_MENU = [
  {
    type: 1,
    title: 'Клиент больше всего задолжал автостоянке и его последний платеж',
  },

  {
    type: 2,
    title: 'Сколько автомобилей имеют более одного хозяина',
  },
  {
    type: 3,
    title:
      'Вывести автомобиль который имеет самый маленький долг за указанный период',
  },
  {
    type: 4,
    title: 'Вывести сумму долга по всем клиентам за указанный период',
  },
  {
    type: 5,
    title:
      'Вывести все номера и владельцев автомобилей, относящиеся к указанной пользователем марки автомобиля',
  },
];
