import { useContext } from 'react';
import { TrustedFormContext } from './TrustedFormProvider';

export const useTrustedForm = () => {
  return useContext(TrustedFormContext);
};