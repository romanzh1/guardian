import { buildMutationWithInvalidation, RequestError } from 'src/libs';
import * as api from '../../requests';

const { send } = api.serviceConfigUnit.patch;
type Data = Awaited<ReturnType<typeof send>>;
type Variables = Parameters<typeof send>[0];
type Err = RequestError<api.serviceConfigUnit.patch.NegativeResponse>;
const { config: getFormList } = api.configUnit.getList;

export const usePatchServiceConfigUnit = buildMutationWithInvalidation<Data, Err, Variables>({
  keys: [[getFormList.url, getFormList.method]],
  send,
});
