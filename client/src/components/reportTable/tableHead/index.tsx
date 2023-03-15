import React from 'react';

export default function TableHead({ type }: any) {
  const theadItem = getThead(type);

  return (
    <thead>
      <tr>
        {theadItem.map((item, key) => (
          <th key={key}>{item}</th>
        ))}
      </tr>
    </thead>
  );
}

function getThead(id: number) {
  switch (id) {
    case 1:
      return [
        'Клиент id',
        'Долг',
        'Последний платеж',
        'Место',
        'Стоимость/мес.',
        'Дата аренды',
        'Всего оплачено',
      ];
      break;
    case 2:
      return ['id Авто', 'Авто Номер', 'Клиентов', 'ФИО клиента'];
      break;
    case 3:
      return [
        '№',
        'Место',
        'Клиент id',
        'Авто id',
        'Номер Авто',
        'Цена места',
        'Дата аренды',
        'Всего оплачено',
        'Долг за период',
      ];
      break;
    default:
      return [];
  }
}
