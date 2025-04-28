"use client"

import '@mantine/core/styles.css'
import './global.css'
import { StyledComponentsRegistry } from './registry'
import { Metadata } from 'next'
import { RootLayoutBody } from './components/RootLayoutBody'
import { MantineProvider } from '@mantine/core'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const metadata: Metadata = {
  title: 'Curri Playground',
}

const createApolloClient = () => {
  return new ApolloClient({
      uri: "http://localhost:4200/api/graphql",
      cache: new InMemoryCache(),
      credentials: 'omit'
  });
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const client = createApolloClient()
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: '#fafafa',
        }}
      >
        <MantineProvider>
          <StyledComponentsRegistry>
            <ApolloProvider client={client}>
              <RootLayoutBody>
                {children}
              </RootLayoutBody>
              </ApolloProvider>
          </StyledComponentsRegistry>
        </MantineProvider>
      </body>
    </html>
  )
}


