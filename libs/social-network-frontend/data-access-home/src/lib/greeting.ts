import { api } from '@sn-htc/shared/data-access';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  greeting?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  greeting?: Maybe<Scalars['Int']>;
};

export type GreetingQueryVariables = Exact<{ [key: string]: never; }>;


export type GreetingQuery = { __typename?: 'Query', greeting?: string | null | undefined };


export const GreetingDocument = `
    query greeting {
  greeting
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    greeting: build.query<GreetingQuery, GreetingQueryVariables | void>({
      query: (variables) => ({ document: GreetingDocument, variables })
    })
  })
});

export { injectedRtkApi as api };
