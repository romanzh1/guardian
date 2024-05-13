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
  email: z.string().optional(),
  websites: z.array(z.string()).optional(),
  custom_fields: z.array(z.object({
    key: z.string().nonempty(REQUIRED_FIELD),
    value: z.string().nonempty(REQUIRED_FIELD),
    secret: z.boolean().optional(),
  })).optional(),
});

type FormSchema = z.infer<typeof formSchema>;

function CustomFieldsInput(props: { fieldName: string }) {
  return null;
}

function handleFormSubmit() {
  console.log('submit');
}

export const UserInfoEdit = memo(() => {
  const { id } = useValidRouteParams('root');
  const { data, isFetching } = queries.guardian.useGetAllAccountsById({ id });

  const initData = useMemo<FormSchema>(() => {
    // Ensuring default values align with the expected types:
    // Use an empty array as default for `websites` and `custom_fields`
    // Use empty string or undefined as appropriate for optional fields
    return {
      name: data?.name ?? '',
      userName: data?.user_name ?? '',
      email: data?.email,  // can be undefined naturally if not fetched
      password: data?.password ?? '',
      websites: data?.websites ?? [],
      custom_fields: data?.custom_fields ?? [],  // default to empty array if null or undefined
    };
  }, [data, isFetching]);

  const methods = useForm<FormSchema>({
    defaultValues: initData,
    resolver: zodResolver(formSchema),
  });

  return (
      <div className={styles.root}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
            <div className={styles.form}>
              {/* Render all existing inputs, ensuring helperText handling is corrected */}
              <ControllerInput fieldName="name" label="Name*" placeholder="Enter Name" helperText={undefined} />
              <ControllerInput fieldName="userName" label="User Name*" placeholder="Enter User Name" helperText={undefined} />
              <ControllerInput fieldName="email" label="Email" placeholder="Enter Email" helperText={undefined} />
              <ControllerInput fieldName="password" label="Password*" placeholder="Enter Password" helperText={undefined} />
              <ControllerInput fieldName="websites" label="Websites" placeholder="Enter Websites" helperText={undefined} multiline />
              <CustomFieldsInput fieldName="custom_fields" />
              <div className={styles.button}>
                <Button type="submit" variant="contained">Save</Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
  );
});