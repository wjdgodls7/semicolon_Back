import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"

export default {
    Mutation: {
        editMoToken: async (_, args, { request }) => {
            isAuthenticated(request);
            const { moToken } = args;
            const { user } = request;
            try {
             await prisma.updateUser({
                where: { id: user.id },
                data: { moToken }
             });
                return true;    
            } catch {
                return false;
            }
            
        }
    }
}