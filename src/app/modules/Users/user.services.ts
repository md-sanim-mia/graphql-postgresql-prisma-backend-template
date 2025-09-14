
import prisma from "../../utils/prisma"
import bcrypt from 'bcrypt';
// user.service.ts
export const UserService = {
  createUser: async (payload: any) => {
    // validation
    if (!payload.email.includes("@")) {
      throw new Error("Invalid email");
    }
      const existingUser = await prisma.user.findUnique({ where: { email: payload.email } });
    if (existingUser) {
      throw new Error("Email already in use");
    }


    // password hash
    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const result = await prisma.user.create({
      data: { ...payload, password: hashedPassword },
    });
return{
    success: true,
    statusCode: 201,
    message: "User created successfully",
    data: result,
}
  },
    getUsers: async () => {
    return prisma.user.findMany();
  },    
getSingleUser: async (id: string) => {
    if (!id) {
      throw new Error("User ID is required");
    }   
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error("User not found");
    }
    return {
        success: true,
        statusCode: 200,
        message: "User fetched successfully",
        data: user,     
    }
  }

};
