import React from 'react';
import { NavLink } from 'react-router-dom';

//styles
import css from './styles.scss';

interface IProps {
  menuItems: { type: number; title: string }[];
}

export default function ReportMenu({ menuItems }: IProps) {
  return (
    <div className={css.reportMenuWrapper}>
      {menuItems?.map((menu: any, key: number) => {
        return (
          <NavLink
            to={`/reports/${menu.type}`}
            key={key}
            className="reportMenuLink"
          >
            Отчет {menu.type}{' '}
          </NavLink>
        );
      })}
    </div>
  );
}
