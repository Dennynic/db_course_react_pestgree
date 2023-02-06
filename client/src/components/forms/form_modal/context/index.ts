import { createContext } from 'react';

interface IFormModalContext {
  onSubmit?: () => void;
}

const FormModalContext = createContext<IFormModalContext>({});

export default FormModalContext;
