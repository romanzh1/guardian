import * as z from 'zod';

export const getDefinedParams = (params: Record<string, any>, schema: z.AnyZodObject): Record<string, any> => {
  const newRouteParams: Record<string, any> = { ...params };

  Object.entries(schema.shape).forEach(([key, value]) => {
    const defaultValue = (value as z.ZodTypeAny).safeParse(undefined);
    if (defaultValue.success && defaultValue.data === newRouteParams[key]) delete newRouteParams[key];
  });

  return newRouteParams;
};
