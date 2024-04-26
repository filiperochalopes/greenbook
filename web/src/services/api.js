import { gql } from "@apollo/client";

export const SEARCH = gql`
query Search ($q:String, $filter:[String]){
  search(q:$q, filter:$filter){
    name
    group
    url
  }
}
`