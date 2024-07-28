import type { HTMLInputTypeAttribute } from 'react';
import {
  useController,
  useFormContext,
  type FieldValues,
  type Path
} from 'react-hook-form';

type Props<T extends FieldValues> = {
  name: Path<T>;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
};

const FormInput = <T extends FieldValues>(props: Props<T>) => {
  const { name, type, className, placeholder, ...rest } = props;
  const { control } = useFormContext<T>();

  const {
    field: { ref, ...others },
    fieldState: { error }
  } = useController({
    name,
    control
  });

  return (
    <div className='mt-3'>
      <input
        type={type}
        className={className}
        placeholder={placeholder}
        {...others}
        {...rest}
      />
      <div className='mt-1 text-red-600 min-h-[1rem] text-sm'>
        {error && error?.message}
      </div>
    </div>
  );
};

export default FormInput;
