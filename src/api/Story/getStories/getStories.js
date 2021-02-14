import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"

export default {
    Query: {
        getStories: async (_, args, { request }) => {
            isAuthenticated(request);
            const { id } = args;
            console.log("id",id);
            return await prisma.stories({
                where: {
                    AND:
                        [{
                            user: {
                                id 
                            }
                        },
                        {
                            state:"1" 
                        }
                    ]
                    
                },
               orderBy:"createdAt_DESC"
            });
        }
    }
}; 