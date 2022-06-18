import { gql } from 'apollo-server-express'

const Schemas = gql`
  type Person {
    id: ID!
    name: String
  }

  type Query {
    getAllPeople: [Person]

    getPerson(id: Int): Person
  }

  type Mutation {
    addPerson(name: String): Person
  }
`

export default Schemas
