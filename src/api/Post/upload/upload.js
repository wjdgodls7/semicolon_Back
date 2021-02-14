import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
    Mutation: {
        upload: async (_, args, { request }) => {
            isAuthenticated(request);

            const { location, caption, files, hashes } = args;
            const { user } = request;
            console.log(hashes);

            const post = await prisma.createPost({
                location,
                caption,
                user: {
                    connect: {
                        id: user.id
                    }
                }
            });
            files.forEach(async file => await prisma.createFile({
                url: file,
                post: {
                    connect: {
                        id: post.id
                    }
                }
            }));
            hashes.forEach(async hash => await prisma.createHash({
                tag: hash,
                post: {
                    connect: {
                        id: post.id
                    }
                }
            }));
            return post;
        }
    }
}