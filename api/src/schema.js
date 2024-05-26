import { createSchema } from 'graphql-yoga'
import search from './resolvers/queries/search.js'
import getItem from './resolvers/queries/getItem.js'

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      hello: String
      "Busca por diversos itens e tipos de objetos no banco de dados, q deve ser uma string para busca de nome de espécies e outros, enquanto o filters serve para buscar efeitos terápeuticos em ação conjunta"
      search(q:String!, filter:[String]): [SearchResult]
      "Retorna informações para apenas um item da busca, q deve estar no modelo objeto:id"
      getItem(q:String!): Item
    }

    type SearchResult {
      name: String
      group: String
      q: String
    }

    type Item {
      title: String
      description: String
      species: [Specie]
      popularNames: [PopularName]
      metabolites: [SecondaryMetabolismDerivatives]
      therapeuticEffects: [TherapeuticEffect]
      prescriptionSuggestions: [PrescriptionSuggestion]
    }

    type Specie {
      name: String
      description: String
      therapeuticEffects: [String]
      q: String
    }

    type PopularName {
      name: String
      observation: String
      q: String
    }

    type TherapeuticEffect{
      term: String
      meaning: String
    }

    type SecondaryMetabolismDerivatives {
      name: String
      description: String
      q: String
    }

    type PrescriptionSuggestion{
      specie: Specie
      part: PlantPart
      dosage: String
      quantity: String
      description: String
    }

    type PlantPart{
      name: String
      description: String
    }
  `,

  resolvers: {
    Query: {
      hello: () => 'world',
      search,
      getItem
    }
  }
})