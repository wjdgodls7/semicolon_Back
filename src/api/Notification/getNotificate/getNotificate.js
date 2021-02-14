import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"

export default {
    Query: {
        getNotificate: (_, __, { request }) => {
            isAuthenticated(request);
            const { user } = request;
            return prisma.notifications({
                where: {
                    to: {
                        id: user.id
                    }
                }
            });
        }
    }
};