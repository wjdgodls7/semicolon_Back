import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"

export default {
    Query: {
        getFollowing: (_, __, { request }) => {
            isAuthenticated(request);
            const { user } = request;
            return prisma.user({ id: user.id }).following();
        }
    }   
}