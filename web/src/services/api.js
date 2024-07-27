import { gql } from "@apollo/client";

export const SEARCH = gql`
  query Search($q: String!, $filter: [String]) {
    search(q: $q, filter: $filter) {
      name
      group
      q
    }
  }
`;

export const GET_ITEM = gql`
  query GetItem($q: String!) {
    getItem(q: $q) {
      title
      description
      species {
        name
        description
        q
      }
      popularNames {
        name
        observation
        q
      }
      metabolites {
        name
        description
        q
      }
      therapeuticEffects{
        term
        meaning
      }
      prescriptionSuggestions {
        specie {
          name
        }
        part {
          name
        }
        dosage
        quantity
        description
      }
    }
  }
`;

export const GET_SPECIES = gql`
  query Species {
    species {
      id
      name
      description
    }
  }
`;

export const GET_SPECIE = gql`
  query Specie($id: Int!) {
  specie(id: $id) {
    id
    name
    description
    popularNames {
      id
      name
      observation
    }
    metabolitesRelevance{
      metabolite{
        name
        description
      }
      relevance{
        level
        description
        hexColor
      }
    }
    prescriptions{
      part{
        name
        description
      }
      dosage
      quantity
      description
    }
    therapeuticEffects{
      term
      meaning
    }
  }
}
`;

export const GET_POPULAR_NAMES = gql`
  query PopularNames {
    popularNames {
      id
      name
      observation
    }
  }
`;