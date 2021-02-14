import { prisma } from "../../../../generated/prisma-client";
// import { isAuthenticated } from "../../../middlewares";

export default {
    Subscription: {
        notificateMsg: {
            subscribe: (_, args, { request }) => {
                // 보안필요없을듯
                // isAuthenticated(request);
                const { roomId } = args;
                return prisma.$subscribe.message({
                    AND: [
                        { mutation_in: "CREATED" },
                        {
                            node: {
                                room: { id: roomId }
                            }
                        }
                    ]
                }).node();
            },
            resolve: payload => payload 
        }
    }
}
               