import { memo, useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { queries } from 'src/api';
import styles from './index.module.scss';
import { ControllerInput } from '../../../../../../features/react-hook-form/components';
import { Button } from '../../../../../../shared/components';
import { REQUIRED_FIELD } from '../../../../../../constants';
import { useValidRouteParams } from '../../../../../../libs';

const formSchema = z.object({
  name: z.string().nonempty(REQUIRED_FIELD),
  userName: z.string().nonempty(REQUIRED_FIELD),
  password: z.string().nonempty(REQUIRED_FIELD),
});

type FormSchema = z.infer<typeof formSchema>;

export const UserInfoEdit = memo(() => {
  const { id } = useValidRouteParams('root');
  const { data, isFetching } = queries.guardian.useGetAllAccountsById({ id });
  const initData = useMemo<FormSchema>(() => {
    return {
      name: data && !isFetching ? data.name : '',
      userName: data && !isFetching ? data.user_name : '',
      email: data && !isFetching ? data.email : '',
      password: data && !isFetching ? data.password : '',
    };
  }, [data, isFetching]);

  const methods = useForm<FormSchema>({
    values: initData,
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
            <ControllerInput fieldName="name" helperText label="Name*" placeholder="Login" />
            <ControllerInput fieldName="userName" helperText label="User Name*" placeholder="Password" />
            <ControllerInput fieldName="email" helperText label="Email*" placeholder="Password" />
            <ControllerInput fieldName="password" helperText label="Password*" placeholder="Password" />
            <div className={styles.button}>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
});
