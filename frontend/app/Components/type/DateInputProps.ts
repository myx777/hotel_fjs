interface DateInputProps {
    name: string;
    selected: Date | null;
    onChange: (date: Date | null) => void;
    placeholder?: string;
    className?: string;
  }