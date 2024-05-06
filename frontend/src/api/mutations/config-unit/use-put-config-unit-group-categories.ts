import { buildMutationWithInvalidation, RequestError } from 'src/libs';
import * as api from '../../requests';

const { send } = api.configUnitGroup.putCategories;
type Data = Awaited<ReturnType<typeof send>>;
type Variables = Parameters<typeof send>[0];
type Err = RequestError<api.configUnit.put.NegativeResponse>;
const { config: getFormList } = api.configUnitGroup.getList;

export const usePutConfigGroupCategories = buildMutationWithInvalidation<Data, Err, Variables>({
  keys: [[getFormList.url, getFormList.method]],
  send,
});
