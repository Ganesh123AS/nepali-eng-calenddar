export interface NepaliCalendarProps {
    label?: string;
    name?: string;
    maxAge?: string;
    maxDate?: string;
    variant?: 'light' | 'dark';
    selectTodayDate?: boolean;
    dynamicDate?: boolean;
    size?: number;
    formValues?: Record<string, string>;
    onChange?: (event: { target: { name: string; value: { ad: string; bs: string } } }) => void;
  }
  
  export interface DateObj {
    year: number;
    month: number;
    day: number;
  }
  