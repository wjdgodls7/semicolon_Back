import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"

export default {
    Mutation: {
        commentLikes: async (_, args, { request }) => {
            isAuthenticated(request);
            const { commentId } = args;
            const { user } = request;
            const filterOption = {
                AND: [
                    {
                        user: {
                            id: user.id
                        }
                    },
                    {
                        comment: {
                            id: commentId
                        }
                    }   
                ]

            };
            try {
                const existingLike = await prisma.$exists.commentLike(filterOption);
                
                if (existingLike) {
                    await prisma.deleteManyCommentLikes(filterOption)
                }
                else {
                    await prisma.createCommentLike({
                        user: {
                            connect: {
                                id: user.id,
                            }
                        },
                        comment: {
                            connect: {
                                id: commentId
                            }

                        }
                        
                    });
                }
                return true;
            } catch (e) {
                console.log(e);
                return false;
            }
        }
    }
}