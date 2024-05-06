import * as z from 'zod';
import { pagination } from '../pagination';
import { sortParams } from '../sort-params';
import { short } from '../short';

const unitGroups = z.object({
  description: z.string(),
  id: z.string(),
  name: z.string(),
});

export const configUtilGroup = z.object({
  config_unit_group: unitGroups,
  categories: z.array(short),
});

export const configUtilGroupList = z.object({
  data: z.array(configUtilGroup),
  pagination_params: pagination,
  sort_params: sortParams,
});
