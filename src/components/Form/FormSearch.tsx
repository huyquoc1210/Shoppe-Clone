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
  placeholder: string;
  className: string;
};

const FormSearch = <T extends FieldValues>(props: Props<T>) => {
  const { name, type, className, placeholder, ...rest } = props;
  const { control } = useFormContext();

  const {
    field: { ref, ...others }
  } = useController({
    name,
    control
  });

  return (
    <input
      type={type}
      className={className}
      placeholder={placeholder}
      {...others}
      {...rest}
    />
  );
};

export default FormSearch;
