import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"

export default {
    Mutation: {
        state: async (_, arg, { request }) => {
            isAuthenticated(request);
            const { state } = arg;
            const { user } = request;
            console.log(state);
            await prisma.updateUser({ where: { id: user.id }, data: { state } })
            return true;

        }
    }
}