import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

export interface IMenuItem {
  title: string;
  itemLink: string;
}

export interface IProps {
  items: IMenuItem[];
}

function NavMenu({ items }: IProps) {
  return (
    <>
      {items.map(({ itemLink, title }: IMenuItem) => (
        <Nav.Item  key={itemLink}>
          <NavLink  to={itemLink}>
            {title}
          </NavLink>
        </Nav.Item>
      ))}
    </>
  );
}

export default NavMenu;
