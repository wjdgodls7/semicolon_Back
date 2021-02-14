import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"

export default {
    Mutation: {
        clickedStory: async (_, agrs, { request }) => {
            isAuthenticated(request);
            const { user } = request;
            const { id } = agrs;
            const story = await prisma.$exists.story({ AND: [{ id, seenUsers: { id: user.id } }] })
           
            if (!story) {
                await prisma.updateStory({
                  data: {
                    seenUsers: {
                      connect:
                      {
                        id: user.id
                      }
                    }
                  },
                    where: { id }
                })
                return true;
            } else {
                return false;
            }

        }
    }
};