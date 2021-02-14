import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
    Mutation: {
        uploadStory: async (_, args, { request }) => {
            isAuthenticated(request);
            const { files, caption, tagUser, type } = args;
            const { user } = request;
            let newStory;
            console.log(files);

            if (tagUser) {
                const isFollowing = await prisma.user({ id: user.id }).following({ where: { username_in: tagUser } });
                console.log(isFollowing);
                if (isFollowing.length === 1) {
                    newStory = await prisma.createStory({
                        user: {
                            connect: {
                                id: user.id
                            }
                        },
                        tagUser: {
                            connect: {
                                username:isFollowing.username
                            }
                        },
                        caption
                    })      
                } else {
                    newStory = await prisma.createStory({
                        user: {
                            connect: {
                                id:user.id
                            }
                        },
                        caption
                    })
                    isFollowing.map(async following => await prisma.updateStory({
                        data: {
                            tagUser: {
                                connect: {
                                    username:following.username
                                }
                            }
                        },
                        where:{
                            id:newStory.id
                        }
                    }))
                }
            } else {
                    newStory = await prisma.createStory({
                        user: {
                            connect: {
                                id:user.id
                            }
                        },
                        caption
                    })
                }
            
            await prisma.createFile({
                url: files,
                type:type,
                story: {
                    connect: {
                        id: newStory.id
                    }
                }
            });

            return newStory;

        }
    }
}