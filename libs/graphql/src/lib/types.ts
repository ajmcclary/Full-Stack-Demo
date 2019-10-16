import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: AuthToken;
  user: User;
};

export type AuthToken = {
  __typename?: 'AuthToken';
  expiresIn: Scalars['Int'];
  accessToken: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteUser: User;
  updateUser: User;
  inviteNewUser: User;
  completeInvitation: AuthPayload;
  login: AuthPayload;
  signup: AuthPayload;
  verifyEmail: Scalars['Boolean'];
  resendVerifyEmail: Scalars['Boolean'];
  changePassword: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  resetPassword: Scalars['Boolean'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};

export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type MutationInviteNewUserArgs = {
  email: Scalars['String'];
};

export type MutationCompleteInvitationArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type MutationSignupArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type MutationVerifyEmailArgs = {
  token: Scalars['String'];
};

export type MutationChangePasswordArgs = {
  password: Scalars['String'];
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};

export type MutationResetPasswordArgs = {
  token: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me: User;
};

export type UpdateUserInput = {
  email: Scalars['String'];
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  apiKey: Scalars['String'];
  active: Scalars['Boolean'];
};

export type CurrentUserQueryVariables = {};

export type CurrentUserQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'User' } & UserDataFragment;
};

export type SignupMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignupMutation = { __typename?: 'Mutation' } & {
  signup: { __typename?: 'AuthPayload' } & {
    token: { __typename?: 'AuthToken' } & AuthTokenFragment;
    user: { __typename?: 'User' } & UserDataFragment;
  };
};

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'AuthPayload' } & {
    token: { __typename?: 'AuthToken' } & AuthTokenFragment;
    user: { __typename?: 'User' } & UserDataFragment;
  };
};

export type ForgotPasswordMutationVariables = {
  email: Scalars['String'];
};

export type ForgotPasswordMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'forgotPassword'
>;

export type ResetPasswordMutationVariables = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type ResetPasswordMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'resetPassword'
>;

export type AuthTokenFragment = { __typename?: 'AuthToken' } & Pick<
  AuthToken,
  'expiresIn' | 'accessToken'
>;

export type UserDataFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'active' | 'email' | 'apiKey'
>;

export const AuthTokenFragmentDoc = gql`
  fragment AuthToken on AuthToken {
    expiresIn
    accessToken
  }
`;
export const UserDataFragmentDoc = gql`
  fragment UserData on User {
    id
    active
    email
    apiKey
  }
`;
export const CurrentUserDocument = gql`
  query currentUser {
    me {
      ...UserData
    }
  }
  ${UserDataFragmentDoc}
`;

@Injectable({
  providedIn: 'root'
})
export class CurrentUserGQL extends Apollo.Query<
  CurrentUserQuery,
  CurrentUserQueryVariables
> {
  document = CurrentUserDocument;
}
export const SignupDocument = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token {
        ...AuthToken
      }
      user {
        ...UserData
      }
    }
  }
  ${AuthTokenFragmentDoc}
  ${UserDataFragmentDoc}
`;

@Injectable({
  providedIn: 'root'
})
export class SignupGQL extends Apollo.Mutation<
  SignupMutation,
  SignupMutationVariables
> {
  document = SignupDocument;
}
export const LoginDocument = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token {
        ...AuthToken
      }
      user {
        ...UserData
      }
    }
  }
  ${AuthTokenFragmentDoc}
  ${UserDataFragmentDoc}
`;

@Injectable({
  providedIn: 'root'
})
export class LoginGQL extends Apollo.Mutation<
  LoginMutation,
  LoginMutationVariables
> {
  document = LoginDocument;
}
export const ForgotPasswordDocument = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordGQL extends Apollo.Mutation<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
> {
  document = ForgotPasswordDocument;
}
export const ResetPasswordDocument = gql`
  mutation resetPassword($password: String!, $token: String!) {
    resetPassword(token: $token, password: $password)
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordGQL extends Apollo.Mutation<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
> {
  document = ResetPasswordDocument;
}
