import React, { createContext, useState, useEffect } from 'react';
import { TrustedFormConfig, TrustedFormContextType } from './types';

const defaultConfig: Required<TrustedFormConfig> = {
  scriptSrc: 'https://api.trustedform.com/trustedform.js',
  fieldName: 'xxTrustedFormCertUrl',
  pingFieldName: 'xxTrustedFormPingUrl',
  sandbox: false,
};

export const TrustedFormContext = createContext<TrustedFormContextType>({
  certUrl: null,
  isLoading: true,
  error: null,
});

export const TrustedFormProvider: React.FC<{ config?: Partial<TrustedFormConfig>; children: React.ReactNode }> = ({ 
  config = {}, 
  children 
}) => {
  const [certUrl, setCertUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const mergedConfig: Required<TrustedFormConfig> = { ...defaultConfig, ...config };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = mergedConfig.scriptSrc;
    script.async = true;
    script.onerror = () => {
      setError(new Error('Failed to load TrustedForm script'));
      setIsLoading(false);
    };

    document.body.appendChild(script);

    const checkForCertUrl = setInterval(() => {
      const certUrl = (window as any)[mergedConfig.fieldName];
      if (certUrl) {
        setCertUrl(certUrl);
        setIsLoading(false);
        clearInterval(checkForCertUrl);
      }
    }, 100);

    return () => {
      clearInterval(checkForCertUrl);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <TrustedFormContext.Provider value={{ certUrl, isLoading, error }}>
      {children}
    </TrustedFormContext.Provider>
  );
};