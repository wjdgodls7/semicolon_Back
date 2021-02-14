import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"

export default {
    Query: {
        seeRoom: async (_, args, { request }) => {
            isAuthenticated(request);
            const { user } = request;
            const { id } = args;

            const canSee = await prisma.$exists.room({
                participants_some: {
                    id: user.id
                }
            });
            if (canSee) {
                return prisma.room({ id });
            } else {
                throw Error("You can't see this room😔")
            }
        }
    }
}
