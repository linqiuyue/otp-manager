import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };

      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": []
  }
};
      export default result;
    
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};


export type Item = {
  __typename?: 'Item';
  backupCodes?: Maybe<Scalars['String']>;
  createAt: Scalars['DateTime'];
  name: Scalars['String'];
  secret: Scalars['String'];
  token: Scalars['String'];
  updateAt: Scalars['DateTime'];
};

export type ItemInput = {
  backupCodes?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  secret: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createItem: Item;
  updateItem: Item;
};


export type MutationCreateItemArgs = {
  input: ItemInput;
};


export type MutationUpdateItemArgs = {
  input: ItemInput;
  token: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  item: Item;
};


export type QueryItemArgs = {
  name: Scalars['String'];
};

export type ItemFragment = (
  { __typename?: 'Item' }
  & Pick<Item, 'token' | 'name' | 'secret' | 'backupCodes' | 'createAt' | 'updateAt'>
);

export type CreateItemMutationVariables = Exact<{
  input: ItemInput;
}>;


export type CreateItemMutation = (
  { __typename?: 'Mutation' }
  & { createItem: (
    { __typename?: 'Item' }
    & ItemFragment
  ) }
);

export type UpdateItemMutationVariables = Exact<{
  token: Scalars['String'];
  input: ItemInput;
}>;


export type UpdateItemMutation = (
  { __typename?: 'Mutation' }
  & { updateItem: (
    { __typename?: 'Item' }
    & ItemFragment
  ) }
);

export type ItemQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type ItemQuery = (
  { __typename?: 'Query' }
  & { item: (
    { __typename?: 'Item' }
    & ItemFragment
  ) }
);

export const ItemFragmentDoc = gql`
    fragment Item on Item {
  token
  name
  secret
  backupCodes
  createAt
  updateAt
}
    `;
export const CreateItemDocument = gql`
    mutation CreateItem($input: ItemInput!) {
  createItem(input: $input) {
    ...Item
  }
}
    ${ItemFragmentDoc}`;
export type CreateItemMutationFn = Apollo.MutationFunction<CreateItemMutation, CreateItemMutationVariables>;

/**
 * __useCreateItemMutation__
 *
 * To run a mutation, you first call `useCreateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createItemMutation, { data, loading, error }] = useCreateItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateItemMutation(baseOptions?: Apollo.MutationHookOptions<CreateItemMutation, CreateItemMutationVariables>) {
        return Apollo.useMutation<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument, baseOptions);
      }
export type CreateItemMutationHookResult = ReturnType<typeof useCreateItemMutation>;
export type CreateItemMutationResult = Apollo.MutationResult<CreateItemMutation>;
export type CreateItemMutationOptions = Apollo.BaseMutationOptions<CreateItemMutation, CreateItemMutationVariables>;
export const UpdateItemDocument = gql`
    mutation UpdateItem($token: String!, $input: ItemInput!) {
  updateItem(token: $token, input: $input) {
    ...Item
  }
}
    ${ItemFragmentDoc}`;
export type UpdateItemMutationFn = Apollo.MutationFunction<UpdateItemMutation, UpdateItemMutationVariables>;

/**
 * __useUpdateItemMutation__
 *
 * To run a mutation, you first call `useUpdateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateItemMutation, { data, loading, error }] = useUpdateItemMutation({
 *   variables: {
 *      token: // value for 'token'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateItemMutation(baseOptions?: Apollo.MutationHookOptions<UpdateItemMutation, UpdateItemMutationVariables>) {
        return Apollo.useMutation<UpdateItemMutation, UpdateItemMutationVariables>(UpdateItemDocument, baseOptions);
      }
export type UpdateItemMutationHookResult = ReturnType<typeof useUpdateItemMutation>;
export type UpdateItemMutationResult = Apollo.MutationResult<UpdateItemMutation>;
export type UpdateItemMutationOptions = Apollo.BaseMutationOptions<UpdateItemMutation, UpdateItemMutationVariables>;
export const ItemDocument = gql`
    query Item($name: String!) {
  item(name: $name) {
    ...Item
  }
}
    ${ItemFragmentDoc}`;

/**
 * __useItemQuery__
 *
 * To run a query within a React component, call `useItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useItemQuery(baseOptions?: Apollo.QueryHookOptions<ItemQuery, ItemQueryVariables>) {
        return Apollo.useQuery<ItemQuery, ItemQueryVariables>(ItemDocument, baseOptions);
      }
export function useItemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ItemQuery, ItemQueryVariables>) {
          return Apollo.useLazyQuery<ItemQuery, ItemQueryVariables>(ItemDocument, baseOptions);
        }
export type ItemQueryHookResult = ReturnType<typeof useItemQuery>;
export type ItemLazyQueryHookResult = ReturnType<typeof useItemLazyQuery>;
export type ItemQueryResult = Apollo.QueryResult<ItemQuery, ItemQueryVariables>;