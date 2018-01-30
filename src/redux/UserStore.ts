import appState from './State';
import { createAction } from 'redurx';
import client from '../graphql/ApolloClient';
import * as graphQlConst from '../graphql/GraphqlConsts';
import { lceGraphQlPromise } from '../lce/RxLce';
import initialState from '../lce/LCE';

export const login = createAction((action$: Rx.Observable<any>) => action$.flatMapLatest(action =>
        lceGraphQlPromise(client.mutate({
            mutation: graphQlConst.login,
            variables: action
        }))
    )
);

export const logOut = createAction();

// TODO model type information like User should be generated from graphql schema with this tool: https://github.com/apollographql/apollo-codegen. We are waiting for the backend to provide a schema for us.

export interface UserState {
    token?: string;
    user?: any; // TODO will be of type User once we have the above mentioned generated TS files
}

appState('login').setInitialState({
    token: null,
    user: initialState(),
}).reduce(login, (prevState: any, result: any) => {
    return {
        ...prevState,
        user: result.mapWhenContent((content: any) => content.login.user),
        token: result.mapOrNullWhenContent((content: any) => content.login.token)
    };
}).reduce(logOut, (prevState: any, result: any) => {
    return {
        ...prevState,
        token: null,
        user: initialState(null)
    };
});
