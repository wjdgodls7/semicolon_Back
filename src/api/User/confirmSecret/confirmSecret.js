import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
    Mutation: {
        confirmSecret: async (_, args) => {
            const { email, secret } = args;
            const user = await prisma.userLogin({ email });
            if (user.loginSecret === secret) {
                return secret
            } else {
                throw Error("이메일이랑 비밀번호랑 다름 🤐");
            }
        }
    }
}