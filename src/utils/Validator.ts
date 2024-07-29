import { array, boolean, number, object, setLocale, date, string, type ObjectShape } from 'yup';
import RegExps from './RegExps';
// import type { Dayjs } from 'dayjs';
// import DateTime from './DateTime';

class Utils {
  constructor() {
    setLocale({
      mixed: {
        required: 'validator.mixed.required',
        notType: 'validator.mixed.type'
      },
      string: {
        max: 'validator.string.max'
      }
    });
  }

  public shape<T extends ObjectShape>(additions: T, excludes?: [string, string][]) {
    return object().shape<T>(additions, excludes);
  }

  public string() {
    return string().max(255).trim().default('');
  }

  public boolean() {
    return boolean().default(false);
  }

  public number() {
    return number().default(0);
  }

  public array() {
    return array().default([]);
  }

  public email() {
    return this.string().matches(RegExps.email, 'validator.email.invalid');
  }

  public phone() {
    return string().max(20, 'Độ dài tối đa là 20 ký tự').trim().default('');
  }

  public birthday() {
    return date()
      .max(new Date(), 'Hãy chọn một ngày trong quá khứ')
      .default(new Date(1970, 0, 1));
  }

  public avatar() {
    return string().max(1000, 'Độ dài tối đa là 1000 ký tự').trim().default('');
  }

  // public dayjs() {
  //   return mixed<Dayjs>((value): value is Dayjs => DateTime.isValid(value))
  //     .nullable()
  //     .default(null);
  // }
}

const Validator = new Utils();
export default Validator;
