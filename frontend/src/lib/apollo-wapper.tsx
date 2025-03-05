'use client'

import {
  ApolloLink,
  HttpLink,
  type NormalizedCacheObject
} from '@apollo/client'
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink
} from '@apollo/experimental-nextjs-app-support/ssr'

function makeClient(): NextSSRApolloClient<NormalizedCacheObject> {
  const httpLink = new HttpLink({
    uri: 'http://localhost:4800/graphql'
  })

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
          new SSRMultipartLink({
            stripDefer: true
          }),
          httpLink
        ])
        : httpLink
  })
}

export function ApolloWrapper({ children }: React.PropsWithChildren): JSX.Element {
  if (1 === 2) return null;
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
