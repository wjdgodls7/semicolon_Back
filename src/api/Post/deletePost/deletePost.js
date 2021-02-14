import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"

export default {
    Mutation: {
        deletePost: async (_, agrs, { request }) => {
            isAuthenticated(request);
            const { user } = request;
            const { id } = agrs;
            const post = await prisma.$exists.post({ AND: [{ id, user: { id: user.id } }] })
            // 포스트가 있는지 확인하고 지금 로그인 한 유저가 포스트를 만든 유저인지 확인.
            if (post) {
                await prisma.updatePost({
                    data: { state: "0" },
                    where: { id }
                })
                return true;
            } else {
                return false;
            }

        }
    }
};