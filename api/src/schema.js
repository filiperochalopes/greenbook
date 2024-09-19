import { createSchema } from 'graphql-yoga'
import search from './resolvers/queries/search.js'
import getItem from './resolvers/queries/getItem.js'
import species from './resolvers/queries/species.js'
import specie from './resolvers/queries/specie.js'
import metabolites from './resolvers/queries/metabolites.js'
import popularNames from './resolvers/queries/popularNames.js'
import therapeuticEffects from './resolvers/queries/therapeuticEffects.js'
import relevance from './resolvers/queries/relevance.js'
import plantParts from './resolvers/queries/plantParts.js'

import createSpecie from './resolvers/mutations/createSpecie.js'
import updateSpecie from './resolvers/mutations/updateSpecie.js'

export const schema = createSchema({
  typeDefs: /* GraphQL */ `

    type Mutation {
      updateSpecie(id: Int!, name: String!, description: String, 
      popularNames: [PopularNameInput], therapeuticEffects: [TherapeuticEffectInput], metabolites: [MetaboliteInput], prescriptionSuggestions: [PrescriptionSuggestionInput]): Specie
      createSpecie(name: String!): Specie
    }
    type Query {
      hello: String
      "Busca por diversos itens e tipos de objetos no banco de dados, q deve ser uma string para busca de nome de espécies e outros, enquanto o filters serve para buscar efeitos terápeuticos em ação conjunta"
      search(q:String!, filter:[String]): [SearchResult]
      "Retorna informações para apenas um item da busca, q deve estar no modelo objeto:id"
      getItem(q:String!): Item
      "Retorna as espécies para formuláro de edição"
      species: [Specie]
      "Retorna uma únca espécie com todos seus atributos relevantes para preencher formuláro de edição"
      specie(id: Int!): Specie
      "Retorna todos os metabólitos que temos até agora"
      metabolites: [SecondaryMetabolismDerivatives]
      "Nomes populares do banco de dados"
      popularNames: [PopularName]
      "Efeitos terápeuticos do banco de dados"
      therapeuticEffects: [TherapeuticEffect]
      "Lista de relevancias disponível para formulário de edição"
      relevance: [Relevance]
      "Lista de partes das plantas que temos no banco de dados"
      plantParts: [PlantPart]
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
      id: Int
      name: String
      description: String
      popularNames: [PopularName]
      metabolites: [SecondaryMetabolismDerivatives]
      metabolitesRelevance: [SecondaryMetabolismDerivativesRelevance]
      therapeuticEffects: [TherapeuticEffect]
      therapeuticEffectsRelevance: [TherapeuticEffectRelevance]
      prescriptions: [PrescriptionSuggestion]
      q: String
    }

    type PopularName {
      id: Int
      q: String
      name: String
      observation: String
    }

    type TherapeuticEffect{
      id: Int
      q: String
      term: String
      meaning: String
      relevance: Relevance
    }

    type TherapeuticEffectRelevance{
      relevance: Relevance
      specie: Specie
      therapeuticEffect: TherapeuticEffect
    }

    type SecondaryMetabolismDerivatives {
      id: Int
      q: String
      name: String
      description: String
      relevance: Relevance
    }

    type SecondaryMetabolismDerivativesRelevance{
      relevance: Relevance
      specie: Specie
      metabolite: SecondaryMetabolismDerivatives
    }

    type Relevance {
      level: String
      description: String
      hexColor: String
    }

    type PrescriptionSuggestion{
      id: Int
      specie: Specie
      part: PlantPart
      dosage: String
      quantity: String
      description: String
    }

    type PlantPart{
      id: Int
      name: String
      description: String
    }

    input MetaboliteInput{
      id: Int
      name: String!
      description: String
      relevance: String
    }

    input TherapeuticEffectInput{
      id: Int
      term: String!
      meaning: String!
      relevance: String
    }

    input PopularNameInput{
      id: Int
      name: String!
      observation: String
    }

    input PrescriptionSuggestionInput{
      id: Int
      plantPartId: Int
      part: PlantPartInput
      dosage: String
      quantity: String
      description: String
    }

    input PlantPartInput{
      id: Int
      name: String!
      description: String
    }

  `,

  resolvers: {
    Mutation: {
      updateSpecie,
      createSpecie
    },
    Query: {
      hello: () => 'world',
      search,
      getItem,
      species,
      specie,
      metabolites,
      popularNames,
      therapeuticEffects,
      relevance,
      plantParts
    }
  }
})