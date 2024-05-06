import { CUSTOM_ERRORS, error } from 'src/libs';

const ERROR_START = 'row';
export const uploadErrorHandler = (res: string) => {
  if (ERROR_START === res.slice(0, 3)) {
    const errorRow = res.split(':')[0].split(' ')[1];
    const errorText = res.split(':')[1].trimStart();
    error(`В ${errorRow} ряду ${CUSTOM_ERRORS[errorText].toLowerCase()}`);
  } else error(CUSTOM_ERRORS[res]);
};
