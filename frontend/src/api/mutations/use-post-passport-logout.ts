import { buildMutationWithInvalidation, RequestError } from 'src/libs';
import * as api from '../requests';

const { send } = api.passport.logout;
type Data = Awaited<ReturnType<typeof send>>;
type Err = RequestError<Data>;
type Variables = undefined;
const { config: personalData } = api.passport.personalData;

export const usePostPassportLogout = buildMutationWithInvalidation<Data, Err, Variables>({
  keys: [[personalData.url, personalData.method]],
  send,
});
