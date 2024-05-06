import * as z from 'zod';
import { Request, BACK_ERROR } from 'src/libs';
import { isDevMode } from 'src/shared/utils';

const request = new Request();

request.validate = (data, schema: z.ZodTypeAny) => {
  try {
    schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const myError = new z.ZodError([]);
      error.issues.forEach(issue => {
        if (issue.code === 'unrecognized_keys') {
          const path = issue.path.join('.');
          const keys = issue.keys.join(', ');
          // eslint-disable-next-line no-console
          console.log(`В ответе на запрос появились новые поля. Путь="${path}", поля=[${keys}]`);
        } else {
          myError.addIssue(issue);
        }
      });
      if (!myError.isEmpty) throw myError;
    }
  }
};

request.backErrorHandler = query => {
  if (BACK_ERROR[query.status]) {
    return `${BACK_ERROR[query.status]} - ${query.requestConfig?.method} ${query.requestConfig?.url}`;
  }

  return undefined;
};

// api.host = process.env.REACT_APP_API_TARGET as string;

/* request.middleware.push(_query => {
  // eslint-disable-next-line no-console
  // console.log(_query);
}); */

// if (isDevMode) {
//   request.delay = 500;
//   request.enabledMock = false;

//   request.preprocessor.push(config => {
//     return { ...config, headers: { 'X-User-Id': 'x4', ...config.headers } };
//   });
// }

if (isDevMode) {
  request.enabledMock = true;
  request.delay = Number(process.env.REACT_APP_REQUEST_DELAY) || undefined;
}
export { request };
