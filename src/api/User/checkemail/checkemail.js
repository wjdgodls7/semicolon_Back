import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        checkemail: async (_, args) => {
            const { email } = args;

            const exists = await prisma.$exists.user({ email });
            if (exists) {
                return true;
            } else {
                return false
            }
        }
    }
}