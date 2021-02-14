import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"

export default {
    Query: {
        seeRooms: (_, __, { request }) => {
            isAuthenticated(request);
            const { user } = request;
            return prisma.rooms({
                where: {
                    participants_some: {
                        id: user.id
                    }
                }
            });
        }
    }
};