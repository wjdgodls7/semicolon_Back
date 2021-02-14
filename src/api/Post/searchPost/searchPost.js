import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        searchPost: async (_, args) => {
            const { term } = args;
            try {
                return prisma.posts({
                    where: {
                        OR: [
                            { caption_contains: term },
                            { location_starts_with: term }]
                    }
                })
            } catch (e) {
                console.log(e);
                return false;
            }
        }
    }
}