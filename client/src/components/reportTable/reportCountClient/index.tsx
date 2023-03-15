import React, { useState, useEffect } from 'react';
import ReportService from '../../../store/reportService';
import CountClientItem from './countClientItem';
import TableHead from '../tableHead';
import Table from 'react-bootstrap/Table';
import { Client } from 'models';

export interface ICountClientItem {
  autoId: number;
  regNumber: number;
  totalclient: number;
  clients: Client[];
}

export default function ReportCountClient({ id }: { id: number }) {
  const [data, setData] = useState<ICountClientItem[]>([]);

  useEffect(() => {
    ReportService.getReport({ id }).then(data => setData(data));
  }, []);

  const dataObject = data || [];
  const totalCars = data.length;

  return (
    <Table striped bordered hover>
      <TableHead type={id} />
      <tbody>
        {dataObject?.map((carItem: ICountClientItem) => (
          <CountClientItem key={carItem.autoId} items={carItem} />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4}>Итого:{totalCars} автомобиля</td>
        </tr>
      </tfoot>
    </Table>
  );
}
