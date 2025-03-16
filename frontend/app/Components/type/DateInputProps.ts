export interface DateInputProps {
  name: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholderText: string;
  minDate: Date;
  maxDate?: Date;
  className: string;
  disabled?: boolean;
}

export interface CustomDatePickerProps extends DateInputProps {
  popperPlacement?: 'bottom-start' | 'bottom-end'
}
