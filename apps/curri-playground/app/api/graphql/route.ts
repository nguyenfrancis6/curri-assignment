/* Implementation docs: https://github.com/apollo-server-integrations/apollo-server-integration-next */

import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { ApolloServer } from '@apollo/server'
import { readFileSync } from 'fs'
import { NextRequest } from 'next/server'
import { Models } from '@curri-interview-template/curri-db'
import { Resolvers } from '../../_graphql-generated'

const typeDefs = readFileSync('./app/api/graphql/schema.graphql', {
  encoding: 'utf-8',
})

const resolvers: Resolvers = {
  Query: {
    user: () => {
      return Models.Users.findByUserId({ id: 1 })
    },
  },
  Mutation: {
    bookDelivery: async (_, { data }) => {
      if (!data) throw new Error('No data provided')
      
      const originAddress = await Models.Addresses.findOrCreate({
        addressLine1: data.originAddress.addressLine1,
        city: data.originAddress.city,
        state: data.originAddress.state,
        postalCode: data.originAddress.postalCode,
      })

      const destinationAddress = await Models.Addresses.findOrCreate({
        addressLine1: data.destinationAddress.addressLine1,
        city: data.destinationAddress.city,
        state: data.destinationAddress.state,
        postalCode: data.destinationAddress.postalCode,
      })

      const delivery = await Models.Deliveries.createDelivery({
        originAddressId: originAddress.id,
        destinationAddressId: destinationAddress.id,
        userId: 1,
        orderNumber: data.orderNumber || undefined,
      })

      return {
        id: delivery.id,
        originAddress,
        destinationAddress,
      }
    },
  },
}

const server = new ApolloServer({
  resolvers,
  typeDefs,
})

// @ts-ignore
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async req => ({ req }),
})

export { handler as GET, handler as POST }
