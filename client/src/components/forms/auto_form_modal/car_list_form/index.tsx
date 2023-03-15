import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import CarClientService from 'store/carClientService';
import { Car } from 'models';

interface IProps {
  onChange: (car: number) => void;
  classNames?: string;
  clientCars?: Car[];
}

function CarListForm({ onChange, classNames, clientCars }: IProps) {
  const [carList, setCarList] = useState([]);
  const [carId, setCarId] = useState(0);

  useEffect(() => {
    CarClientService.findAll().then(cars => {
      const carsForList = cars.filter(
        (car: any) => !clientCars?.find(clientCar => clientCar.id == car.id),
      );

      setCarList(carsForList);
    });
  }, []);

  return (
    <Form.Group className={classNames}>
      <Form.Select
        onChange={e => setCarId(Number(e.target.value))}
        disabled={!carList?.length}
        value={carId || ''}
      >
        <option>Выберите авто</option>
        {carList?.map((car: any, key) => (
          <option key={key + '_' + car.id} value={car.id}>
            {car.brand} {car.model} {car.regNumber}
          </option>
        ))}
      </Form.Select>
      {!!carId && (
        <div>
          <button onClick={() => onChange(carId)}>ok</button>
        </div>
      )}
    </Form.Group>
  );
}

export default CarListForm;
