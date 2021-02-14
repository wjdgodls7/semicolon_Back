import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default { 
    Mutation: {
        delComment: async (_, args, { request }) => { 
            isAuthenticated(request);
            const { CommentId } = args;
            const { user } = request;
            const filterOption = {
                user: {
                    id: user.id
                }
            }
        
            try { 
                const isMyComment = await prisma.$exists.comment(filterOption);
                if (isMyComment) { 
                    await prisma.deleteComment({ id: CommentId });
                }
                return true;
            } catch (error) {
                console.log(error)
                return false;
            }
            
        }


    }        
}