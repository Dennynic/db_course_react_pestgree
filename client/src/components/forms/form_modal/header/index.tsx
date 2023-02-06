import React, { ReactNode } from 'react';
import Modal from 'react-bootstrap/Modal';
import cn from 'classnames';

import css from './styles.scss';

interface IProps {
  children?: ReactNode;
  title?: string;
  titleWrapClassName?: string;
  className?: string;
}

function Header({ title, children, className, titleWrapClassName }: IProps) {
  const rootClassNames = cn(css.header, className);
  const titleWrapClassNames = cn(css.titleWrap, titleWrapClassName);
  return (
    <div className={rootClassNames}>
      <div className={titleWrapClassNames}>
        <Modal.Header closeButton>
          <Modal.Title className={css.title}>{title}</Modal.Title>
        </Modal.Header>
      </div>

      {children}
    </div>
  );
}

export default Header;
