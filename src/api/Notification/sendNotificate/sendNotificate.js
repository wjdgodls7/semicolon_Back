import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"
import axios from 'axios';

export default {
    Mutation: {
        sendNotificate: async (_, args, { request }) => {
            isAuthenticated(request);
            const { username, to, from, message, post, state } = args;
            const { moToken } = await prisma.user({ id: to });
            if (state === "1") {
                const fongst = from.split(',');
                if (fongst[1] === "true") {
                    try {
                        if (moToken) {
                            await axios.post("https://exp.host/--/api/v2/push/send", {
                                to: moToken,
                                title: "팔로우 알림!",
                                body: `${username}님이 회원님에게 팔로우를 했습니다.`,
                                badge: 1
                            });
                        }
                        await prisma.createNotification({
                            to: { connect: { id: to } },
                            from: { connect: { id: fongst[0] } }
                        });
                        return true;
                    } catch (e) {
                        console.log(e)
                        return false;
                    }
                } else {
                    return false;
                }
            } else if (state === "2") {
                try {
                    if (!await prisma.$exists.notification({ message: { id: message.id } })) {
                        await prisma.createNotification({
                            to: { connect: { id: to } },
                            message: { connect: { id: message } },
                            from: { connect: { id: from } }
                
                        });
                    }
                    if (moToken) {
                        // message sending notification
                        const p = await axios.post("https://exp.host/--/api/v2/push/send", {
                            to: moToken,
                            title: "메세지 알림!",
                            body: `${username}님이 회원님께 메세지를 보냈습니다.`,
                            badge: 1
                        });
                    };
                    return true;
                } catch (e) {
                    console.log(e)
                    return false;
                }
            } else if (state === "3") {
                const pongst = post.split(',');
                if (pongst[1] === "false") {
                    try {
                        if (moToken) {
                            await axios.post("https://exp.host/--/api/v2/push/send", {
                                to: moToken,
                                title: "좋아요 알림!",
                                body: `${username}님이 회원님의 게시물에 좋아요를 눌렀습니다.`,
                                badge: 1
                            });
                        }
                        await prisma.createNotification({
                            to: { connect: { id: to } },
                            post: { connect: { id: pongst[0] } },
                            from: { connect: { id: from } }
                
                        });
                        return true;
                    } catch (e) {
                        console.log(e)
                        return false;
                    }
                } else {
                    return false;
                }
                
            }

        }
    }
}