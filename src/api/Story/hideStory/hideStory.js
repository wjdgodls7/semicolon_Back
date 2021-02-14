import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"

export default {
    Mutation: {
        hideStory: async (_, agrs, { request }) => {
            isAuthenticated(request);
            const { id } = agrs;

            try {
                await prisma.updateManyStories({
                    data: { state: "0" },
                    where: {
                        user: { id }
                    }
                })
                return true;
            } catch (e) {
                console.log(e)
                return false
            }
        }
    }
};