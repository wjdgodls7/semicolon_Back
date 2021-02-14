import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"

export default {
    Mutation: {
        editUser: async (_, args, { request }) => {
            isAuthenticated(request);

            const { username, email, firstName, lastName, bio, avatar } = args;
            console.log(avatar)
            const { user } = request;
            try {
             await prisma.updateUser({
                where: { id: user.id },
                data: { username, email, firstName, lastName, bio, avatar }
             });
                return true;    
            } catch {
                return false;
            }
            
        }
    }
}