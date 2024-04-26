import { createSchema } from 'graphql-yoga'
import search from './resolvers/queries/search.js'

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      hello: String
      search(q:String!, filter:[String]): [SearchInput]
    }

    type SearchInput {
      name: String
      group: String
      url: String
    }
  `,

  resolvers: {
    Query: {
      hello: () => 'world',
      search
    }
  }
})