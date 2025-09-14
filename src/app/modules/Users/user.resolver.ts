import { UserService } from "./user.services";
import { ApolloError } from "apollo-server-errors";

export const userResolvers = {
 Query: {
  users: () => UserService.getUsers(),
  user: async (_: any, args: { id: string }) => {
  try {
    const result = await UserService.getSingleUser(args.id);
    return result.data; // শুধুই actual user object return করো
  } catch (error: any) {
    throw new ApolloError(error.message || "Internal Server Error", "USER_FETCH_ERROR");
  }
},
},

  Mutation: {
    createUser: async (_: any, args:any) => {
      try {
        const user = await UserService.createUser(args.data);

        if (!user?.data?.id) {
          throw new ApolloError("User creation failed", "USER_CREATION_FAILED");
        }

        return user.data; // return only the actual user object
      } catch (error: any) {
        if (error.code === "P2002") {
          throw new ApolloError(
            `Duplicate field value: ${error.meta?.target}`,
            "DUPLICATE_FIELD_ERROR"
          );
        }
        throw new ApolloError(error.message || "Internal Server Error", "INTERNAL_ERROR");
      }
    },
  },
};
