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
    metabolites{
      id
      name
      description
    }
    metabolitesRelevance{
      metabolite{
        id
        name
        description
      }
      relevance{
        level
        hexColor
      }
    }
    prescriptions{
      part{
        id
        name
        description
      }
      id
      dosage
      description
    }
    therapeuticEffects{
      id
      term
      meaning
    }
    therapeuticEffectsRelevance{
      therapeuticEffect{
        id
        term
        meaning
      }
      relevance{
        level
        hexColor
      }
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

export const GET_THERAPEUTIC_EFFECTS = gql`
  query TherapeuticEffects {
    therapeuticEffects {
      id
      term
      meaning
    }
  }
`;

export const GET_METABOLITES = gql`
  query Metabolites {
    metabolites {
      id
      name
      description
    }
  }
`;

export const GET_RELEVANCE = gql`
  query Relevance {
    relevance {
      level
      description
      hexColor
    }
  }
`;

export const GET_PLANT_PARTS = gql`
  query PlantParts {
    plantParts {
      id
      name
      description
    }
  }
`;

export const UPDATE_SPECIE = gql`
  mutation UpdateSpecie($id: Int!, $name: String!, $description: String, $popularNames: [PopularNameInput], $therapeuticEffects: [TherapeuticEffectInput], $metabolites: [MetaboliteInput], $prescriptionSuggestions: [PrescriptionSuggestionInput]) {
    updateSpecie(id: $id, name: $name, description: $description, popularNames: $popularNames, therapeuticEffects: $therapeuticEffects, metabolites: $metabolites, prescriptionSuggestions: $prescriptionSuggestions) {
      id
    }
  }
`;

export const CREATE_SPECIE = gql`
  mutation CreateSpecie($name: String!) {
    createSpecie(name: $name) {
      id
    }
  }
  `