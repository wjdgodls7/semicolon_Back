// import { prisma } from '../../../../generated/prisma-client';
// import { generateSecret, sendSecretMail } from '../../../utils';



// export default {
//     Mutation: {
//         requestSecret: async (_, args) => {
//             const { email } = args;
//             const loginSecret = generateSecret();
//             console.log(loginSecret);
//             try {
//                 //await sendSecretMail(email, loginSecret);
//                 await prisma.updateUser({ data: { loginSecret }, where: { email } });
//                 return true;
//             } catch (error) {
//                 console.log(error)
//                 return false;
//             }
//         }
//     }
// }
import { prisma } from '../../../../generated/prisma-client';
import { generateSecret, sendSecretMail } from '../../../utils';



export default {
    Mutation: {
        requestSecret: async (_, args) => {
            const { email } = args;
            const loginSecret = generateSecret();
            const exitst = await prisma.$exists.userLogin({ email });
            console.log(loginSecret);
            if (exitst) {
                return false

            } else {
                await prisma.createUserLogin({ email });
                await prisma.updateUserLogin({ data: { loginSecret }, where: { email } })
                return true;
            }
        }
    }
}