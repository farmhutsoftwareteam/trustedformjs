export interface TrustedFormConfig {
    scriptSrc?: string;
    fieldName?: string;
    pingFieldName?: string;
    sandbox?: boolean;
  }
  
  export interface TrustedFormContextType {
    certUrl: string | null;
    isLoading: boolean;
    error: Error | null;
  }