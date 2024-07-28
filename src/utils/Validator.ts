import { array, boolean, number, object, setLocale, string, type ObjectShape } from 'yup';
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

  // public dayjs() {
  //   return mixed<Dayjs>((value): value is Dayjs => DateTime.isValid(value))
  //     .nullable()
  //     .default(null);
  // }
}

const Validator = new Utils();
export default Validator;
