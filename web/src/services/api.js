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
