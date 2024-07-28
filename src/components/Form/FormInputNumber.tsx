import { type ChangeEvent, type InputHTMLAttributes } from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  classNameInput?: string;
  classNameError?: string;
  onSelect?: (price: ChangeEvent<HTMLInputElement>) => void;
}

const FormInputNumber = (props: Props) => {
  const {
    name,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    type,
    className,
    onSelect,
    ...rest
  } = props;
  const { control } = useFormContext();
  const {
    field: { onChange, value, ref },
    fieldState: { error }
  } = useController({
    name,
    control
  });

  // const [localValue, setLocalValue] = useState<string>(value);

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { value: valueFormInput } = event.target;
  //   const numberCondition = (type === 'number' && /^\d+$/.test(value)) || valueFormInput === '';
  //   if (numberCondition || type !== 'number') {
  //     // Cập nhật localValue state
  //     setLocalValue(valueFormInput);
  //     onChange(value);
  //     // Thực thi onChange callback từ bên ngoài truyền vào props
  //     onChange && onChange(event);
  //   }
  // };

  return (
    <div className={className}>
      <input
        onChange={(price: ChangeEvent<HTMLInputElement>) => {
          onChange(price);
          onSelect?.(price);
        }}
        ref={ref}
        type={type}
        className={classNameInput}
        value={value}
        {...rest}
      />
      <div className={classNameError}>{error && error?.message}</div>
    </div>
  );
};

export default FormInputNumber;
