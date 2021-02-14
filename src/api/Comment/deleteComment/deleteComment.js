import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"

export default {
    Mutation: {
        deleteComment: async (_, args, { request }) => {
            isAuthenticated(request);
            const { id } = args;
            const { user } = request;
            const filterOption =
            {
                user: {
                    id: user.id
                }
            };
        
            try {
                const existingComment = await prisma.$exists.comment(filterOption);
                if (existingComment) {
                    await prisma.deleteComment({id});
                }
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        }
    }
}