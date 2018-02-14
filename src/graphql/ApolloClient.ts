import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import appState$ from '../redux';
// import introspectionQueryResultData from '../fragmentTypes.json';

export const baseUrl = 'http://backend.loc';
// export const baseUrl = 'http://192.168.5.205:8888';

const httpLink = createHttpLink({
    uri: `${baseUrl}/graphql`
});

const middlewareLink = new ApolloLink((operation, forward: any) => {
    const token = appState$.getValue().login.token;
    if (token) {
        operation.setContext({
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    }
    return forward(operation);
});

/*const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});*/

export default new ApolloClient({
    link: middlewareLink.concat(httpLink),
    cache: new InMemoryCache()
});
