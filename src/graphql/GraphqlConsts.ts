/**
 * Created by apptive on 2017. 10. 03..
 */
import gql from 'graphql-tag';

// mutation login($userName: String!, $password: String!) {
//     login(userName: $userName, password: $password) {
//         token
//         user { id, foreName, surName, fullName }
//     }

export const login = gql`

    query login($email: String!, $password: String!) {
      userLogin(email: $email, password: $password){
        user {
          name
          email
        }
        token_type
        expires_in
        access_token
      }
    }`;