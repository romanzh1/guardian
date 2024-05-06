import { memo, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { REQUIRED_FIELD } from 'src/constants';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { ControllerInput } from 'src/features/react-hook-form/components';
import styles from './index.module.scss';
import { Button } from '../../../../../../shared/components';

const formSchema = z.object({
  login: z.string().nonempty(REQUIRED_FIELD),
  password: z.string().nonempty(REQUIRED_FIELD),
});

type FormSchema = z.infer<typeof formSchema>;

const init: FormSchema = {
  login: '',
  password: '',
};
export const LoginForm = memo(() => {
  const methods = useForm<FormSchema>({
    values: init,
    mode: 'all',
    resolver: zodResolver(formSchema, {}, { mode: 'sync' }),
  });

  const handleFormSubmit = useCallback((value: FormSchema) => {
    console.log(value);
  }, []);

  return (
    <div className={styles.root}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
          <div className={styles.form}>
            <ControllerInput fieldName="login" helperText label="Login*" placeholder="Login" />
            <ControllerInput fieldName="password" helperText label="Password*" placeholder="Password" />
            <div className={styles.button}>
              <Button fullWidth type="submit" variant="contained">
                Login
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
});
