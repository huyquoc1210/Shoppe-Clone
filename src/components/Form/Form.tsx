import type { ReactNode } from 'react';
import {
  FormProvider,
  type FieldValues,
  type SubmitErrorHandler,
  type SubmitHandler,
  type UseFormReturn
} from 'react-hook-form';

interface Props<T extends FieldValues, C = any> {
  form: UseFormReturn<T, C>;
  onSubmit: SubmitHandler<T>;
  onError?: SubmitErrorHandler<T>;
  children: ReactNode;
  className?: string;
}

const Form = <T extends FieldValues, C = any>(props: Props<T, C>) => {
  const { form, onSubmit, onError, children, className } = props;

  return (
    <FormProvider {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className={className}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
