import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TableHead from '../tableHead';
import Table from 'react-bootstrap/Table';
import ReportService from '../../../store/reportService';

export default function ReportDebt({ id }: { id: number }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    ReportService.getReport({ id }).then(data => setData(data));
  }, []);

  const dataObject = data?.[0] || {};

  const { clientId, debt, lastpayment, placeId, price, startDate, totalpay } =
    dataObject;
  return (
    <Table striped bordered hover>
      <TableHead type={id} />
      <tbody>
        <tr>
          <td>
            <Link to={`/clients/${clientId}`}>{clientId}</Link>
          </td>
          <td>{debt}</td>
          <td>{lastpayment}</td>
          <td>{placeId}</td>
          <td>{price}</td>
          <td>{startDate}</td>
          <td>{totalpay}</td>
        </tr>
      </tbody>
    </Table>
  );
}
