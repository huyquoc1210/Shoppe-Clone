import InputNumber, {
  type InputNumberProps
} from 'components/Form/InputNumber';
import { useState, type ChangeEvent, type FocusEvent } from 'react';

interface QuantityControllerProps extends InputNumberProps {
  max?: number;
  onIncrease?: (value: number) => void;
  onDecrease?: (value: number) => void;
  onType?: (value: number) => void;
  classNameWrapper?: string;
  onFocusOut?: (value: number) => void;
}

const QuantityController = (props: QuantityControllerProps) => {
  const {
    max,
    onIncrease,
    onDecrease,
    onType,
    classNameWrapper = 'ml-10',
    value,
    onFocusOut,
    ...rest
  } = props;
  const [localValue, setLocalValue] = useState<number>(Number(value || 0));

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let _value = +event.target.value;

    if (max !== undefined && _value > max) {
      _value = max;
    } else if (_value < 1) {
      _value = 1;
    }

    onType && onType(_value);
    setLocalValue(_value);
  };

  const handleIncrease = () => {
    let _value = Number(value || localValue) + 1;

    if (max !== undefined && _value > max) {
      _value = max;
    }

    onIncrease && onIncrease(_value);
    setLocalValue(_value);
  };

  const handleDecrease = () => {
    let _value = Number(value || localValue) - 1;

    if (_value < 1) {
      _value = 1;
    }

    onDecrease && onDecrease(_value);
    setLocalValue(_value);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    onFocusOut && onFocusOut(Number(event.target.value));
  };

  return (
    <div className={`${classNameWrapper} items-center flex`}>
      <button
        onClick={handleDecrease}
        className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
        </svg>
      </button>
      <InputNumber
        value={value || localValue}
        className=''
        classNameError='hidden'
        onChange={handleChange}
        onBlur={handleBlur}
        classNameInput='h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none'
        {...rest}
      />
      <button
        onClick={handleIncrease}
        className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 4.5v15m7.5-7.5h-15'
          />
        </svg>
      </button>
    </div>
  );
};

export default QuantityController;
