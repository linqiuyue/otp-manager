import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { notification } from "antd";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors && graphQLErrors.length > 0) {
        graphQLErrors.forEach((graphQLError) => {
          if (
            graphQLError?.extensions?.exception?.response?.message instanceof
            Array
          ) {
            graphQLError.extensions.exception.response.message.forEach(
              (message: string) => notification.error({ message })
            );
            return;
          }

          notification.error({ message: graphQLError.message });
        });
      }

      if (networkError) {
        notification.error({ message: networkError.message });
      }
    }),
    setContext((_, { headers }) => {
      return {
        headers: {},
      };
    }),
    createHttpLink({
      uri: "/graphql",
    }),
  ]),
});
