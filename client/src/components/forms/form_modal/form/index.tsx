import React, { ReactNode, FormEvent } from 'react';
import Footer from '../footer';
import css from './styles.scss';
import cn from 'classnames';

interface IProps {
  onClose: () => void;
  onSubmit: (event: FormEvent) => void;
  children?: ReactNode;
  footerWrapClassName?: string;
}

function Form({ onClose, onSubmit, children, footerWrapClassName }: IProps) {
  return (
    <form onSubmit={onSubmit} className={css.form}>
      <div className={css.childrenWrap}>{children}</div>
      <div className={cn(css.footerWrap, footerWrapClassName)}>
        <Footer onClose={onClose} />
      </div>
    </form>
  );
}

export default Form;
