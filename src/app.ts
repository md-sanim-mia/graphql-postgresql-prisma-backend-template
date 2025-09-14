import express, { Application} from 'express'
import cors from "cors";
import { gql } from 'apollo-server-express';
import router from './app/routes';
import gobalErrorHandiler from './app/middlwares/globalErrorHandler';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
export const typeDefs = gql`
  type Query {
    message: String
  }
`;

export const resolvers = {
  Query: {
    message: () => "My first server  is running with GraphQL!",
  },
};
app.use('/api/v1',router)
app.use(gobalErrorHandiler)
export default app