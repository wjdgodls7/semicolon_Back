import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragments";
import { isAuthenticated } from "../../../middlewares";

export default {
    Query: {
        me: async (_, __, { request }) => {
            isAuthenticated(request);
            const { user } = request;
            //+console.log(user);
            return await prisma.user({ id: user.id });
        }
    }
}

//Fragment 사용할 때
// export default {
//     Query: {
//         me: async (_, __, { request }) => {
//             isAuthenticated(request);
//             const { user } = request;
//             const userProfile = await prisma.user({ id: user.id }).$fragment(USER_FRAGMENT);
//             return userProfile;
//         }
//     }
// }