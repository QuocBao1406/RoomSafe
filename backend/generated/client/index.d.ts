
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Users
 * 
 */
export type Users = $Result.DefaultSelection<Prisma.$UsersPayload>
/**
 * Model Posts
 * 
 */
export type Posts = $Result.DefaultSelection<Prisma.$PostsPayload>
/**
 * Model PostImages
 * 
 */
export type PostImages = $Result.DefaultSelection<Prisma.$PostImagesPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const users_user_gender: {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER'
};

export type users_user_gender = (typeof users_user_gender)[keyof typeof users_user_gender]


export const users_user_verification: {
  UNVERIFIED: 'UNVERIFIED',
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED'
};

export type users_user_verification = (typeof users_user_verification)[keyof typeof users_user_verification]


export const users_user_role: {
  LANDLORD: 'LANDLORD',
  TENANT: 'TENANT'
};

export type users_user_role = (typeof users_user_role)[keyof typeof users_user_role]


export const PostStatus: {
  AVAILABLE: 'AVAILABLE',
  RENTED: 'RENTED',
  HIDDEN: 'HIDDEN'
};

export type PostStatus = (typeof PostStatus)[keyof typeof PostStatus]


export const PostCategory: {
  PHONG_TRO: 'PHONG_TRO',
  CHUNG_CU: 'CHUNG_CU',
  NHA_NGUYEN_CAN: 'NHA_NGUYEN_CAN'
};

export type PostCategory = (typeof PostCategory)[keyof typeof PostCategory]

}

export type users_user_gender = $Enums.users_user_gender

export const users_user_gender: typeof $Enums.users_user_gender

export type users_user_verification = $Enums.users_user_verification

export const users_user_verification: typeof $Enums.users_user_verification

export type users_user_role = $Enums.users_user_role

export const users_user_role: typeof $Enums.users_user_role

export type PostStatus = $Enums.PostStatus

export const PostStatus: typeof $Enums.PostStatus

export type PostCategory = $Enums.PostCategory

export const PostCategory: typeof $Enums.PostCategory

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.users.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.users.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.users`: Exposes CRUD operations for the **Users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.UsersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.posts`: Exposes CRUD operations for the **Posts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.posts.findMany()
    * ```
    */
  get posts(): Prisma.PostsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.postImages`: Exposes CRUD operations for the **PostImages** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PostImages
    * const postImages = await prisma.postImages.findMany()
    * ```
    */
  get postImages(): Prisma.PostImagesDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.0
   * Query Engine version: 2ba551f319ab1df4bc874a89965d8b3641056773
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Users: 'Users',
    Posts: 'Posts',
    PostImages: 'PostImages'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "users" | "posts" | "postImages"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Users: {
        payload: Prisma.$UsersPayload<ExtArgs>
        fields: Prisma.UsersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          findFirst: {
            args: Prisma.UsersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          findMany: {
            args: Prisma.UsersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>[]
          }
          create: {
            args: Prisma.UsersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          createMany: {
            args: Prisma.UsersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UsersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          update: {
            args: Prisma.UsersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          deleteMany: {
            args: Prisma.UsersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UsersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.UsersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      Posts: {
        payload: Prisma.$PostsPayload<ExtArgs>
        fields: Prisma.PostsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostsPayload>
          }
          findFirst: {
            args: Prisma.PostsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostsPayload>
          }
          findMany: {
            args: Prisma.PostsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostsPayload>[]
          }
          create: {
            args: Prisma.PostsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostsPayload>
          }
          createMany: {
            args: Prisma.PostsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PostsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostsPayload>
          }
          update: {
            args: Prisma.PostsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostsPayload>
          }
          deleteMany: {
            args: Prisma.PostsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PostsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostsPayload>
          }
          aggregate: {
            args: Prisma.PostsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePosts>
          }
          groupBy: {
            args: Prisma.PostsGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostsGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostsCountArgs<ExtArgs>
            result: $Utils.Optional<PostsCountAggregateOutputType> | number
          }
        }
      }
      PostImages: {
        payload: Prisma.$PostImagesPayload<ExtArgs>
        fields: Prisma.PostImagesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostImagesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostImagesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostImagesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostImagesPayload>
          }
          findFirst: {
            args: Prisma.PostImagesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostImagesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostImagesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostImagesPayload>
          }
          findMany: {
            args: Prisma.PostImagesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostImagesPayload>[]
          }
          create: {
            args: Prisma.PostImagesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostImagesPayload>
          }
          createMany: {
            args: Prisma.PostImagesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PostImagesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostImagesPayload>
          }
          update: {
            args: Prisma.PostImagesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostImagesPayload>
          }
          deleteMany: {
            args: Prisma.PostImagesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostImagesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PostImagesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostImagesPayload>
          }
          aggregate: {
            args: Prisma.PostImagesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePostImages>
          }
          groupBy: {
            args: Prisma.PostImagesGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostImagesGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostImagesCountArgs<ExtArgs>
            result: $Utils.Optional<PostImagesCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    users?: UsersOmit
    posts?: PostsOmit
    postImages?: PostImagesOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    posts: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | UsersCountOutputTypeCountPostsArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostsWhereInput
  }


  /**
   * Count Type PostsCountOutputType
   */

  export type PostsCountOutputType = {
    images: number
  }

  export type PostsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    images?: boolean | PostsCountOutputTypeCountImagesArgs
  }

  // Custom InputTypes
  /**
   * PostsCountOutputType without action
   */
  export type PostsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostsCountOutputType
     */
    select?: PostsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PostsCountOutputType without action
   */
  export type PostsCountOutputTypeCountImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostImagesWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    user_id: number | null
    user_avg_rating: Decimal | null
    user_review_count: number | null
  }

  export type UsersSumAggregateOutputType = {
    user_id: bigint | null
    user_avg_rating: Decimal | null
    user_review_count: number | null
  }

  export type UsersMinAggregateOutputType = {
    user_id: bigint | null
    user_name: string | null
    user_password: string | null
    user_full_name: string | null
    user_gender: $Enums.users_user_gender | null
    user_birthday: Date | null
    user_phone: string | null
    user_email: string | null
    user_address: string | null
    user_avatar: string | null
    user_avg_rating: Decimal | null
    user_review_count: number | null
    user_bio: string | null
    user_created_at: Date | null
    user_verification: $Enums.users_user_verification | null
    user_role: $Enums.users_user_role | null
  }

  export type UsersMaxAggregateOutputType = {
    user_id: bigint | null
    user_name: string | null
    user_password: string | null
    user_full_name: string | null
    user_gender: $Enums.users_user_gender | null
    user_birthday: Date | null
    user_phone: string | null
    user_email: string | null
    user_address: string | null
    user_avatar: string | null
    user_avg_rating: Decimal | null
    user_review_count: number | null
    user_bio: string | null
    user_created_at: Date | null
    user_verification: $Enums.users_user_verification | null
    user_role: $Enums.users_user_role | null
  }

  export type UsersCountAggregateOutputType = {
    user_id: number
    user_name: number
    user_password: number
    user_full_name: number
    user_gender: number
    user_birthday: number
    user_phone: number
    user_email: number
    user_address: number
    user_avatar: number
    user_avg_rating: number
    user_review_count: number
    user_bio: number
    user_created_at: number
    user_verification: number
    user_role: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    user_id?: true
    user_avg_rating?: true
    user_review_count?: true
  }

  export type UsersSumAggregateInputType = {
    user_id?: true
    user_avg_rating?: true
    user_review_count?: true
  }

  export type UsersMinAggregateInputType = {
    user_id?: true
    user_name?: true
    user_password?: true
    user_full_name?: true
    user_gender?: true
    user_birthday?: true
    user_phone?: true
    user_email?: true
    user_address?: true
    user_avatar?: true
    user_avg_rating?: true
    user_review_count?: true
    user_bio?: true
    user_created_at?: true
    user_verification?: true
    user_role?: true
  }

  export type UsersMaxAggregateInputType = {
    user_id?: true
    user_name?: true
    user_password?: true
    user_full_name?: true
    user_gender?: true
    user_birthday?: true
    user_phone?: true
    user_email?: true
    user_address?: true
    user_avatar?: true
    user_avg_rating?: true
    user_review_count?: true
    user_bio?: true
    user_created_at?: true
    user_verification?: true
    user_role?: true
  }

  export type UsersCountAggregateInputType = {
    user_id?: true
    user_name?: true
    user_password?: true
    user_full_name?: true
    user_gender?: true
    user_birthday?: true
    user_phone?: true
    user_email?: true
    user_address?: true
    user_avatar?: true
    user_avg_rating?: true
    user_review_count?: true
    user_bio?: true
    user_created_at?: true
    user_verification?: true
    user_role?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to aggregate.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type UsersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsersWhereInput
    orderBy?: UsersOrderByWithAggregationInput | UsersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: UsersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    user_id: bigint
    user_name: string
    user_password: string
    user_full_name: string | null
    user_gender: $Enums.users_user_gender | null
    user_birthday: Date | null
    user_phone: string | null
    user_email: string
    user_address: string | null
    user_avatar: string | null
    user_avg_rating: Decimal | null
    user_review_count: number | null
    user_bio: string | null
    user_created_at: Date
    user_verification: $Enums.users_user_verification
    user_role: $Enums.users_user_role
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends UsersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type UsersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    user_name?: boolean
    user_password?: boolean
    user_full_name?: boolean
    user_gender?: boolean
    user_birthday?: boolean
    user_phone?: boolean
    user_email?: boolean
    user_address?: boolean
    user_avatar?: boolean
    user_avg_rating?: boolean
    user_review_count?: boolean
    user_bio?: boolean
    user_created_at?: boolean
    user_verification?: boolean
    user_role?: boolean
    posts?: boolean | Users$postsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>



  export type UsersSelectScalar = {
    user_id?: boolean
    user_name?: boolean
    user_password?: boolean
    user_full_name?: boolean
    user_gender?: boolean
    user_birthday?: boolean
    user_phone?: boolean
    user_email?: boolean
    user_address?: boolean
    user_avatar?: boolean
    user_avg_rating?: boolean
    user_review_count?: boolean
    user_bio?: boolean
    user_created_at?: boolean
    user_verification?: boolean
    user_role?: boolean
  }

  export type UsersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "user_name" | "user_password" | "user_full_name" | "user_gender" | "user_birthday" | "user_phone" | "user_email" | "user_address" | "user_avatar" | "user_avg_rating" | "user_review_count" | "user_bio" | "user_created_at" | "user_verification" | "user_role", ExtArgs["result"]["users"]>
  export type UsersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | Users$postsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UsersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Users"
    objects: {
      posts: Prisma.$PostsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: bigint
      user_name: string
      user_password: string
      user_full_name: string | null
      user_gender: $Enums.users_user_gender | null
      user_birthday: Date | null
      user_phone: string | null
      user_email: string
      user_address: string | null
      user_avatar: string | null
      user_avg_rating: Prisma.Decimal | null
      user_review_count: number | null
      user_bio: string | null
      user_created_at: Date
      user_verification: $Enums.users_user_verification
      user_role: $Enums.users_user_role
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type UsersGetPayload<S extends boolean | null | undefined | UsersDefaultArgs> = $Result.GetResult<Prisma.$UsersPayload, S>

  type UsersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface UsersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Users'], meta: { name: 'Users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {UsersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsersFindUniqueArgs>(args: SelectSubset<T, UsersFindUniqueArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsersFindUniqueOrThrowArgs>(args: SelectSubset<T, UsersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsersFindFirstArgs>(args?: SelectSubset<T, UsersFindFirstArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsersFindFirstOrThrowArgs>(args?: SelectSubset<T, UsersFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const usersWithUser_idOnly = await prisma.users.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends UsersFindManyArgs>(args?: SelectSubset<T, UsersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {UsersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends UsersCreateArgs>(args: SelectSubset<T, UsersCreateArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UsersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsersCreateManyArgs>(args?: SelectSubset<T, UsersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Users.
     * @param {UsersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends UsersDeleteArgs>(args: SelectSubset<T, UsersDeleteArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {UsersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsersUpdateArgs>(args: SelectSubset<T, UsersUpdateArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UsersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsersDeleteManyArgs>(args?: SelectSubset<T, UsersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsersUpdateManyArgs>(args: SelectSubset<T, UsersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Users.
     * @param {UsersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends UsersUpsertArgs>(args: SelectSubset<T, UsersUpsertArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UsersCountArgs>(
      args?: Subset<T, UsersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsersGroupByArgs['orderBy'] }
        : { orderBy?: UsersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Users model
   */
  readonly fields: UsersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    posts<T extends Users$postsArgs<ExtArgs> = {}>(args?: Subset<T, Users$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Users model
   */
  interface UsersFieldRefs {
    readonly user_id: FieldRef<"Users", 'BigInt'>
    readonly user_name: FieldRef<"Users", 'String'>
    readonly user_password: FieldRef<"Users", 'String'>
    readonly user_full_name: FieldRef<"Users", 'String'>
    readonly user_gender: FieldRef<"Users", 'users_user_gender'>
    readonly user_birthday: FieldRef<"Users", 'DateTime'>
    readonly user_phone: FieldRef<"Users", 'String'>
    readonly user_email: FieldRef<"Users", 'String'>
    readonly user_address: FieldRef<"Users", 'String'>
    readonly user_avatar: FieldRef<"Users", 'String'>
    readonly user_avg_rating: FieldRef<"Users", 'Decimal'>
    readonly user_review_count: FieldRef<"Users", 'Int'>
    readonly user_bio: FieldRef<"Users", 'String'>
    readonly user_created_at: FieldRef<"Users", 'DateTime'>
    readonly user_verification: FieldRef<"Users", 'users_user_verification'>
    readonly user_role: FieldRef<"Users", 'users_user_role'>
  }
    

  // Custom InputTypes
  /**
   * Users findUnique
   */
  export type UsersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users findUniqueOrThrow
   */
  export type UsersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users findFirst
   */
  export type UsersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * Users findFirstOrThrow
   */
  export type UsersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * Users findMany
   */
  export type UsersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * Users create
   */
  export type UsersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * The data needed to create a Users.
     */
    data: XOR<UsersCreateInput, UsersUncheckedCreateInput>
  }

  /**
   * Users createMany
   */
  export type UsersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UsersCreateManyInput | UsersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Users update
   */
  export type UsersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * The data needed to update a Users.
     */
    data: XOR<UsersUpdateInput, UsersUncheckedUpdateInput>
    /**
     * Choose, which Users to update.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users updateMany
   */
  export type UsersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UsersUpdateManyMutationInput, UsersUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UsersWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * Users upsert
   */
  export type UsersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * The filter to search for the Users to update in case it exists.
     */
    where: UsersWhereUniqueInput
    /**
     * In case the Users found by the `where` argument doesn't exist, create a new Users with this data.
     */
    create: XOR<UsersCreateInput, UsersUncheckedCreateInput>
    /**
     * In case the Users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsersUpdateInput, UsersUncheckedUpdateInput>
  }

  /**
   * Users delete
   */
  export type UsersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter which Users to delete.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users deleteMany
   */
  export type UsersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UsersWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * Users.posts
   */
  export type Users$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Posts
     */
    select?: PostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Posts
     */
    omit?: PostsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostsInclude<ExtArgs> | null
    where?: PostsWhereInput
    orderBy?: PostsOrderByWithRelationInput | PostsOrderByWithRelationInput[]
    cursor?: PostsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostsScalarFieldEnum | PostsScalarFieldEnum[]
  }

  /**
   * Users without action
   */
  export type UsersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
  }


  /**
   * Model Posts
   */

  export type AggregatePosts = {
    _count: PostsCountAggregateOutputType | null
    _avg: PostsAvgAggregateOutputType | null
    _sum: PostsSumAggregateOutputType | null
    _min: PostsMinAggregateOutputType | null
    _max: PostsMaxAggregateOutputType | null
  }

  export type PostsAvgAggregateOutputType = {
    post_id: number | null
    post_price: number | null
    post_area: number | null
    price_electricity: number | null
    price_water: number | null
    price_internet: number | null
    user_id: number | null
  }

  export type PostsSumAggregateOutputType = {
    post_id: number | null
    post_price: number | null
    post_area: number | null
    price_electricity: number | null
    price_water: number | null
    price_internet: number | null
    user_id: bigint | null
  }

  export type PostsMinAggregateOutputType = {
    post_id: number | null
    post_title: string | null
    post_description: string | null
    post_price: number | null
    post_area: number | null
    price_electricity: number | null
    price_water: number | null
    price_internet: number | null
    post_address: string | null
    post_ward: string | null
    post_district: string | null
    post_city: string | null
    category: $Enums.PostCategory | null
    status: $Enums.PostStatus | null
    user_id: bigint | null
    created_at: Date | null
    expired_at: Date | null
  }

  export type PostsMaxAggregateOutputType = {
    post_id: number | null
    post_title: string | null
    post_description: string | null
    post_price: number | null
    post_area: number | null
    price_electricity: number | null
    price_water: number | null
    price_internet: number | null
    post_address: string | null
    post_ward: string | null
    post_district: string | null
    post_city: string | null
    category: $Enums.PostCategory | null
    status: $Enums.PostStatus | null
    user_id: bigint | null
    created_at: Date | null
    expired_at: Date | null
  }

  export type PostsCountAggregateOutputType = {
    post_id: number
    post_title: number
    post_description: number
    post_price: number
    post_area: number
    price_electricity: number
    price_water: number
    price_internet: number
    post_address: number
    post_ward: number
    post_district: number
    post_city: number
    category: number
    status: number
    user_id: number
    created_at: number
    expired_at: number
    _all: number
  }


  export type PostsAvgAggregateInputType = {
    post_id?: true
    post_price?: true
    post_area?: true
    price_electricity?: true
    price_water?: true
    price_internet?: true
    user_id?: true
  }

  export type PostsSumAggregateInputType = {
    post_id?: true
    post_price?: true
    post_area?: true
    price_electricity?: true
    price_water?: true
    price_internet?: true
    user_id?: true
  }

  export type PostsMinAggregateInputType = {
    post_id?: true
    post_title?: true
    post_description?: true
    post_price?: true
    post_area?: true
    price_electricity?: true
    price_water?: true
    price_internet?: true
    post_address?: true
    post_ward?: true
    post_district?: true
    post_city?: true
    category?: true
    status?: true
    user_id?: true
    created_at?: true
    expired_at?: true
  }

  export type PostsMaxAggregateInputType = {
    post_id?: true
    post_title?: true
    post_description?: true
    post_price?: true
    post_area?: true
    price_electricity?: true
    price_water?: true
    price_internet?: true
    post_address?: true
    post_ward?: true
    post_district?: true
    post_city?: true
    category?: true
    status?: true
    user_id?: true
    created_at?: true
    expired_at?: true
  }

  export type PostsCountAggregateInputType = {
    post_id?: true
    post_title?: true
    post_description?: true
    post_price?: true
    post_area?: true
    price_electricity?: true
    price_water?: true
    price_internet?: true
    post_address?: true
    post_ward?: true
    post_district?: true
    post_city?: true
    category?: true
    status?: true
    user_id?: true
    created_at?: true
    expired_at?: true
    _all?: true
  }

  export type PostsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Posts to aggregate.
     */
    where?: PostsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostsOrderByWithRelationInput | PostsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Posts
    **/
    _count?: true | PostsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostsMaxAggregateInputType
  }

  export type GetPostsAggregateType<T extends PostsAggregateArgs> = {
        [P in keyof T & keyof AggregatePosts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePosts[P]>
      : GetScalarType<T[P], AggregatePosts[P]>
  }




  export type PostsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostsWhereInput
    orderBy?: PostsOrderByWithAggregationInput | PostsOrderByWithAggregationInput[]
    by: PostsScalarFieldEnum[] | PostsScalarFieldEnum
    having?: PostsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostsCountAggregateInputType | true
    _avg?: PostsAvgAggregateInputType
    _sum?: PostsSumAggregateInputType
    _min?: PostsMinAggregateInputType
    _max?: PostsMaxAggregateInputType
  }

  export type PostsGroupByOutputType = {
    post_id: number
    post_title: string
    post_description: string
    post_price: number
    post_area: number
    price_electricity: number | null
    price_water: number | null
    price_internet: number | null
    post_address: string
    post_ward: string | null
    post_district: string
    post_city: string
    category: $Enums.PostCategory
    status: $Enums.PostStatus
    user_id: bigint
    created_at: Date
    expired_at: Date | null
    _count: PostsCountAggregateOutputType | null
    _avg: PostsAvgAggregateOutputType | null
    _sum: PostsSumAggregateOutputType | null
    _min: PostsMinAggregateOutputType | null
    _max: PostsMaxAggregateOutputType | null
  }

  type GetPostsGroupByPayload<T extends PostsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostsGroupByOutputType[P]>
            : GetScalarType<T[P], PostsGroupByOutputType[P]>
        }
      >
    >


  export type PostsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    post_id?: boolean
    post_title?: boolean
    post_description?: boolean
    post_price?: boolean
    post_area?: boolean
    price_electricity?: boolean
    price_water?: boolean
    price_internet?: boolean
    post_address?: boolean
    post_ward?: boolean
    post_district?: boolean
    post_city?: boolean
    category?: boolean
    status?: boolean
    user_id?: boolean
    created_at?: boolean
    expired_at?: boolean
    user?: boolean | UsersDefaultArgs<ExtArgs>
    images?: boolean | Posts$imagesArgs<ExtArgs>
    _count?: boolean | PostsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["posts"]>



  export type PostsSelectScalar = {
    post_id?: boolean
    post_title?: boolean
    post_description?: boolean
    post_price?: boolean
    post_area?: boolean
    price_electricity?: boolean
    price_water?: boolean
    price_internet?: boolean
    post_address?: boolean
    post_ward?: boolean
    post_district?: boolean
    post_city?: boolean
    category?: boolean
    status?: boolean
    user_id?: boolean
    created_at?: boolean
    expired_at?: boolean
  }

  export type PostsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"post_id" | "post_title" | "post_description" | "post_price" | "post_area" | "price_electricity" | "price_water" | "price_internet" | "post_address" | "post_ward" | "post_district" | "post_city" | "category" | "status" | "user_id" | "created_at" | "expired_at", ExtArgs["result"]["posts"]>
  export type PostsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsersDefaultArgs<ExtArgs>
    images?: boolean | Posts$imagesArgs<ExtArgs>
    _count?: boolean | PostsCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PostsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Posts"
    objects: {
      user: Prisma.$UsersPayload<ExtArgs>
      images: Prisma.$PostImagesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      post_id: number
      post_title: string
      post_description: string
      post_price: number
      post_area: number
      price_electricity: number | null
      price_water: number | null
      price_internet: number | null
      post_address: string
      post_ward: string | null
      post_district: string
      post_city: string
      category: $Enums.PostCategory
      status: $Enums.PostStatus
      user_id: bigint
      created_at: Date
      expired_at: Date | null
    }, ExtArgs["result"]["posts"]>
    composites: {}
  }

  type PostsGetPayload<S extends boolean | null | undefined | PostsDefaultArgs> = $Result.GetResult<Prisma.$PostsPayload, S>

  type PostsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostsCountAggregateInputType | true
    }

  export interface PostsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Posts'], meta: { name: 'Posts' } }
    /**
     * Find zero or one Posts that matches the filter.
     * @param {PostsFindUniqueArgs} args - Arguments to find a Posts
     * @example
     * // Get one Posts
     * const posts = await prisma.posts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostsFindUniqueArgs>(args: SelectSubset<T, PostsFindUniqueArgs<ExtArgs>>): Prisma__PostsClient<$Result.GetResult<Prisma.$PostsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Posts that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostsFindUniqueOrThrowArgs} args - Arguments to find a Posts
     * @example
     * // Get one Posts
     * const posts = await prisma.posts.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostsFindUniqueOrThrowArgs>(args: SelectSubset<T, PostsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostsClient<$Result.GetResult<Prisma.$PostsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostsFindFirstArgs} args - Arguments to find a Posts
     * @example
     * // Get one Posts
     * const posts = await prisma.posts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostsFindFirstArgs>(args?: SelectSubset<T, PostsFindFirstArgs<ExtArgs>>): Prisma__PostsClient<$Result.GetResult<Prisma.$PostsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Posts that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostsFindFirstOrThrowArgs} args - Arguments to find a Posts
     * @example
     * // Get one Posts
     * const posts = await prisma.posts.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostsFindFirstOrThrowArgs>(args?: SelectSubset<T, PostsFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostsClient<$Result.GetResult<Prisma.$PostsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.posts.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.posts.findMany({ take: 10 })
     * 
     * // Only select the `post_id`
     * const postsWithPost_idOnly = await prisma.posts.findMany({ select: { post_id: true } })
     * 
     */
    findMany<T extends PostsFindManyArgs>(args?: SelectSubset<T, PostsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Posts.
     * @param {PostsCreateArgs} args - Arguments to create a Posts.
     * @example
     * // Create one Posts
     * const Posts = await prisma.posts.create({
     *   data: {
     *     // ... data to create a Posts
     *   }
     * })
     * 
     */
    create<T extends PostsCreateArgs>(args: SelectSubset<T, PostsCreateArgs<ExtArgs>>): Prisma__PostsClient<$Result.GetResult<Prisma.$PostsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Posts.
     * @param {PostsCreateManyArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const posts = await prisma.posts.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostsCreateManyArgs>(args?: SelectSubset<T, PostsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Posts.
     * @param {PostsDeleteArgs} args - Arguments to delete one Posts.
     * @example
     * // Delete one Posts
     * const Posts = await prisma.posts.delete({
     *   where: {
     *     // ... filter to delete one Posts
     *   }
     * })
     * 
     */
    delete<T extends PostsDeleteArgs>(args: SelectSubset<T, PostsDeleteArgs<ExtArgs>>): Prisma__PostsClient<$Result.GetResult<Prisma.$PostsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Posts.
     * @param {PostsUpdateArgs} args - Arguments to update one Posts.
     * @example
     * // Update one Posts
     * const posts = await prisma.posts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostsUpdateArgs>(args: SelectSubset<T, PostsUpdateArgs<ExtArgs>>): Prisma__PostsClient<$Result.GetResult<Prisma.$PostsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Posts.
     * @param {PostsDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.posts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostsDeleteManyArgs>(args?: SelectSubset<T, PostsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const posts = await prisma.posts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostsUpdateManyArgs>(args: SelectSubset<T, PostsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Posts.
     * @param {PostsUpsertArgs} args - Arguments to update or create a Posts.
     * @example
     * // Update or create a Posts
     * const posts = await prisma.posts.upsert({
     *   create: {
     *     // ... data to create a Posts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Posts we want to update
     *   }
     * })
     */
    upsert<T extends PostsUpsertArgs>(args: SelectSubset<T, PostsUpsertArgs<ExtArgs>>): Prisma__PostsClient<$Result.GetResult<Prisma.$PostsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostsCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.posts.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends PostsCountArgs>(
      args?: Subset<T, PostsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostsAggregateArgs>(args: Subset<T, PostsAggregateArgs>): Prisma.PrismaPromise<GetPostsAggregateType<T>>

    /**
     * Group by Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostsGroupByArgs['orderBy'] }
        : { orderBy?: PostsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Posts model
   */
  readonly fields: PostsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Posts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UsersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsersDefaultArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    images<T extends Posts$imagesArgs<ExtArgs> = {}>(args?: Subset<T, Posts$imagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostImagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Posts model
   */
  interface PostsFieldRefs {
    readonly post_id: FieldRef<"Posts", 'Int'>
    readonly post_title: FieldRef<"Posts", 'String'>
    readonly post_description: FieldRef<"Posts", 'String'>
    readonly post_price: FieldRef<"Posts", 'Int'>
    readonly post_area: FieldRef<"Posts", 'Float'>
    readonly price_electricity: FieldRef<"Posts", 'Int'>
    readonly price_water: FieldRef<"Posts", 'Int'>
    readonly price_internet: FieldRef<"Posts", 'Int'>
    readonly post_address: FieldRef<"Posts", 'String'>
    readonly post_ward: FieldRef<"Posts", 'String'>
    readonly post_district: FieldRef<"Posts", 'String'>
    readonly post_city: FieldRef<"Posts", 'String'>
    readonly category: FieldRef<"Posts", 'PostCategory'>
    readonly status: FieldRef<"Posts", 'PostStatus'>
    readonly user_id: FieldRef<"Posts", 'BigInt'>
    readonly created_at: FieldRef<"Posts", 'DateTime'>
    readonly expired_at: FieldRef<"Posts", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Posts findUnique
   */
  export type PostsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Posts
     */
    select?: PostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Posts
     */
    omit?: PostsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostsInclude<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where: PostsWhereUniqueInput
  }

  /**
   * Posts findUniqueOrThrow
   */
  export type PostsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Posts
     */
    select?: PostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Posts
     */
    omit?: PostsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostsInclude<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where: PostsWhereUniqueInput
  }

  /**
   * Posts findFirst
   */
  export type PostsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Posts
     */
    select?: PostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Posts
     */
    omit?: PostsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostsInclude<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where?: PostsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostsOrderByWithRelationInput | PostsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostsScalarFieldEnum | PostsScalarFieldEnum[]
  }

  /**
   * Posts findFirstOrThrow
   */
  export type PostsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Posts
     */
    select?: PostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Posts
     */
    omit?: PostsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostsInclude<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where?: PostsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostsOrderByWithRelationInput | PostsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostsScalarFieldEnum | PostsScalarFieldEnum[]
  }

  /**
   * Posts findMany
   */
  export type PostsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Posts
     */
    select?: PostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Posts
     */
    omit?: PostsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostsInclude<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where?: PostsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostsOrderByWithRelationInput | PostsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Posts.
     */
    cursor?: PostsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    distinct?: PostsScalarFieldEnum | PostsScalarFieldEnum[]
  }

  /**
   * Posts create
   */
  export type PostsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Posts
     */
    select?: PostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Posts
     */
    omit?: PostsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostsInclude<ExtArgs> | null
    /**
     * The data needed to create a Posts.
     */
    data: XOR<PostsCreateInput, PostsUncheckedCreateInput>
  }

  /**
   * Posts createMany
   */
  export type PostsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Posts.
     */
    data: PostsCreateManyInput | PostsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Posts update
   */
  export type PostsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Posts
     */
    select?: PostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Posts
     */
    omit?: PostsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostsInclude<ExtArgs> | null
    /**
     * The data needed to update a Posts.
     */
    data: XOR<PostsUpdateInput, PostsUncheckedUpdateInput>
    /**
     * Choose, which Posts to update.
     */
    where: PostsWhereUniqueInput
  }

  /**
   * Posts updateMany
   */
  export type PostsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Posts.
     */
    data: XOR<PostsUpdateManyMutationInput, PostsUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostsWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
  }

  /**
   * Posts upsert
   */
  export type PostsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Posts
     */
    select?: PostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Posts
     */
    omit?: PostsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostsInclude<ExtArgs> | null
    /**
     * The filter to search for the Posts to update in case it exists.
     */
    where: PostsWhereUniqueInput
    /**
     * In case the Posts found by the `where` argument doesn't exist, create a new Posts with this data.
     */
    create: XOR<PostsCreateInput, PostsUncheckedCreateInput>
    /**
     * In case the Posts was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostsUpdateInput, PostsUncheckedUpdateInput>
  }

  /**
   * Posts delete
   */
  export type PostsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Posts
     */
    select?: PostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Posts
     */
    omit?: PostsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostsInclude<ExtArgs> | null
    /**
     * Filter which Posts to delete.
     */
    where: PostsWhereUniqueInput
  }

  /**
   * Posts deleteMany
   */
  export type PostsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Posts to delete
     */
    where?: PostsWhereInput
    /**
     * Limit how many Posts to delete.
     */
    limit?: number
  }

  /**
   * Posts.images
   */
  export type Posts$imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostImages
     */
    select?: PostImagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostImages
     */
    omit?: PostImagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostImagesInclude<ExtArgs> | null
    where?: PostImagesWhereInput
    orderBy?: PostImagesOrderByWithRelationInput | PostImagesOrderByWithRelationInput[]
    cursor?: PostImagesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostImagesScalarFieldEnum | PostImagesScalarFieldEnum[]
  }

  /**
   * Posts without action
   */
  export type PostsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Posts
     */
    select?: PostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Posts
     */
    omit?: PostsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostsInclude<ExtArgs> | null
  }


  /**
   * Model PostImages
   */

  export type AggregatePostImages = {
    _count: PostImagesCountAggregateOutputType | null
    _avg: PostImagesAvgAggregateOutputType | null
    _sum: PostImagesSumAggregateOutputType | null
    _min: PostImagesMinAggregateOutputType | null
    _max: PostImagesMaxAggregateOutputType | null
  }

  export type PostImagesAvgAggregateOutputType = {
    image_id: number | null
    post_id: number | null
  }

  export type PostImagesSumAggregateOutputType = {
    image_id: number | null
    post_id: number | null
  }

  export type PostImagesMinAggregateOutputType = {
    image_id: number | null
    image_url: string | null
    post_id: number | null
  }

  export type PostImagesMaxAggregateOutputType = {
    image_id: number | null
    image_url: string | null
    post_id: number | null
  }

  export type PostImagesCountAggregateOutputType = {
    image_id: number
    image_url: number
    post_id: number
    _all: number
  }


  export type PostImagesAvgAggregateInputType = {
    image_id?: true
    post_id?: true
  }

  export type PostImagesSumAggregateInputType = {
    image_id?: true
    post_id?: true
  }

  export type PostImagesMinAggregateInputType = {
    image_id?: true
    image_url?: true
    post_id?: true
  }

  export type PostImagesMaxAggregateInputType = {
    image_id?: true
    image_url?: true
    post_id?: true
  }

  export type PostImagesCountAggregateInputType = {
    image_id?: true
    image_url?: true
    post_id?: true
    _all?: true
  }

  export type PostImagesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostImages to aggregate.
     */
    where?: PostImagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostImages to fetch.
     */
    orderBy?: PostImagesOrderByWithRelationInput | PostImagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostImagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PostImages
    **/
    _count?: true | PostImagesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostImagesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostImagesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostImagesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostImagesMaxAggregateInputType
  }

  export type GetPostImagesAggregateType<T extends PostImagesAggregateArgs> = {
        [P in keyof T & keyof AggregatePostImages]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePostImages[P]>
      : GetScalarType<T[P], AggregatePostImages[P]>
  }




  export type PostImagesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostImagesWhereInput
    orderBy?: PostImagesOrderByWithAggregationInput | PostImagesOrderByWithAggregationInput[]
    by: PostImagesScalarFieldEnum[] | PostImagesScalarFieldEnum
    having?: PostImagesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostImagesCountAggregateInputType | true
    _avg?: PostImagesAvgAggregateInputType
    _sum?: PostImagesSumAggregateInputType
    _min?: PostImagesMinAggregateInputType
    _max?: PostImagesMaxAggregateInputType
  }

  export type PostImagesGroupByOutputType = {
    image_id: number
    image_url: string
    post_id: number
    _count: PostImagesCountAggregateOutputType | null
    _avg: PostImagesAvgAggregateOutputType | null
    _sum: PostImagesSumAggregateOutputType | null
    _min: PostImagesMinAggregateOutputType | null
    _max: PostImagesMaxAggregateOutputType | null
  }

  type GetPostImagesGroupByPayload<T extends PostImagesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostImagesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostImagesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostImagesGroupByOutputType[P]>
            : GetScalarType<T[P], PostImagesGroupByOutputType[P]>
        }
      >
    >


  export type PostImagesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    image_id?: boolean
    image_url?: boolean
    post_id?: boolean
    post?: boolean | PostsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postImages"]>



  export type PostImagesSelectScalar = {
    image_id?: boolean
    image_url?: boolean
    post_id?: boolean
  }

  export type PostImagesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"image_id" | "image_url" | "post_id", ExtArgs["result"]["postImages"]>
  export type PostImagesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostsDefaultArgs<ExtArgs>
  }

  export type $PostImagesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PostImages"
    objects: {
      post: Prisma.$PostsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      image_id: number
      image_url: string
      post_id: number
    }, ExtArgs["result"]["postImages"]>
    composites: {}
  }

  type PostImagesGetPayload<S extends boolean | null | undefined | PostImagesDefaultArgs> = $Result.GetResult<Prisma.$PostImagesPayload, S>

  type PostImagesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostImagesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostImagesCountAggregateInputType | true
    }

  export interface PostImagesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PostImages'], meta: { name: 'PostImages' } }
    /**
     * Find zero or one PostImages that matches the filter.
     * @param {PostImagesFindUniqueArgs} args - Arguments to find a PostImages
     * @example
     * // Get one PostImages
     * const postImages = await prisma.postImages.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostImagesFindUniqueArgs>(args: SelectSubset<T, PostImagesFindUniqueArgs<ExtArgs>>): Prisma__PostImagesClient<$Result.GetResult<Prisma.$PostImagesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PostImages that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostImagesFindUniqueOrThrowArgs} args - Arguments to find a PostImages
     * @example
     * // Get one PostImages
     * const postImages = await prisma.postImages.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostImagesFindUniqueOrThrowArgs>(args: SelectSubset<T, PostImagesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostImagesClient<$Result.GetResult<Prisma.$PostImagesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostImagesFindFirstArgs} args - Arguments to find a PostImages
     * @example
     * // Get one PostImages
     * const postImages = await prisma.postImages.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostImagesFindFirstArgs>(args?: SelectSubset<T, PostImagesFindFirstArgs<ExtArgs>>): Prisma__PostImagesClient<$Result.GetResult<Prisma.$PostImagesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostImages that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostImagesFindFirstOrThrowArgs} args - Arguments to find a PostImages
     * @example
     * // Get one PostImages
     * const postImages = await prisma.postImages.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostImagesFindFirstOrThrowArgs>(args?: SelectSubset<T, PostImagesFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostImagesClient<$Result.GetResult<Prisma.$PostImagesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PostImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostImagesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PostImages
     * const postImages = await prisma.postImages.findMany()
     * 
     * // Get first 10 PostImages
     * const postImages = await prisma.postImages.findMany({ take: 10 })
     * 
     * // Only select the `image_id`
     * const postImagesWithImage_idOnly = await prisma.postImages.findMany({ select: { image_id: true } })
     * 
     */
    findMany<T extends PostImagesFindManyArgs>(args?: SelectSubset<T, PostImagesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostImagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PostImages.
     * @param {PostImagesCreateArgs} args - Arguments to create a PostImages.
     * @example
     * // Create one PostImages
     * const PostImages = await prisma.postImages.create({
     *   data: {
     *     // ... data to create a PostImages
     *   }
     * })
     * 
     */
    create<T extends PostImagesCreateArgs>(args: SelectSubset<T, PostImagesCreateArgs<ExtArgs>>): Prisma__PostImagesClient<$Result.GetResult<Prisma.$PostImagesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PostImages.
     * @param {PostImagesCreateManyArgs} args - Arguments to create many PostImages.
     * @example
     * // Create many PostImages
     * const postImages = await prisma.postImages.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostImagesCreateManyArgs>(args?: SelectSubset<T, PostImagesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PostImages.
     * @param {PostImagesDeleteArgs} args - Arguments to delete one PostImages.
     * @example
     * // Delete one PostImages
     * const PostImages = await prisma.postImages.delete({
     *   where: {
     *     // ... filter to delete one PostImages
     *   }
     * })
     * 
     */
    delete<T extends PostImagesDeleteArgs>(args: SelectSubset<T, PostImagesDeleteArgs<ExtArgs>>): Prisma__PostImagesClient<$Result.GetResult<Prisma.$PostImagesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PostImages.
     * @param {PostImagesUpdateArgs} args - Arguments to update one PostImages.
     * @example
     * // Update one PostImages
     * const postImages = await prisma.postImages.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostImagesUpdateArgs>(args: SelectSubset<T, PostImagesUpdateArgs<ExtArgs>>): Prisma__PostImagesClient<$Result.GetResult<Prisma.$PostImagesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PostImages.
     * @param {PostImagesDeleteManyArgs} args - Arguments to filter PostImages to delete.
     * @example
     * // Delete a few PostImages
     * const { count } = await prisma.postImages.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostImagesDeleteManyArgs>(args?: SelectSubset<T, PostImagesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostImagesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PostImages
     * const postImages = await prisma.postImages.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostImagesUpdateManyArgs>(args: SelectSubset<T, PostImagesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PostImages.
     * @param {PostImagesUpsertArgs} args - Arguments to update or create a PostImages.
     * @example
     * // Update or create a PostImages
     * const postImages = await prisma.postImages.upsert({
     *   create: {
     *     // ... data to create a PostImages
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PostImages we want to update
     *   }
     * })
     */
    upsert<T extends PostImagesUpsertArgs>(args: SelectSubset<T, PostImagesUpsertArgs<ExtArgs>>): Prisma__PostImagesClient<$Result.GetResult<Prisma.$PostImagesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PostImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostImagesCountArgs} args - Arguments to filter PostImages to count.
     * @example
     * // Count the number of PostImages
     * const count = await prisma.postImages.count({
     *   where: {
     *     // ... the filter for the PostImages we want to count
     *   }
     * })
    **/
    count<T extends PostImagesCountArgs>(
      args?: Subset<T, PostImagesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostImagesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PostImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostImagesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostImagesAggregateArgs>(args: Subset<T, PostImagesAggregateArgs>): Prisma.PrismaPromise<GetPostImagesAggregateType<T>>

    /**
     * Group by PostImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostImagesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostImagesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostImagesGroupByArgs['orderBy'] }
        : { orderBy?: PostImagesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostImagesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostImagesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PostImages model
   */
  readonly fields: PostImagesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PostImages.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostImagesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends PostsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostsDefaultArgs<ExtArgs>>): Prisma__PostsClient<$Result.GetResult<Prisma.$PostsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PostImages model
   */
  interface PostImagesFieldRefs {
    readonly image_id: FieldRef<"PostImages", 'Int'>
    readonly image_url: FieldRef<"PostImages", 'String'>
    readonly post_id: FieldRef<"PostImages", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * PostImages findUnique
   */
  export type PostImagesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostImages
     */
    select?: PostImagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostImages
     */
    omit?: PostImagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostImagesInclude<ExtArgs> | null
    /**
     * Filter, which PostImages to fetch.
     */
    where: PostImagesWhereUniqueInput
  }

  /**
   * PostImages findUniqueOrThrow
   */
  export type PostImagesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostImages
     */
    select?: PostImagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostImages
     */
    omit?: PostImagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostImagesInclude<ExtArgs> | null
    /**
     * Filter, which PostImages to fetch.
     */
    where: PostImagesWhereUniqueInput
  }

  /**
   * PostImages findFirst
   */
  export type PostImagesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostImages
     */
    select?: PostImagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostImages
     */
    omit?: PostImagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostImagesInclude<ExtArgs> | null
    /**
     * Filter, which PostImages to fetch.
     */
    where?: PostImagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostImages to fetch.
     */
    orderBy?: PostImagesOrderByWithRelationInput | PostImagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostImages.
     */
    cursor?: PostImagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostImages.
     */
    distinct?: PostImagesScalarFieldEnum | PostImagesScalarFieldEnum[]
  }

  /**
   * PostImages findFirstOrThrow
   */
  export type PostImagesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostImages
     */
    select?: PostImagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostImages
     */
    omit?: PostImagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostImagesInclude<ExtArgs> | null
    /**
     * Filter, which PostImages to fetch.
     */
    where?: PostImagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostImages to fetch.
     */
    orderBy?: PostImagesOrderByWithRelationInput | PostImagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostImages.
     */
    cursor?: PostImagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostImages.
     */
    distinct?: PostImagesScalarFieldEnum | PostImagesScalarFieldEnum[]
  }

  /**
   * PostImages findMany
   */
  export type PostImagesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostImages
     */
    select?: PostImagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostImages
     */
    omit?: PostImagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostImagesInclude<ExtArgs> | null
    /**
     * Filter, which PostImages to fetch.
     */
    where?: PostImagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostImages to fetch.
     */
    orderBy?: PostImagesOrderByWithRelationInput | PostImagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PostImages.
     */
    cursor?: PostImagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostImages.
     */
    skip?: number
    distinct?: PostImagesScalarFieldEnum | PostImagesScalarFieldEnum[]
  }

  /**
   * PostImages create
   */
  export type PostImagesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostImages
     */
    select?: PostImagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostImages
     */
    omit?: PostImagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostImagesInclude<ExtArgs> | null
    /**
     * The data needed to create a PostImages.
     */
    data: XOR<PostImagesCreateInput, PostImagesUncheckedCreateInput>
  }

  /**
   * PostImages createMany
   */
  export type PostImagesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PostImages.
     */
    data: PostImagesCreateManyInput | PostImagesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostImages update
   */
  export type PostImagesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostImages
     */
    select?: PostImagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostImages
     */
    omit?: PostImagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostImagesInclude<ExtArgs> | null
    /**
     * The data needed to update a PostImages.
     */
    data: XOR<PostImagesUpdateInput, PostImagesUncheckedUpdateInput>
    /**
     * Choose, which PostImages to update.
     */
    where: PostImagesWhereUniqueInput
  }

  /**
   * PostImages updateMany
   */
  export type PostImagesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PostImages.
     */
    data: XOR<PostImagesUpdateManyMutationInput, PostImagesUncheckedUpdateManyInput>
    /**
     * Filter which PostImages to update
     */
    where?: PostImagesWhereInput
    /**
     * Limit how many PostImages to update.
     */
    limit?: number
  }

  /**
   * PostImages upsert
   */
  export type PostImagesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostImages
     */
    select?: PostImagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostImages
     */
    omit?: PostImagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostImagesInclude<ExtArgs> | null
    /**
     * The filter to search for the PostImages to update in case it exists.
     */
    where: PostImagesWhereUniqueInput
    /**
     * In case the PostImages found by the `where` argument doesn't exist, create a new PostImages with this data.
     */
    create: XOR<PostImagesCreateInput, PostImagesUncheckedCreateInput>
    /**
     * In case the PostImages was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostImagesUpdateInput, PostImagesUncheckedUpdateInput>
  }

  /**
   * PostImages delete
   */
  export type PostImagesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostImages
     */
    select?: PostImagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostImages
     */
    omit?: PostImagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostImagesInclude<ExtArgs> | null
    /**
     * Filter which PostImages to delete.
     */
    where: PostImagesWhereUniqueInput
  }

  /**
   * PostImages deleteMany
   */
  export type PostImagesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostImages to delete
     */
    where?: PostImagesWhereInput
    /**
     * Limit how many PostImages to delete.
     */
    limit?: number
  }

  /**
   * PostImages without action
   */
  export type PostImagesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostImages
     */
    select?: PostImagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostImages
     */
    omit?: PostImagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostImagesInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsersScalarFieldEnum: {
    user_id: 'user_id',
    user_name: 'user_name',
    user_password: 'user_password',
    user_full_name: 'user_full_name',
    user_gender: 'user_gender',
    user_birthday: 'user_birthday',
    user_phone: 'user_phone',
    user_email: 'user_email',
    user_address: 'user_address',
    user_avatar: 'user_avatar',
    user_avg_rating: 'user_avg_rating',
    user_review_count: 'user_review_count',
    user_bio: 'user_bio',
    user_created_at: 'user_created_at',
    user_verification: 'user_verification',
    user_role: 'user_role'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const PostsScalarFieldEnum: {
    post_id: 'post_id',
    post_title: 'post_title',
    post_description: 'post_description',
    post_price: 'post_price',
    post_area: 'post_area',
    price_electricity: 'price_electricity',
    price_water: 'price_water',
    price_internet: 'price_internet',
    post_address: 'post_address',
    post_ward: 'post_ward',
    post_district: 'post_district',
    post_city: 'post_city',
    category: 'category',
    status: 'status',
    user_id: 'user_id',
    created_at: 'created_at',
    expired_at: 'expired_at'
  };

  export type PostsScalarFieldEnum = (typeof PostsScalarFieldEnum)[keyof typeof PostsScalarFieldEnum]


  export const PostImagesScalarFieldEnum: {
    image_id: 'image_id',
    image_url: 'image_url',
    post_id: 'post_id'
  };

  export type PostImagesScalarFieldEnum = (typeof PostImagesScalarFieldEnum)[keyof typeof PostImagesScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const UsersOrderByRelevanceFieldEnum: {
    user_name: 'user_name',
    user_password: 'user_password',
    user_full_name: 'user_full_name',
    user_phone: 'user_phone',
    user_email: 'user_email',
    user_address: 'user_address',
    user_avatar: 'user_avatar',
    user_bio: 'user_bio'
  };

  export type UsersOrderByRelevanceFieldEnum = (typeof UsersOrderByRelevanceFieldEnum)[keyof typeof UsersOrderByRelevanceFieldEnum]


  export const PostsOrderByRelevanceFieldEnum: {
    post_title: 'post_title',
    post_description: 'post_description',
    post_address: 'post_address',
    post_ward: 'post_ward',
    post_district: 'post_district',
    post_city: 'post_city'
  };

  export type PostsOrderByRelevanceFieldEnum = (typeof PostsOrderByRelevanceFieldEnum)[keyof typeof PostsOrderByRelevanceFieldEnum]


  export const PostImagesOrderByRelevanceFieldEnum: {
    image_url: 'image_url'
  };

  export type PostImagesOrderByRelevanceFieldEnum = (typeof PostImagesOrderByRelevanceFieldEnum)[keyof typeof PostImagesOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'users_user_gender'
   */
  export type Enumusers_user_genderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'users_user_gender'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'users_user_verification'
   */
  export type Enumusers_user_verificationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'users_user_verification'>
    


  /**
   * Reference to a field of type 'users_user_role'
   */
  export type Enumusers_user_roleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'users_user_role'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'PostCategory'
   */
  export type EnumPostCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PostCategory'>
    


  /**
   * Reference to a field of type 'PostStatus'
   */
  export type EnumPostStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PostStatus'>
    
  /**
   * Deep Input Types
   */


  export type UsersWhereInput = {
    AND?: UsersWhereInput | UsersWhereInput[]
    OR?: UsersWhereInput[]
    NOT?: UsersWhereInput | UsersWhereInput[]
    user_id?: BigIntFilter<"Users"> | bigint | number
    user_name?: StringFilter<"Users"> | string
    user_password?: StringFilter<"Users"> | string
    user_full_name?: StringNullableFilter<"Users"> | string | null
    user_gender?: Enumusers_user_genderNullableFilter<"Users"> | $Enums.users_user_gender | null
    user_birthday?: DateTimeNullableFilter<"Users"> | Date | string | null
    user_phone?: StringNullableFilter<"Users"> | string | null
    user_email?: StringFilter<"Users"> | string
    user_address?: StringNullableFilter<"Users"> | string | null
    user_avatar?: StringNullableFilter<"Users"> | string | null
    user_avg_rating?: DecimalNullableFilter<"Users"> | Decimal | DecimalJsLike | number | string | null
    user_review_count?: IntNullableFilter<"Users"> | number | null
    user_bio?: StringNullableFilter<"Users"> | string | null
    user_created_at?: DateTimeFilter<"Users"> | Date | string
    user_verification?: Enumusers_user_verificationFilter<"Users"> | $Enums.users_user_verification
    user_role?: Enumusers_user_roleFilter<"Users"> | $Enums.users_user_role
    posts?: PostsListRelationFilter
  }

  export type UsersOrderByWithRelationInput = {
    user_id?: SortOrder
    user_name?: SortOrder
    user_password?: SortOrder
    user_full_name?: SortOrderInput | SortOrder
    user_gender?: SortOrderInput | SortOrder
    user_birthday?: SortOrderInput | SortOrder
    user_phone?: SortOrderInput | SortOrder
    user_email?: SortOrder
    user_address?: SortOrderInput | SortOrder
    user_avatar?: SortOrderInput | SortOrder
    user_avg_rating?: SortOrderInput | SortOrder
    user_review_count?: SortOrderInput | SortOrder
    user_bio?: SortOrderInput | SortOrder
    user_created_at?: SortOrder
    user_verification?: SortOrder
    user_role?: SortOrder
    posts?: PostsOrderByRelationAggregateInput
    _relevance?: UsersOrderByRelevanceInput
  }

  export type UsersWhereUniqueInput = Prisma.AtLeast<{
    user_id?: bigint | number
    user_name?: string
    user_phone?: string
    user_email?: string
    AND?: UsersWhereInput | UsersWhereInput[]
    OR?: UsersWhereInput[]
    NOT?: UsersWhereInput | UsersWhereInput[]
    user_password?: StringFilter<"Users"> | string
    user_full_name?: StringNullableFilter<"Users"> | string | null
    user_gender?: Enumusers_user_genderNullableFilter<"Users"> | $Enums.users_user_gender | null
    user_birthday?: DateTimeNullableFilter<"Users"> | Date | string | null
    user_address?: StringNullableFilter<"Users"> | string | null
    user_avatar?: StringNullableFilter<"Users"> | string | null
    user_avg_rating?: DecimalNullableFilter<"Users"> | Decimal | DecimalJsLike | number | string | null
    user_review_count?: IntNullableFilter<"Users"> | number | null
    user_bio?: StringNullableFilter<"Users"> | string | null
    user_created_at?: DateTimeFilter<"Users"> | Date | string
    user_verification?: Enumusers_user_verificationFilter<"Users"> | $Enums.users_user_verification
    user_role?: Enumusers_user_roleFilter<"Users"> | $Enums.users_user_role
    posts?: PostsListRelationFilter
  }, "user_id" | "user_name" | "user_phone" | "user_email">

  export type UsersOrderByWithAggregationInput = {
    user_id?: SortOrder
    user_name?: SortOrder
    user_password?: SortOrder
    user_full_name?: SortOrderInput | SortOrder
    user_gender?: SortOrderInput | SortOrder
    user_birthday?: SortOrderInput | SortOrder
    user_phone?: SortOrderInput | SortOrder
    user_email?: SortOrder
    user_address?: SortOrderInput | SortOrder
    user_avatar?: SortOrderInput | SortOrder
    user_avg_rating?: SortOrderInput | SortOrder
    user_review_count?: SortOrderInput | SortOrder
    user_bio?: SortOrderInput | SortOrder
    user_created_at?: SortOrder
    user_verification?: SortOrder
    user_role?: SortOrder
    _count?: UsersCountOrderByAggregateInput
    _avg?: UsersAvgOrderByAggregateInput
    _max?: UsersMaxOrderByAggregateInput
    _min?: UsersMinOrderByAggregateInput
    _sum?: UsersSumOrderByAggregateInput
  }

  export type UsersScalarWhereWithAggregatesInput = {
    AND?: UsersScalarWhereWithAggregatesInput | UsersScalarWhereWithAggregatesInput[]
    OR?: UsersScalarWhereWithAggregatesInput[]
    NOT?: UsersScalarWhereWithAggregatesInput | UsersScalarWhereWithAggregatesInput[]
    user_id?: BigIntWithAggregatesFilter<"Users"> | bigint | number
    user_name?: StringWithAggregatesFilter<"Users"> | string
    user_password?: StringWithAggregatesFilter<"Users"> | string
    user_full_name?: StringNullableWithAggregatesFilter<"Users"> | string | null
    user_gender?: Enumusers_user_genderNullableWithAggregatesFilter<"Users"> | $Enums.users_user_gender | null
    user_birthday?: DateTimeNullableWithAggregatesFilter<"Users"> | Date | string | null
    user_phone?: StringNullableWithAggregatesFilter<"Users"> | string | null
    user_email?: StringWithAggregatesFilter<"Users"> | string
    user_address?: StringNullableWithAggregatesFilter<"Users"> | string | null
    user_avatar?: StringNullableWithAggregatesFilter<"Users"> | string | null
    user_avg_rating?: DecimalNullableWithAggregatesFilter<"Users"> | Decimal | DecimalJsLike | number | string | null
    user_review_count?: IntNullableWithAggregatesFilter<"Users"> | number | null
    user_bio?: StringNullableWithAggregatesFilter<"Users"> | string | null
    user_created_at?: DateTimeWithAggregatesFilter<"Users"> | Date | string
    user_verification?: Enumusers_user_verificationWithAggregatesFilter<"Users"> | $Enums.users_user_verification
    user_role?: Enumusers_user_roleWithAggregatesFilter<"Users"> | $Enums.users_user_role
  }

  export type PostsWhereInput = {
    AND?: PostsWhereInput | PostsWhereInput[]
    OR?: PostsWhereInput[]
    NOT?: PostsWhereInput | PostsWhereInput[]
    post_id?: IntFilter<"Posts"> | number
    post_title?: StringFilter<"Posts"> | string
    post_description?: StringFilter<"Posts"> | string
    post_price?: IntFilter<"Posts"> | number
    post_area?: FloatFilter<"Posts"> | number
    price_electricity?: IntNullableFilter<"Posts"> | number | null
    price_water?: IntNullableFilter<"Posts"> | number | null
    price_internet?: IntNullableFilter<"Posts"> | number | null
    post_address?: StringFilter<"Posts"> | string
    post_ward?: StringNullableFilter<"Posts"> | string | null
    post_district?: StringFilter<"Posts"> | string
    post_city?: StringFilter<"Posts"> | string
    category?: EnumPostCategoryFilter<"Posts"> | $Enums.PostCategory
    status?: EnumPostStatusFilter<"Posts"> | $Enums.PostStatus
    user_id?: BigIntFilter<"Posts"> | bigint | number
    created_at?: DateTimeFilter<"Posts"> | Date | string
    expired_at?: DateTimeNullableFilter<"Posts"> | Date | string | null
    user?: XOR<UsersScalarRelationFilter, UsersWhereInput>
    images?: PostImagesListRelationFilter
  }

  export type PostsOrderByWithRelationInput = {
    post_id?: SortOrder
    post_title?: SortOrder
    post_description?: SortOrder
    post_price?: SortOrder
    post_area?: SortOrder
    price_electricity?: SortOrderInput | SortOrder
    price_water?: SortOrderInput | SortOrder
    price_internet?: SortOrderInput | SortOrder
    post_address?: SortOrder
    post_ward?: SortOrderInput | SortOrder
    post_district?: SortOrder
    post_city?: SortOrder
    category?: SortOrder
    status?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    expired_at?: SortOrderInput | SortOrder
    user?: UsersOrderByWithRelationInput
    images?: PostImagesOrderByRelationAggregateInput
    _relevance?: PostsOrderByRelevanceInput
  }

  export type PostsWhereUniqueInput = Prisma.AtLeast<{
    post_id?: number
    AND?: PostsWhereInput | PostsWhereInput[]
    OR?: PostsWhereInput[]
    NOT?: PostsWhereInput | PostsWhereInput[]
    post_title?: StringFilter<"Posts"> | string
    post_description?: StringFilter<"Posts"> | string
    post_price?: IntFilter<"Posts"> | number
    post_area?: FloatFilter<"Posts"> | number
    price_electricity?: IntNullableFilter<"Posts"> | number | null
    price_water?: IntNullableFilter<"Posts"> | number | null
    price_internet?: IntNullableFilter<"Posts"> | number | null
    post_address?: StringFilter<"Posts"> | string
    post_ward?: StringNullableFilter<"Posts"> | string | null
    post_district?: StringFilter<"Posts"> | string
    post_city?: StringFilter<"Posts"> | string
    category?: EnumPostCategoryFilter<"Posts"> | $Enums.PostCategory
    status?: EnumPostStatusFilter<"Posts"> | $Enums.PostStatus
    user_id?: BigIntFilter<"Posts"> | bigint | number
    created_at?: DateTimeFilter<"Posts"> | Date | string
    expired_at?: DateTimeNullableFilter<"Posts"> | Date | string | null
    user?: XOR<UsersScalarRelationFilter, UsersWhereInput>
    images?: PostImagesListRelationFilter
  }, "post_id">

  export type PostsOrderByWithAggregationInput = {
    post_id?: SortOrder
    post_title?: SortOrder
    post_description?: SortOrder
    post_price?: SortOrder
    post_area?: SortOrder
    price_electricity?: SortOrderInput | SortOrder
    price_water?: SortOrderInput | SortOrder
    price_internet?: SortOrderInput | SortOrder
    post_address?: SortOrder
    post_ward?: SortOrderInput | SortOrder
    post_district?: SortOrder
    post_city?: SortOrder
    category?: SortOrder
    status?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    expired_at?: SortOrderInput | SortOrder
    _count?: PostsCountOrderByAggregateInput
    _avg?: PostsAvgOrderByAggregateInput
    _max?: PostsMaxOrderByAggregateInput
    _min?: PostsMinOrderByAggregateInput
    _sum?: PostsSumOrderByAggregateInput
  }

  export type PostsScalarWhereWithAggregatesInput = {
    AND?: PostsScalarWhereWithAggregatesInput | PostsScalarWhereWithAggregatesInput[]
    OR?: PostsScalarWhereWithAggregatesInput[]
    NOT?: PostsScalarWhereWithAggregatesInput | PostsScalarWhereWithAggregatesInput[]
    post_id?: IntWithAggregatesFilter<"Posts"> | number
    post_title?: StringWithAggregatesFilter<"Posts"> | string
    post_description?: StringWithAggregatesFilter<"Posts"> | string
    post_price?: IntWithAggregatesFilter<"Posts"> | number
    post_area?: FloatWithAggregatesFilter<"Posts"> | number
    price_electricity?: IntNullableWithAggregatesFilter<"Posts"> | number | null
    price_water?: IntNullableWithAggregatesFilter<"Posts"> | number | null
    price_internet?: IntNullableWithAggregatesFilter<"Posts"> | number | null
    post_address?: StringWithAggregatesFilter<"Posts"> | string
    post_ward?: StringNullableWithAggregatesFilter<"Posts"> | string | null
    post_district?: StringWithAggregatesFilter<"Posts"> | string
    post_city?: StringWithAggregatesFilter<"Posts"> | string
    category?: EnumPostCategoryWithAggregatesFilter<"Posts"> | $Enums.PostCategory
    status?: EnumPostStatusWithAggregatesFilter<"Posts"> | $Enums.PostStatus
    user_id?: BigIntWithAggregatesFilter<"Posts"> | bigint | number
    created_at?: DateTimeWithAggregatesFilter<"Posts"> | Date | string
    expired_at?: DateTimeNullableWithAggregatesFilter<"Posts"> | Date | string | null
  }

  export type PostImagesWhereInput = {
    AND?: PostImagesWhereInput | PostImagesWhereInput[]
    OR?: PostImagesWhereInput[]
    NOT?: PostImagesWhereInput | PostImagesWhereInput[]
    image_id?: IntFilter<"PostImages"> | number
    image_url?: StringFilter<"PostImages"> | string
    post_id?: IntFilter<"PostImages"> | number
    post?: XOR<PostsScalarRelationFilter, PostsWhereInput>
  }

  export type PostImagesOrderByWithRelationInput = {
    image_id?: SortOrder
    image_url?: SortOrder
    post_id?: SortOrder
    post?: PostsOrderByWithRelationInput
    _relevance?: PostImagesOrderByRelevanceInput
  }

  export type PostImagesWhereUniqueInput = Prisma.AtLeast<{
    image_id?: number
    AND?: PostImagesWhereInput | PostImagesWhereInput[]
    OR?: PostImagesWhereInput[]
    NOT?: PostImagesWhereInput | PostImagesWhereInput[]
    image_url?: StringFilter<"PostImages"> | string
    post_id?: IntFilter<"PostImages"> | number
    post?: XOR<PostsScalarRelationFilter, PostsWhereInput>
  }, "image_id">

  export type PostImagesOrderByWithAggregationInput = {
    image_id?: SortOrder
    image_url?: SortOrder
    post_id?: SortOrder
    _count?: PostImagesCountOrderByAggregateInput
    _avg?: PostImagesAvgOrderByAggregateInput
    _max?: PostImagesMaxOrderByAggregateInput
    _min?: PostImagesMinOrderByAggregateInput
    _sum?: PostImagesSumOrderByAggregateInput
  }

  export type PostImagesScalarWhereWithAggregatesInput = {
    AND?: PostImagesScalarWhereWithAggregatesInput | PostImagesScalarWhereWithAggregatesInput[]
    OR?: PostImagesScalarWhereWithAggregatesInput[]
    NOT?: PostImagesScalarWhereWithAggregatesInput | PostImagesScalarWhereWithAggregatesInput[]
    image_id?: IntWithAggregatesFilter<"PostImages"> | number
    image_url?: StringWithAggregatesFilter<"PostImages"> | string
    post_id?: IntWithAggregatesFilter<"PostImages"> | number
  }

  export type UsersCreateInput = {
    user_id?: bigint | number
    user_name: string
    user_password: string
    user_full_name?: string | null
    user_gender?: $Enums.users_user_gender | null
    user_birthday?: Date | string | null
    user_phone?: string | null
    user_email: string
    user_address?: string | null
    user_avatar?: string | null
    user_avg_rating?: Decimal | DecimalJsLike | number | string | null
    user_review_count?: number | null
    user_bio?: string | null
    user_created_at?: Date | string
    user_verification?: $Enums.users_user_verification
    user_role: $Enums.users_user_role
    posts?: PostsCreateNestedManyWithoutUserInput
  }

  export type UsersUncheckedCreateInput = {
    user_id?: bigint | number
    user_name: string
    user_password: string
    user_full_name?: string | null
    user_gender?: $Enums.users_user_gender | null
    user_birthday?: Date | string | null
    user_phone?: string | null
    user_email: string
    user_address?: string | null
    user_avatar?: string | null
    user_avg_rating?: Decimal | DecimalJsLike | number | string | null
    user_review_count?: number | null
    user_bio?: string | null
    user_created_at?: Date | string
    user_verification?: $Enums.users_user_verification
    user_role: $Enums.users_user_role
    posts?: PostsUncheckedCreateNestedManyWithoutUserInput
  }

  export type UsersUpdateInput = {
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_name?: StringFieldUpdateOperationsInput | string
    user_password?: StringFieldUpdateOperationsInput | string
    user_full_name?: NullableStringFieldUpdateOperationsInput | string | null
    user_gender?: NullableEnumusers_user_genderFieldUpdateOperationsInput | $Enums.users_user_gender | null
    user_birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_phone?: NullableStringFieldUpdateOperationsInput | string | null
    user_email?: StringFieldUpdateOperationsInput | string
    user_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_avatar?: NullableStringFieldUpdateOperationsInput | string | null
    user_avg_rating?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    user_review_count?: NullableIntFieldUpdateOperationsInput | number | null
    user_bio?: NullableStringFieldUpdateOperationsInput | string | null
    user_created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_verification?: Enumusers_user_verificationFieldUpdateOperationsInput | $Enums.users_user_verification
    user_role?: Enumusers_user_roleFieldUpdateOperationsInput | $Enums.users_user_role
    posts?: PostsUpdateManyWithoutUserNestedInput
  }

  export type UsersUncheckedUpdateInput = {
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_name?: StringFieldUpdateOperationsInput | string
    user_password?: StringFieldUpdateOperationsInput | string
    user_full_name?: NullableStringFieldUpdateOperationsInput | string | null
    user_gender?: NullableEnumusers_user_genderFieldUpdateOperationsInput | $Enums.users_user_gender | null
    user_birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_phone?: NullableStringFieldUpdateOperationsInput | string | null
    user_email?: StringFieldUpdateOperationsInput | string
    user_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_avatar?: NullableStringFieldUpdateOperationsInput | string | null
    user_avg_rating?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    user_review_count?: NullableIntFieldUpdateOperationsInput | number | null
    user_bio?: NullableStringFieldUpdateOperationsInput | string | null
    user_created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_verification?: Enumusers_user_verificationFieldUpdateOperationsInput | $Enums.users_user_verification
    user_role?: Enumusers_user_roleFieldUpdateOperationsInput | $Enums.users_user_role
    posts?: PostsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UsersCreateManyInput = {
    user_id?: bigint | number
    user_name: string
    user_password: string
    user_full_name?: string | null
    user_gender?: $Enums.users_user_gender | null
    user_birthday?: Date | string | null
    user_phone?: string | null
    user_email: string
    user_address?: string | null
    user_avatar?: string | null
    user_avg_rating?: Decimal | DecimalJsLike | number | string | null
    user_review_count?: number | null
    user_bio?: string | null
    user_created_at?: Date | string
    user_verification?: $Enums.users_user_verification
    user_role: $Enums.users_user_role
  }

  export type UsersUpdateManyMutationInput = {
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_name?: StringFieldUpdateOperationsInput | string
    user_password?: StringFieldUpdateOperationsInput | string
    user_full_name?: NullableStringFieldUpdateOperationsInput | string | null
    user_gender?: NullableEnumusers_user_genderFieldUpdateOperationsInput | $Enums.users_user_gender | null
    user_birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_phone?: NullableStringFieldUpdateOperationsInput | string | null
    user_email?: StringFieldUpdateOperationsInput | string
    user_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_avatar?: NullableStringFieldUpdateOperationsInput | string | null
    user_avg_rating?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    user_review_count?: NullableIntFieldUpdateOperationsInput | number | null
    user_bio?: NullableStringFieldUpdateOperationsInput | string | null
    user_created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_verification?: Enumusers_user_verificationFieldUpdateOperationsInput | $Enums.users_user_verification
    user_role?: Enumusers_user_roleFieldUpdateOperationsInput | $Enums.users_user_role
  }

  export type UsersUncheckedUpdateManyInput = {
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_name?: StringFieldUpdateOperationsInput | string
    user_password?: StringFieldUpdateOperationsInput | string
    user_full_name?: NullableStringFieldUpdateOperationsInput | string | null
    user_gender?: NullableEnumusers_user_genderFieldUpdateOperationsInput | $Enums.users_user_gender | null
    user_birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_phone?: NullableStringFieldUpdateOperationsInput | string | null
    user_email?: StringFieldUpdateOperationsInput | string
    user_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_avatar?: NullableStringFieldUpdateOperationsInput | string | null
    user_avg_rating?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    user_review_count?: NullableIntFieldUpdateOperationsInput | number | null
    user_bio?: NullableStringFieldUpdateOperationsInput | string | null
    user_created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_verification?: Enumusers_user_verificationFieldUpdateOperationsInput | $Enums.users_user_verification
    user_role?: Enumusers_user_roleFieldUpdateOperationsInput | $Enums.users_user_role
  }

  export type PostsCreateInput = {
    post_title: string
    post_description: string
    post_price: number
    post_area: number
    price_electricity?: number | null
    price_water?: number | null
    price_internet?: number | null
    post_address: string
    post_ward?: string | null
    post_district: string
    post_city: string
    category?: $Enums.PostCategory
    status?: $Enums.PostStatus
    created_at?: Date | string
    expired_at?: Date | string | null
    user: UsersCreateNestedOneWithoutPostsInput
    images?: PostImagesCreateNestedManyWithoutPostInput
  }

  export type PostsUncheckedCreateInput = {
    post_id?: number
    post_title: string
    post_description: string
    post_price: number
    post_area: number
    price_electricity?: number | null
    price_water?: number | null
    price_internet?: number | null
    post_address: string
    post_ward?: string | null
    post_district: string
    post_city: string
    category?: $Enums.PostCategory
    status?: $Enums.PostStatus
    user_id: bigint | number
    created_at?: Date | string
    expired_at?: Date | string | null
    images?: PostImagesUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostsUpdateInput = {
    post_title?: StringFieldUpdateOperationsInput | string
    post_description?: StringFieldUpdateOperationsInput | string
    post_price?: IntFieldUpdateOperationsInput | number
    post_area?: FloatFieldUpdateOperationsInput | number
    price_electricity?: NullableIntFieldUpdateOperationsInput | number | null
    price_water?: NullableIntFieldUpdateOperationsInput | number | null
    price_internet?: NullableIntFieldUpdateOperationsInput | number | null
    post_address?: StringFieldUpdateOperationsInput | string
    post_ward?: NullableStringFieldUpdateOperationsInput | string | null
    post_district?: StringFieldUpdateOperationsInput | string
    post_city?: StringFieldUpdateOperationsInput | string
    category?: EnumPostCategoryFieldUpdateOperationsInput | $Enums.PostCategory
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expired_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UsersUpdateOneRequiredWithoutPostsNestedInput
    images?: PostImagesUpdateManyWithoutPostNestedInput
  }

  export type PostsUncheckedUpdateInput = {
    post_id?: IntFieldUpdateOperationsInput | number
    post_title?: StringFieldUpdateOperationsInput | string
    post_description?: StringFieldUpdateOperationsInput | string
    post_price?: IntFieldUpdateOperationsInput | number
    post_area?: FloatFieldUpdateOperationsInput | number
    price_electricity?: NullableIntFieldUpdateOperationsInput | number | null
    price_water?: NullableIntFieldUpdateOperationsInput | number | null
    price_internet?: NullableIntFieldUpdateOperationsInput | number | null
    post_address?: StringFieldUpdateOperationsInput | string
    post_ward?: NullableStringFieldUpdateOperationsInput | string | null
    post_district?: StringFieldUpdateOperationsInput | string
    post_city?: StringFieldUpdateOperationsInput | string
    category?: EnumPostCategoryFieldUpdateOperationsInput | $Enums.PostCategory
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expired_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    images?: PostImagesUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostsCreateManyInput = {
    post_id?: number
    post_title: string
    post_description: string
    post_price: number
    post_area: number
    price_electricity?: number | null
    price_water?: number | null
    price_internet?: number | null
    post_address: string
    post_ward?: string | null
    post_district: string
    post_city: string
    category?: $Enums.PostCategory
    status?: $Enums.PostStatus
    user_id: bigint | number
    created_at?: Date | string
    expired_at?: Date | string | null
  }

  export type PostsUpdateManyMutationInput = {
    post_title?: StringFieldUpdateOperationsInput | string
    post_description?: StringFieldUpdateOperationsInput | string
    post_price?: IntFieldUpdateOperationsInput | number
    post_area?: FloatFieldUpdateOperationsInput | number
    price_electricity?: NullableIntFieldUpdateOperationsInput | number | null
    price_water?: NullableIntFieldUpdateOperationsInput | number | null
    price_internet?: NullableIntFieldUpdateOperationsInput | number | null
    post_address?: StringFieldUpdateOperationsInput | string
    post_ward?: NullableStringFieldUpdateOperationsInput | string | null
    post_district?: StringFieldUpdateOperationsInput | string
    post_city?: StringFieldUpdateOperationsInput | string
    category?: EnumPostCategoryFieldUpdateOperationsInput | $Enums.PostCategory
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expired_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PostsUncheckedUpdateManyInput = {
    post_id?: IntFieldUpdateOperationsInput | number
    post_title?: StringFieldUpdateOperationsInput | string
    post_description?: StringFieldUpdateOperationsInput | string
    post_price?: IntFieldUpdateOperationsInput | number
    post_area?: FloatFieldUpdateOperationsInput | number
    price_electricity?: NullableIntFieldUpdateOperationsInput | number | null
    price_water?: NullableIntFieldUpdateOperationsInput | number | null
    price_internet?: NullableIntFieldUpdateOperationsInput | number | null
    post_address?: StringFieldUpdateOperationsInput | string
    post_ward?: NullableStringFieldUpdateOperationsInput | string | null
    post_district?: StringFieldUpdateOperationsInput | string
    post_city?: StringFieldUpdateOperationsInput | string
    category?: EnumPostCategoryFieldUpdateOperationsInput | $Enums.PostCategory
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expired_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PostImagesCreateInput = {
    image_url: string
    post: PostsCreateNestedOneWithoutImagesInput
  }

  export type PostImagesUncheckedCreateInput = {
    image_id?: number
    image_url: string
    post_id: number
  }

  export type PostImagesUpdateInput = {
    image_url?: StringFieldUpdateOperationsInput | string
    post?: PostsUpdateOneRequiredWithoutImagesNestedInput
  }

  export type PostImagesUncheckedUpdateInput = {
    image_id?: IntFieldUpdateOperationsInput | number
    image_url?: StringFieldUpdateOperationsInput | string
    post_id?: IntFieldUpdateOperationsInput | number
  }

  export type PostImagesCreateManyInput = {
    image_id?: number
    image_url: string
    post_id: number
  }

  export type PostImagesUpdateManyMutationInput = {
    image_url?: StringFieldUpdateOperationsInput | string
  }

  export type PostImagesUncheckedUpdateManyInput = {
    image_id?: IntFieldUpdateOperationsInput | number
    image_url?: StringFieldUpdateOperationsInput | string
    post_id?: IntFieldUpdateOperationsInput | number
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type Enumusers_user_genderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.users_user_gender | Enumusers_user_genderFieldRefInput<$PrismaModel> | null
    in?: $Enums.users_user_gender[] | null
    notIn?: $Enums.users_user_gender[] | null
    not?: NestedEnumusers_user_genderNullableFilter<$PrismaModel> | $Enums.users_user_gender | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type Enumusers_user_verificationFilter<$PrismaModel = never> = {
    equals?: $Enums.users_user_verification | Enumusers_user_verificationFieldRefInput<$PrismaModel>
    in?: $Enums.users_user_verification[]
    notIn?: $Enums.users_user_verification[]
    not?: NestedEnumusers_user_verificationFilter<$PrismaModel> | $Enums.users_user_verification
  }

  export type Enumusers_user_roleFilter<$PrismaModel = never> = {
    equals?: $Enums.users_user_role | Enumusers_user_roleFieldRefInput<$PrismaModel>
    in?: $Enums.users_user_role[]
    notIn?: $Enums.users_user_role[]
    not?: NestedEnumusers_user_roleFilter<$PrismaModel> | $Enums.users_user_role
  }

  export type PostsListRelationFilter = {
    every?: PostsWhereInput
    some?: PostsWhereInput
    none?: PostsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PostsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsersOrderByRelevanceInput = {
    fields: UsersOrderByRelevanceFieldEnum | UsersOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UsersCountOrderByAggregateInput = {
    user_id?: SortOrder
    user_name?: SortOrder
    user_password?: SortOrder
    user_full_name?: SortOrder
    user_gender?: SortOrder
    user_birthday?: SortOrder
    user_phone?: SortOrder
    user_email?: SortOrder
    user_address?: SortOrder
    user_avatar?: SortOrder
    user_avg_rating?: SortOrder
    user_review_count?: SortOrder
    user_bio?: SortOrder
    user_created_at?: SortOrder
    user_verification?: SortOrder
    user_role?: SortOrder
  }

  export type UsersAvgOrderByAggregateInput = {
    user_id?: SortOrder
    user_avg_rating?: SortOrder
    user_review_count?: SortOrder
  }

  export type UsersMaxOrderByAggregateInput = {
    user_id?: SortOrder
    user_name?: SortOrder
    user_password?: SortOrder
    user_full_name?: SortOrder
    user_gender?: SortOrder
    user_birthday?: SortOrder
    user_phone?: SortOrder
    user_email?: SortOrder
    user_address?: SortOrder
    user_avatar?: SortOrder
    user_avg_rating?: SortOrder
    user_review_count?: SortOrder
    user_bio?: SortOrder
    user_created_at?: SortOrder
    user_verification?: SortOrder
    user_role?: SortOrder
  }

  export type UsersMinOrderByAggregateInput = {
    user_id?: SortOrder
    user_name?: SortOrder
    user_password?: SortOrder
    user_full_name?: SortOrder
    user_gender?: SortOrder
    user_birthday?: SortOrder
    user_phone?: SortOrder
    user_email?: SortOrder
    user_address?: SortOrder
    user_avatar?: SortOrder
    user_avg_rating?: SortOrder
    user_review_count?: SortOrder
    user_bio?: SortOrder
    user_created_at?: SortOrder
    user_verification?: SortOrder
    user_role?: SortOrder
  }

  export type UsersSumOrderByAggregateInput = {
    user_id?: SortOrder
    user_avg_rating?: SortOrder
    user_review_count?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type Enumusers_user_genderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.users_user_gender | Enumusers_user_genderFieldRefInput<$PrismaModel> | null
    in?: $Enums.users_user_gender[] | null
    notIn?: $Enums.users_user_gender[] | null
    not?: NestedEnumusers_user_genderNullableWithAggregatesFilter<$PrismaModel> | $Enums.users_user_gender | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumusers_user_genderNullableFilter<$PrismaModel>
    _max?: NestedEnumusers_user_genderNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type Enumusers_user_verificationWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.users_user_verification | Enumusers_user_verificationFieldRefInput<$PrismaModel>
    in?: $Enums.users_user_verification[]
    notIn?: $Enums.users_user_verification[]
    not?: NestedEnumusers_user_verificationWithAggregatesFilter<$PrismaModel> | $Enums.users_user_verification
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumusers_user_verificationFilter<$PrismaModel>
    _max?: NestedEnumusers_user_verificationFilter<$PrismaModel>
  }

  export type Enumusers_user_roleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.users_user_role | Enumusers_user_roleFieldRefInput<$PrismaModel>
    in?: $Enums.users_user_role[]
    notIn?: $Enums.users_user_role[]
    not?: NestedEnumusers_user_roleWithAggregatesFilter<$PrismaModel> | $Enums.users_user_role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumusers_user_roleFilter<$PrismaModel>
    _max?: NestedEnumusers_user_roleFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EnumPostCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.PostCategory | EnumPostCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PostCategory[]
    notIn?: $Enums.PostCategory[]
    not?: NestedEnumPostCategoryFilter<$PrismaModel> | $Enums.PostCategory
  }

  export type EnumPostStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PostStatus | EnumPostStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PostStatus[]
    notIn?: $Enums.PostStatus[]
    not?: NestedEnumPostStatusFilter<$PrismaModel> | $Enums.PostStatus
  }

  export type UsersScalarRelationFilter = {
    is?: UsersWhereInput
    isNot?: UsersWhereInput
  }

  export type PostImagesListRelationFilter = {
    every?: PostImagesWhereInput
    some?: PostImagesWhereInput
    none?: PostImagesWhereInput
  }

  export type PostImagesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostsOrderByRelevanceInput = {
    fields: PostsOrderByRelevanceFieldEnum | PostsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PostsCountOrderByAggregateInput = {
    post_id?: SortOrder
    post_title?: SortOrder
    post_description?: SortOrder
    post_price?: SortOrder
    post_area?: SortOrder
    price_electricity?: SortOrder
    price_water?: SortOrder
    price_internet?: SortOrder
    post_address?: SortOrder
    post_ward?: SortOrder
    post_district?: SortOrder
    post_city?: SortOrder
    category?: SortOrder
    status?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    expired_at?: SortOrder
  }

  export type PostsAvgOrderByAggregateInput = {
    post_id?: SortOrder
    post_price?: SortOrder
    post_area?: SortOrder
    price_electricity?: SortOrder
    price_water?: SortOrder
    price_internet?: SortOrder
    user_id?: SortOrder
  }

  export type PostsMaxOrderByAggregateInput = {
    post_id?: SortOrder
    post_title?: SortOrder
    post_description?: SortOrder
    post_price?: SortOrder
    post_area?: SortOrder
    price_electricity?: SortOrder
    price_water?: SortOrder
    price_internet?: SortOrder
    post_address?: SortOrder
    post_ward?: SortOrder
    post_district?: SortOrder
    post_city?: SortOrder
    category?: SortOrder
    status?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    expired_at?: SortOrder
  }

  export type PostsMinOrderByAggregateInput = {
    post_id?: SortOrder
    post_title?: SortOrder
    post_description?: SortOrder
    post_price?: SortOrder
    post_area?: SortOrder
    price_electricity?: SortOrder
    price_water?: SortOrder
    price_internet?: SortOrder
    post_address?: SortOrder
    post_ward?: SortOrder
    post_district?: SortOrder
    post_city?: SortOrder
    category?: SortOrder
    status?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    expired_at?: SortOrder
  }

  export type PostsSumOrderByAggregateInput = {
    post_id?: SortOrder
    post_price?: SortOrder
    post_area?: SortOrder
    price_electricity?: SortOrder
    price_water?: SortOrder
    price_internet?: SortOrder
    user_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumPostCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PostCategory | EnumPostCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PostCategory[]
    notIn?: $Enums.PostCategory[]
    not?: NestedEnumPostCategoryWithAggregatesFilter<$PrismaModel> | $Enums.PostCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPostCategoryFilter<$PrismaModel>
    _max?: NestedEnumPostCategoryFilter<$PrismaModel>
  }

  export type EnumPostStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PostStatus | EnumPostStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PostStatus[]
    notIn?: $Enums.PostStatus[]
    not?: NestedEnumPostStatusWithAggregatesFilter<$PrismaModel> | $Enums.PostStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPostStatusFilter<$PrismaModel>
    _max?: NestedEnumPostStatusFilter<$PrismaModel>
  }

  export type PostsScalarRelationFilter = {
    is?: PostsWhereInput
    isNot?: PostsWhereInput
  }

  export type PostImagesOrderByRelevanceInput = {
    fields: PostImagesOrderByRelevanceFieldEnum | PostImagesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PostImagesCountOrderByAggregateInput = {
    image_id?: SortOrder
    image_url?: SortOrder
    post_id?: SortOrder
  }

  export type PostImagesAvgOrderByAggregateInput = {
    image_id?: SortOrder
    post_id?: SortOrder
  }

  export type PostImagesMaxOrderByAggregateInput = {
    image_id?: SortOrder
    image_url?: SortOrder
    post_id?: SortOrder
  }

  export type PostImagesMinOrderByAggregateInput = {
    image_id?: SortOrder
    image_url?: SortOrder
    post_id?: SortOrder
  }

  export type PostImagesSumOrderByAggregateInput = {
    image_id?: SortOrder
    post_id?: SortOrder
  }

  export type PostsCreateNestedManyWithoutUserInput = {
    create?: XOR<PostsCreateWithoutUserInput, PostsUncheckedCreateWithoutUserInput> | PostsCreateWithoutUserInput[] | PostsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostsCreateOrConnectWithoutUserInput | PostsCreateOrConnectWithoutUserInput[]
    createMany?: PostsCreateManyUserInputEnvelope
    connect?: PostsWhereUniqueInput | PostsWhereUniqueInput[]
  }

  export type PostsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PostsCreateWithoutUserInput, PostsUncheckedCreateWithoutUserInput> | PostsCreateWithoutUserInput[] | PostsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostsCreateOrConnectWithoutUserInput | PostsCreateOrConnectWithoutUserInput[]
    createMany?: PostsCreateManyUserInputEnvelope
    connect?: PostsWhereUniqueInput | PostsWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableEnumusers_user_genderFieldUpdateOperationsInput = {
    set?: $Enums.users_user_gender | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type Enumusers_user_verificationFieldUpdateOperationsInput = {
    set?: $Enums.users_user_verification
  }

  export type Enumusers_user_roleFieldUpdateOperationsInput = {
    set?: $Enums.users_user_role
  }

  export type PostsUpdateManyWithoutUserNestedInput = {
    create?: XOR<PostsCreateWithoutUserInput, PostsUncheckedCreateWithoutUserInput> | PostsCreateWithoutUserInput[] | PostsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostsCreateOrConnectWithoutUserInput | PostsCreateOrConnectWithoutUserInput[]
    upsert?: PostsUpsertWithWhereUniqueWithoutUserInput | PostsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PostsCreateManyUserInputEnvelope
    set?: PostsWhereUniqueInput | PostsWhereUniqueInput[]
    disconnect?: PostsWhereUniqueInput | PostsWhereUniqueInput[]
    delete?: PostsWhereUniqueInput | PostsWhereUniqueInput[]
    connect?: PostsWhereUniqueInput | PostsWhereUniqueInput[]
    update?: PostsUpdateWithWhereUniqueWithoutUserInput | PostsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PostsUpdateManyWithWhereWithoutUserInput | PostsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PostsScalarWhereInput | PostsScalarWhereInput[]
  }

  export type PostsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PostsCreateWithoutUserInput, PostsUncheckedCreateWithoutUserInput> | PostsCreateWithoutUserInput[] | PostsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostsCreateOrConnectWithoutUserInput | PostsCreateOrConnectWithoutUserInput[]
    upsert?: PostsUpsertWithWhereUniqueWithoutUserInput | PostsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PostsCreateManyUserInputEnvelope
    set?: PostsWhereUniqueInput | PostsWhereUniqueInput[]
    disconnect?: PostsWhereUniqueInput | PostsWhereUniqueInput[]
    delete?: PostsWhereUniqueInput | PostsWhereUniqueInput[]
    connect?: PostsWhereUniqueInput | PostsWhereUniqueInput[]
    update?: PostsUpdateWithWhereUniqueWithoutUserInput | PostsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PostsUpdateManyWithWhereWithoutUserInput | PostsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PostsScalarWhereInput | PostsScalarWhereInput[]
  }

  export type UsersCreateNestedOneWithoutPostsInput = {
    create?: XOR<UsersCreateWithoutPostsInput, UsersUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UsersCreateOrConnectWithoutPostsInput
    connect?: UsersWhereUniqueInput
  }

  export type PostImagesCreateNestedManyWithoutPostInput = {
    create?: XOR<PostImagesCreateWithoutPostInput, PostImagesUncheckedCreateWithoutPostInput> | PostImagesCreateWithoutPostInput[] | PostImagesUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostImagesCreateOrConnectWithoutPostInput | PostImagesCreateOrConnectWithoutPostInput[]
    createMany?: PostImagesCreateManyPostInputEnvelope
    connect?: PostImagesWhereUniqueInput | PostImagesWhereUniqueInput[]
  }

  export type PostImagesUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<PostImagesCreateWithoutPostInput, PostImagesUncheckedCreateWithoutPostInput> | PostImagesCreateWithoutPostInput[] | PostImagesUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostImagesCreateOrConnectWithoutPostInput | PostImagesCreateOrConnectWithoutPostInput[]
    createMany?: PostImagesCreateManyPostInputEnvelope
    connect?: PostImagesWhereUniqueInput | PostImagesWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumPostCategoryFieldUpdateOperationsInput = {
    set?: $Enums.PostCategory
  }

  export type EnumPostStatusFieldUpdateOperationsInput = {
    set?: $Enums.PostStatus
  }

  export type UsersUpdateOneRequiredWithoutPostsNestedInput = {
    create?: XOR<UsersCreateWithoutPostsInput, UsersUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UsersCreateOrConnectWithoutPostsInput
    upsert?: UsersUpsertWithoutPostsInput
    connect?: UsersWhereUniqueInput
    update?: XOR<XOR<UsersUpdateToOneWithWhereWithoutPostsInput, UsersUpdateWithoutPostsInput>, UsersUncheckedUpdateWithoutPostsInput>
  }

  export type PostImagesUpdateManyWithoutPostNestedInput = {
    create?: XOR<PostImagesCreateWithoutPostInput, PostImagesUncheckedCreateWithoutPostInput> | PostImagesCreateWithoutPostInput[] | PostImagesUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostImagesCreateOrConnectWithoutPostInput | PostImagesCreateOrConnectWithoutPostInput[]
    upsert?: PostImagesUpsertWithWhereUniqueWithoutPostInput | PostImagesUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: PostImagesCreateManyPostInputEnvelope
    set?: PostImagesWhereUniqueInput | PostImagesWhereUniqueInput[]
    disconnect?: PostImagesWhereUniqueInput | PostImagesWhereUniqueInput[]
    delete?: PostImagesWhereUniqueInput | PostImagesWhereUniqueInput[]
    connect?: PostImagesWhereUniqueInput | PostImagesWhereUniqueInput[]
    update?: PostImagesUpdateWithWhereUniqueWithoutPostInput | PostImagesUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: PostImagesUpdateManyWithWhereWithoutPostInput | PostImagesUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: PostImagesScalarWhereInput | PostImagesScalarWhereInput[]
  }

  export type PostImagesUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<PostImagesCreateWithoutPostInput, PostImagesUncheckedCreateWithoutPostInput> | PostImagesCreateWithoutPostInput[] | PostImagesUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostImagesCreateOrConnectWithoutPostInput | PostImagesCreateOrConnectWithoutPostInput[]
    upsert?: PostImagesUpsertWithWhereUniqueWithoutPostInput | PostImagesUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: PostImagesCreateManyPostInputEnvelope
    set?: PostImagesWhereUniqueInput | PostImagesWhereUniqueInput[]
    disconnect?: PostImagesWhereUniqueInput | PostImagesWhereUniqueInput[]
    delete?: PostImagesWhereUniqueInput | PostImagesWhereUniqueInput[]
    connect?: PostImagesWhereUniqueInput | PostImagesWhereUniqueInput[]
    update?: PostImagesUpdateWithWhereUniqueWithoutPostInput | PostImagesUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: PostImagesUpdateManyWithWhereWithoutPostInput | PostImagesUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: PostImagesScalarWhereInput | PostImagesScalarWhereInput[]
  }

  export type PostsCreateNestedOneWithoutImagesInput = {
    create?: XOR<PostsCreateWithoutImagesInput, PostsUncheckedCreateWithoutImagesInput>
    connectOrCreate?: PostsCreateOrConnectWithoutImagesInput
    connect?: PostsWhereUniqueInput
  }

  export type PostsUpdateOneRequiredWithoutImagesNestedInput = {
    create?: XOR<PostsCreateWithoutImagesInput, PostsUncheckedCreateWithoutImagesInput>
    connectOrCreate?: PostsCreateOrConnectWithoutImagesInput
    upsert?: PostsUpsertWithoutImagesInput
    connect?: PostsWhereUniqueInput
    update?: XOR<XOR<PostsUpdateToOneWithWhereWithoutImagesInput, PostsUpdateWithoutImagesInput>, PostsUncheckedUpdateWithoutImagesInput>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumusers_user_genderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.users_user_gender | Enumusers_user_genderFieldRefInput<$PrismaModel> | null
    in?: $Enums.users_user_gender[] | null
    notIn?: $Enums.users_user_gender[] | null
    not?: NestedEnumusers_user_genderNullableFilter<$PrismaModel> | $Enums.users_user_gender | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumusers_user_verificationFilter<$PrismaModel = never> = {
    equals?: $Enums.users_user_verification | Enumusers_user_verificationFieldRefInput<$PrismaModel>
    in?: $Enums.users_user_verification[]
    notIn?: $Enums.users_user_verification[]
    not?: NestedEnumusers_user_verificationFilter<$PrismaModel> | $Enums.users_user_verification
  }

  export type NestedEnumusers_user_roleFilter<$PrismaModel = never> = {
    equals?: $Enums.users_user_role | Enumusers_user_roleFieldRefInput<$PrismaModel>
    in?: $Enums.users_user_role[]
    notIn?: $Enums.users_user_role[]
    not?: NestedEnumusers_user_roleFilter<$PrismaModel> | $Enums.users_user_role
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumusers_user_genderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.users_user_gender | Enumusers_user_genderFieldRefInput<$PrismaModel> | null
    in?: $Enums.users_user_gender[] | null
    notIn?: $Enums.users_user_gender[] | null
    not?: NestedEnumusers_user_genderNullableWithAggregatesFilter<$PrismaModel> | $Enums.users_user_gender | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumusers_user_genderNullableFilter<$PrismaModel>
    _max?: NestedEnumusers_user_genderNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumusers_user_verificationWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.users_user_verification | Enumusers_user_verificationFieldRefInput<$PrismaModel>
    in?: $Enums.users_user_verification[]
    notIn?: $Enums.users_user_verification[]
    not?: NestedEnumusers_user_verificationWithAggregatesFilter<$PrismaModel> | $Enums.users_user_verification
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumusers_user_verificationFilter<$PrismaModel>
    _max?: NestedEnumusers_user_verificationFilter<$PrismaModel>
  }

  export type NestedEnumusers_user_roleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.users_user_role | Enumusers_user_roleFieldRefInput<$PrismaModel>
    in?: $Enums.users_user_role[]
    notIn?: $Enums.users_user_role[]
    not?: NestedEnumusers_user_roleWithAggregatesFilter<$PrismaModel> | $Enums.users_user_role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumusers_user_roleFilter<$PrismaModel>
    _max?: NestedEnumusers_user_roleFilter<$PrismaModel>
  }

  export type NestedEnumPostCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.PostCategory | EnumPostCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PostCategory[]
    notIn?: $Enums.PostCategory[]
    not?: NestedEnumPostCategoryFilter<$PrismaModel> | $Enums.PostCategory
  }

  export type NestedEnumPostStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PostStatus | EnumPostStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PostStatus[]
    notIn?: $Enums.PostStatus[]
    not?: NestedEnumPostStatusFilter<$PrismaModel> | $Enums.PostStatus
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumPostCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PostCategory | EnumPostCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PostCategory[]
    notIn?: $Enums.PostCategory[]
    not?: NestedEnumPostCategoryWithAggregatesFilter<$PrismaModel> | $Enums.PostCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPostCategoryFilter<$PrismaModel>
    _max?: NestedEnumPostCategoryFilter<$PrismaModel>
  }

  export type NestedEnumPostStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PostStatus | EnumPostStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PostStatus[]
    notIn?: $Enums.PostStatus[]
    not?: NestedEnumPostStatusWithAggregatesFilter<$PrismaModel> | $Enums.PostStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPostStatusFilter<$PrismaModel>
    _max?: NestedEnumPostStatusFilter<$PrismaModel>
  }

  export type PostsCreateWithoutUserInput = {
    post_title: string
    post_description: string
    post_price: number
    post_area: number
    price_electricity?: number | null
    price_water?: number | null
    price_internet?: number | null
    post_address: string
    post_ward?: string | null
    post_district: string
    post_city: string
    category?: $Enums.PostCategory
    status?: $Enums.PostStatus
    created_at?: Date | string
    expired_at?: Date | string | null
    images?: PostImagesCreateNestedManyWithoutPostInput
  }

  export type PostsUncheckedCreateWithoutUserInput = {
    post_id?: number
    post_title: string
    post_description: string
    post_price: number
    post_area: number
    price_electricity?: number | null
    price_water?: number | null
    price_internet?: number | null
    post_address: string
    post_ward?: string | null
    post_district: string
    post_city: string
    category?: $Enums.PostCategory
    status?: $Enums.PostStatus
    created_at?: Date | string
    expired_at?: Date | string | null
    images?: PostImagesUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostsCreateOrConnectWithoutUserInput = {
    where: PostsWhereUniqueInput
    create: XOR<PostsCreateWithoutUserInput, PostsUncheckedCreateWithoutUserInput>
  }

  export type PostsCreateManyUserInputEnvelope = {
    data: PostsCreateManyUserInput | PostsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PostsUpsertWithWhereUniqueWithoutUserInput = {
    where: PostsWhereUniqueInput
    update: XOR<PostsUpdateWithoutUserInput, PostsUncheckedUpdateWithoutUserInput>
    create: XOR<PostsCreateWithoutUserInput, PostsUncheckedCreateWithoutUserInput>
  }

  export type PostsUpdateWithWhereUniqueWithoutUserInput = {
    where: PostsWhereUniqueInput
    data: XOR<PostsUpdateWithoutUserInput, PostsUncheckedUpdateWithoutUserInput>
  }

  export type PostsUpdateManyWithWhereWithoutUserInput = {
    where: PostsScalarWhereInput
    data: XOR<PostsUpdateManyMutationInput, PostsUncheckedUpdateManyWithoutUserInput>
  }

  export type PostsScalarWhereInput = {
    AND?: PostsScalarWhereInput | PostsScalarWhereInput[]
    OR?: PostsScalarWhereInput[]
    NOT?: PostsScalarWhereInput | PostsScalarWhereInput[]
    post_id?: IntFilter<"Posts"> | number
    post_title?: StringFilter<"Posts"> | string
    post_description?: StringFilter<"Posts"> | string
    post_price?: IntFilter<"Posts"> | number
    post_area?: FloatFilter<"Posts"> | number
    price_electricity?: IntNullableFilter<"Posts"> | number | null
    price_water?: IntNullableFilter<"Posts"> | number | null
    price_internet?: IntNullableFilter<"Posts"> | number | null
    post_address?: StringFilter<"Posts"> | string
    post_ward?: StringNullableFilter<"Posts"> | string | null
    post_district?: StringFilter<"Posts"> | string
    post_city?: StringFilter<"Posts"> | string
    category?: EnumPostCategoryFilter<"Posts"> | $Enums.PostCategory
    status?: EnumPostStatusFilter<"Posts"> | $Enums.PostStatus
    user_id?: BigIntFilter<"Posts"> | bigint | number
    created_at?: DateTimeFilter<"Posts"> | Date | string
    expired_at?: DateTimeNullableFilter<"Posts"> | Date | string | null
  }

  export type UsersCreateWithoutPostsInput = {
    user_id?: bigint | number
    user_name: string
    user_password: string
    user_full_name?: string | null
    user_gender?: $Enums.users_user_gender | null
    user_birthday?: Date | string | null
    user_phone?: string | null
    user_email: string
    user_address?: string | null
    user_avatar?: string | null
    user_avg_rating?: Decimal | DecimalJsLike | number | string | null
    user_review_count?: number | null
    user_bio?: string | null
    user_created_at?: Date | string
    user_verification?: $Enums.users_user_verification
    user_role: $Enums.users_user_role
  }

  export type UsersUncheckedCreateWithoutPostsInput = {
    user_id?: bigint | number
    user_name: string
    user_password: string
    user_full_name?: string | null
    user_gender?: $Enums.users_user_gender | null
    user_birthday?: Date | string | null
    user_phone?: string | null
    user_email: string
    user_address?: string | null
    user_avatar?: string | null
    user_avg_rating?: Decimal | DecimalJsLike | number | string | null
    user_review_count?: number | null
    user_bio?: string | null
    user_created_at?: Date | string
    user_verification?: $Enums.users_user_verification
    user_role: $Enums.users_user_role
  }

  export type UsersCreateOrConnectWithoutPostsInput = {
    where: UsersWhereUniqueInput
    create: XOR<UsersCreateWithoutPostsInput, UsersUncheckedCreateWithoutPostsInput>
  }

  export type PostImagesCreateWithoutPostInput = {
    image_url: string
  }

  export type PostImagesUncheckedCreateWithoutPostInput = {
    image_id?: number
    image_url: string
  }

  export type PostImagesCreateOrConnectWithoutPostInput = {
    where: PostImagesWhereUniqueInput
    create: XOR<PostImagesCreateWithoutPostInput, PostImagesUncheckedCreateWithoutPostInput>
  }

  export type PostImagesCreateManyPostInputEnvelope = {
    data: PostImagesCreateManyPostInput | PostImagesCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type UsersUpsertWithoutPostsInput = {
    update: XOR<UsersUpdateWithoutPostsInput, UsersUncheckedUpdateWithoutPostsInput>
    create: XOR<UsersCreateWithoutPostsInput, UsersUncheckedCreateWithoutPostsInput>
    where?: UsersWhereInput
  }

  export type UsersUpdateToOneWithWhereWithoutPostsInput = {
    where?: UsersWhereInput
    data: XOR<UsersUpdateWithoutPostsInput, UsersUncheckedUpdateWithoutPostsInput>
  }

  export type UsersUpdateWithoutPostsInput = {
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_name?: StringFieldUpdateOperationsInput | string
    user_password?: StringFieldUpdateOperationsInput | string
    user_full_name?: NullableStringFieldUpdateOperationsInput | string | null
    user_gender?: NullableEnumusers_user_genderFieldUpdateOperationsInput | $Enums.users_user_gender | null
    user_birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_phone?: NullableStringFieldUpdateOperationsInput | string | null
    user_email?: StringFieldUpdateOperationsInput | string
    user_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_avatar?: NullableStringFieldUpdateOperationsInput | string | null
    user_avg_rating?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    user_review_count?: NullableIntFieldUpdateOperationsInput | number | null
    user_bio?: NullableStringFieldUpdateOperationsInput | string | null
    user_created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_verification?: Enumusers_user_verificationFieldUpdateOperationsInput | $Enums.users_user_verification
    user_role?: Enumusers_user_roleFieldUpdateOperationsInput | $Enums.users_user_role
  }

  export type UsersUncheckedUpdateWithoutPostsInput = {
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_name?: StringFieldUpdateOperationsInput | string
    user_password?: StringFieldUpdateOperationsInput | string
    user_full_name?: NullableStringFieldUpdateOperationsInput | string | null
    user_gender?: NullableEnumusers_user_genderFieldUpdateOperationsInput | $Enums.users_user_gender | null
    user_birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_phone?: NullableStringFieldUpdateOperationsInput | string | null
    user_email?: StringFieldUpdateOperationsInput | string
    user_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_avatar?: NullableStringFieldUpdateOperationsInput | string | null
    user_avg_rating?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    user_review_count?: NullableIntFieldUpdateOperationsInput | number | null
    user_bio?: NullableStringFieldUpdateOperationsInput | string | null
    user_created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_verification?: Enumusers_user_verificationFieldUpdateOperationsInput | $Enums.users_user_verification
    user_role?: Enumusers_user_roleFieldUpdateOperationsInput | $Enums.users_user_role
  }

  export type PostImagesUpsertWithWhereUniqueWithoutPostInput = {
    where: PostImagesWhereUniqueInput
    update: XOR<PostImagesUpdateWithoutPostInput, PostImagesUncheckedUpdateWithoutPostInput>
    create: XOR<PostImagesCreateWithoutPostInput, PostImagesUncheckedCreateWithoutPostInput>
  }

  export type PostImagesUpdateWithWhereUniqueWithoutPostInput = {
    where: PostImagesWhereUniqueInput
    data: XOR<PostImagesUpdateWithoutPostInput, PostImagesUncheckedUpdateWithoutPostInput>
  }

  export type PostImagesUpdateManyWithWhereWithoutPostInput = {
    where: PostImagesScalarWhereInput
    data: XOR<PostImagesUpdateManyMutationInput, PostImagesUncheckedUpdateManyWithoutPostInput>
  }

  export type PostImagesScalarWhereInput = {
    AND?: PostImagesScalarWhereInput | PostImagesScalarWhereInput[]
    OR?: PostImagesScalarWhereInput[]
    NOT?: PostImagesScalarWhereInput | PostImagesScalarWhereInput[]
    image_id?: IntFilter<"PostImages"> | number
    image_url?: StringFilter<"PostImages"> | string
    post_id?: IntFilter<"PostImages"> | number
  }

  export type PostsCreateWithoutImagesInput = {
    post_title: string
    post_description: string
    post_price: number
    post_area: number
    price_electricity?: number | null
    price_water?: number | null
    price_internet?: number | null
    post_address: string
    post_ward?: string | null
    post_district: string
    post_city: string
    category?: $Enums.PostCategory
    status?: $Enums.PostStatus
    created_at?: Date | string
    expired_at?: Date | string | null
    user: UsersCreateNestedOneWithoutPostsInput
  }

  export type PostsUncheckedCreateWithoutImagesInput = {
    post_id?: number
    post_title: string
    post_description: string
    post_price: number
    post_area: number
    price_electricity?: number | null
    price_water?: number | null
    price_internet?: number | null
    post_address: string
    post_ward?: string | null
    post_district: string
    post_city: string
    category?: $Enums.PostCategory
    status?: $Enums.PostStatus
    user_id: bigint | number
    created_at?: Date | string
    expired_at?: Date | string | null
  }

  export type PostsCreateOrConnectWithoutImagesInput = {
    where: PostsWhereUniqueInput
    create: XOR<PostsCreateWithoutImagesInput, PostsUncheckedCreateWithoutImagesInput>
  }

  export type PostsUpsertWithoutImagesInput = {
    update: XOR<PostsUpdateWithoutImagesInput, PostsUncheckedUpdateWithoutImagesInput>
    create: XOR<PostsCreateWithoutImagesInput, PostsUncheckedCreateWithoutImagesInput>
    where?: PostsWhereInput
  }

  export type PostsUpdateToOneWithWhereWithoutImagesInput = {
    where?: PostsWhereInput
    data: XOR<PostsUpdateWithoutImagesInput, PostsUncheckedUpdateWithoutImagesInput>
  }

  export type PostsUpdateWithoutImagesInput = {
    post_title?: StringFieldUpdateOperationsInput | string
    post_description?: StringFieldUpdateOperationsInput | string
    post_price?: IntFieldUpdateOperationsInput | number
    post_area?: FloatFieldUpdateOperationsInput | number
    price_electricity?: NullableIntFieldUpdateOperationsInput | number | null
    price_water?: NullableIntFieldUpdateOperationsInput | number | null
    price_internet?: NullableIntFieldUpdateOperationsInput | number | null
    post_address?: StringFieldUpdateOperationsInput | string
    post_ward?: NullableStringFieldUpdateOperationsInput | string | null
    post_district?: StringFieldUpdateOperationsInput | string
    post_city?: StringFieldUpdateOperationsInput | string
    category?: EnumPostCategoryFieldUpdateOperationsInput | $Enums.PostCategory
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expired_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UsersUpdateOneRequiredWithoutPostsNestedInput
  }

  export type PostsUncheckedUpdateWithoutImagesInput = {
    post_id?: IntFieldUpdateOperationsInput | number
    post_title?: StringFieldUpdateOperationsInput | string
    post_description?: StringFieldUpdateOperationsInput | string
    post_price?: IntFieldUpdateOperationsInput | number
    post_area?: FloatFieldUpdateOperationsInput | number
    price_electricity?: NullableIntFieldUpdateOperationsInput | number | null
    price_water?: NullableIntFieldUpdateOperationsInput | number | null
    price_internet?: NullableIntFieldUpdateOperationsInput | number | null
    post_address?: StringFieldUpdateOperationsInput | string
    post_ward?: NullableStringFieldUpdateOperationsInput | string | null
    post_district?: StringFieldUpdateOperationsInput | string
    post_city?: StringFieldUpdateOperationsInput | string
    category?: EnumPostCategoryFieldUpdateOperationsInput | $Enums.PostCategory
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    user_id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expired_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PostsCreateManyUserInput = {
    post_id?: number
    post_title: string
    post_description: string
    post_price: number
    post_area: number
    price_electricity?: number | null
    price_water?: number | null
    price_internet?: number | null
    post_address: string
    post_ward?: string | null
    post_district: string
    post_city: string
    category?: $Enums.PostCategory
    status?: $Enums.PostStatus
    created_at?: Date | string
    expired_at?: Date | string | null
  }

  export type PostsUpdateWithoutUserInput = {
    post_title?: StringFieldUpdateOperationsInput | string
    post_description?: StringFieldUpdateOperationsInput | string
    post_price?: IntFieldUpdateOperationsInput | number
    post_area?: FloatFieldUpdateOperationsInput | number
    price_electricity?: NullableIntFieldUpdateOperationsInput | number | null
    price_water?: NullableIntFieldUpdateOperationsInput | number | null
    price_internet?: NullableIntFieldUpdateOperationsInput | number | null
    post_address?: StringFieldUpdateOperationsInput | string
    post_ward?: NullableStringFieldUpdateOperationsInput | string | null
    post_district?: StringFieldUpdateOperationsInput | string
    post_city?: StringFieldUpdateOperationsInput | string
    category?: EnumPostCategoryFieldUpdateOperationsInput | $Enums.PostCategory
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expired_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    images?: PostImagesUpdateManyWithoutPostNestedInput
  }

  export type PostsUncheckedUpdateWithoutUserInput = {
    post_id?: IntFieldUpdateOperationsInput | number
    post_title?: StringFieldUpdateOperationsInput | string
    post_description?: StringFieldUpdateOperationsInput | string
    post_price?: IntFieldUpdateOperationsInput | number
    post_area?: FloatFieldUpdateOperationsInput | number
    price_electricity?: NullableIntFieldUpdateOperationsInput | number | null
    price_water?: NullableIntFieldUpdateOperationsInput | number | null
    price_internet?: NullableIntFieldUpdateOperationsInput | number | null
    post_address?: StringFieldUpdateOperationsInput | string
    post_ward?: NullableStringFieldUpdateOperationsInput | string | null
    post_district?: StringFieldUpdateOperationsInput | string
    post_city?: StringFieldUpdateOperationsInput | string
    category?: EnumPostCategoryFieldUpdateOperationsInput | $Enums.PostCategory
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expired_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    images?: PostImagesUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostsUncheckedUpdateManyWithoutUserInput = {
    post_id?: IntFieldUpdateOperationsInput | number
    post_title?: StringFieldUpdateOperationsInput | string
    post_description?: StringFieldUpdateOperationsInput | string
    post_price?: IntFieldUpdateOperationsInput | number
    post_area?: FloatFieldUpdateOperationsInput | number
    price_electricity?: NullableIntFieldUpdateOperationsInput | number | null
    price_water?: NullableIntFieldUpdateOperationsInput | number | null
    price_internet?: NullableIntFieldUpdateOperationsInput | number | null
    post_address?: StringFieldUpdateOperationsInput | string
    post_ward?: NullableStringFieldUpdateOperationsInput | string | null
    post_district?: StringFieldUpdateOperationsInput | string
    post_city?: StringFieldUpdateOperationsInput | string
    category?: EnumPostCategoryFieldUpdateOperationsInput | $Enums.PostCategory
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expired_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PostImagesCreateManyPostInput = {
    image_id?: number
    image_url: string
  }

  export type PostImagesUpdateWithoutPostInput = {
    image_url?: StringFieldUpdateOperationsInput | string
  }

  export type PostImagesUncheckedUpdateWithoutPostInput = {
    image_id?: IntFieldUpdateOperationsInput | number
    image_url?: StringFieldUpdateOperationsInput | string
  }

  export type PostImagesUncheckedUpdateManyWithoutPostInput = {
    image_id?: IntFieldUpdateOperationsInput | number
    image_url?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}