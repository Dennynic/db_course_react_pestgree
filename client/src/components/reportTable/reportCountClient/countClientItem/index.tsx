import React from 'react';
import { Link } from 'react-router-dom';
import { ICountClientItem } from '../../reportCountClient';

interface IProps {
  items: ICountClientItem;
}

export default function CountClientItem({ items }: IProps) {
  const { autoId, regNumber, totalclient, clients } = items;

  return (
    <tr>
      <td>{autoId}</td>
      <td>{regNumber}</td>
      <td>{totalclient}</td>
      <td>
        {clients?.length &&
          clients.map((client, key) => {
            return (
              <p key={key}>
                <Link to={`../clients/${client.id}`}>
                  {client.lastName} {client.firstName} {client.secondName}
                </Link>
              </p>
            );
          })}
      </td>
    </tr>
  );
}
