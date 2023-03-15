import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import ReportService from '../../../store/reportService';
import TableHead from '../tableHead';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

import css from './styles.scss';

interface IMinOrder {
  placeId: number;
  carid: number;
  clientId: number;
  regNumber: string;
  price: number;
  totalpay: number;
  startDate: string;
  debt: number;
}

export default function ReportMinDebt({ id }: { id: number }) {
  const [data, setData] = useState<IMinOrder[]>([]);
  const [startDate, setStartDate] = useState(
    moment('2000/01/01').format('YYYY-MM-DD'),
  );
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));

  const getData = (sentData: { id: number; data?: any }) => {
    ReportService.getReport(sentData).then(data => setData(data));
  };

  console.log('Data', data);

  return (
    <div className={css.mindebtWrapper}>
      <div className={css.datePickerWrapper}>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Начальная дата</Form.Label>
          <Form.Control
            onChange={event =>
              setStartDate(moment(event.target.value).format('YYYY-MM-DD'))
            }
            value={startDate}
            type="date"
            required
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Конечная дата</Form.Label>
          <Form.Control
            onChange={event =>
              setEndDate(moment(event.target.value).format('YYYY-MM-DD'))
            }
            value={endDate}
            type="date"
            required
          />
        </Form.Group>
        <div className={css.buttonWrapper}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => getData({ id, data: { startDate, endDate } })}
          >
            Сформировать
          </Button>
        </div>
      </div>
      <hr />
      <div className={css.tableWrapper}>
        <Table striped bordered hover className={css.minDebtTable}>
          <TableHead type={id} />
          <tbody>
            {data.length ? (
              data.map((item, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{item.placeId}</td>
                  <td>
                    <Link to={`/clients/${item.clientId}`}>
                      {item.clientId}
                    </Link>
                  </td>
                  <td>{item.carid}</td>
                  <td>{item.regNumber}</td>

                  <td>{item.price}</td>
                  <td>{item.startDate}</td>
                  <td>{item.totalpay}</td>
                  <td>{item.debt}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9}>Необходимо сформировать отчет</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
