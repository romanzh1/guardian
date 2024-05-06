/* eslint-disable no-undef */
import * as z from 'zod';

// type AddPrefix<S extends string, Prefix extends string> = Prefix extends '' ? S : `${Prefix}.${S}`;
// type GetFirstSegment<S extends string> = S extends `${infer K}.${string}` ? K : S;
// type GetSegmentResidue<S extends string> = S extends `${string}.${infer K}` ? K : S;

// type IsLastSegment<S extends string> = S extends `${string}.${string}` ? false : true;

// type TestFirstSegment = GetFirstSegment<'234.456.6867'>;
// type TestSegmentResidue = GetSegmentResidue<'234.456.6867'>;

// eslint-disable-next-line no-use-before-define
type Route = { name: string; path: string; children?: Routes };
type Routes = ReadonlyArray<Route>;
// type Children = { children: Routes };

export type MutableRoutes<T> = T extends ReadonlyArray<any>
  ? { -readonly [K in keyof T]: MutableRoutes<T[K]> }
  : T extends {}
  ? { -readonly [K in keyof T]: K extends 'children' ? MutableRoutes<T[K]> : T[K] }
  : never;

// type TestMutableRoutes = MutableRoutes<typeof routes>;

// type GetNodeNameList<T, Prefix extends string = ''> = T extends Routes
//   ? {
//       [K in keyof T]: T[K] extends Route
//         ? T[K] extends Children
//           ? AddPrefix<T[K]['name'], Prefix> | GetNodeNameList<T[K]['children'], AddPrefix<T[K]['name'], Prefix>>
//           : AddPrefix<T[K]['name'], Prefix>
//         : undefined;
//     }[number]
//   : T;

type JoinSegments<F extends string, S extends string> = F extends '' ? S : `${F}.${S}`;

type ReplaceName<T extends { name: string }, NewName extends string> = Omit<T, 'name'> & { name: NewName };

type DeleteChildren<T extends { children: Routes }> = Omit<T, 'children'>;

type FlatRoutes<RouteList extends any, Name extends string = ''> = RouteList extends readonly [infer F, ...infer R]
  ? F extends { name: string }
    ? F extends { children: Routes }
      ? [
          ReplaceName<DeleteChildren<F>, JoinSegments<Name, F['name']>>,
          ...FlatRoutes<F['children'], JoinSegments<Name, F['name']>>,
          ...FlatRoutes<R, Name>,
        ]
      : [ReplaceName<F, JoinSegments<Name, F['name']>>, ...FlatRoutes<R, Name>]
    : never
  : RouteList;

type FindRoute<R extends ReadonlyArray<{ name: string }>, Name extends string> = {
  [K in keyof R]: R[K] extends { name: Name } ? R[K] : never;
}[number];

// type TestFlat = FlatRoutes<GlobalRoutesType>;

// const t: TestFlat;

// type List = TestFlat[number]['name'];
// const x: List = '';

// type Test = FindRoute<TestFlat, 'root.entrypointGroup'>;

// const y: Test;

// type GetRoute<RouteList extends Routes, RouteName extends string> = FlatRoutes<RouteList, RouteName>;

// type GetRoute<RouteList extends Routes | Route, RouteName extends string> = RouteList extends Routes
//   ? {
//       [K in keyof RouteList]: RouteList[K] extends Route
//         ? RouteList[K]['name'] extends GetFirstSegment<RouteName>
//           ? IsLastSegment<RouteName> extends false
//             ? RouteList[K]['children'] extends Routes
//               ? GetRoute<RouteList[K]['children'], GetSegmentResidue<RouteName>>
//               : RouteList[K]
//             : RouteList[K]
//           : never
//         : never;
//     }[number]
//   : RouteList;

// type RouteTest = GetRoute<GlobalRoutesType, 'ns.entrypointGroup'>;

type GetParamsSchema<Type> = Type extends { paramsSchema: z.ZodType } ? Type['paramsSchema'] : undefined;

// type ParamsSchemaTest = GetParamsSchema<RouteTest>;

type GetParams<Type extends z.ZodType | undefined> = Type extends z.ZodType ? z.infer<Type> : undefined;

// type ParamsTest = GetParams<ParamsSchemaTest>;

// type ParamsTest2 = GetParamsSchemaByRouteName<'root3'>;

// export type RouteNodeList = GetNodeNameList<GlobalRoutesType>;

export type RouteNodeList = FlatRoutes<GlobalRoutesType>[number]['name'];

// export type GetParamsByRouteName<RouteName extends RouteNodeList> = GetParams<
//   GetParamsSchema<GetRoute<GlobalRoutesType, RouteName>>
// >;

export type GetParamsByRouteName<RouteName extends RouteNodeList> = GetParams<
  GetParamsSchema<FindRoute<FlatRoutes<GlobalRoutesType>, RouteName>>
>;

// type Test = GetParamsByRouteName2<'ns.entrypointGroup'>;

export type GetOptionalParamsByRouteName<T extends RouteNodeList> = Partial<GetParamsByRouteName<T>>;
