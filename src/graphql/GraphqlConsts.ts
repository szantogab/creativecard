/**
 * Created by apptive on 2017. 10. 03..
 */
import gql from 'graphql-tag';

export const login = gql`
    mutation login($userName: String!, $password: String!) {
        login(userName: $userName, password: $password) {
            token
            user { id, foreName, surName, fullName }
        }
    }`;