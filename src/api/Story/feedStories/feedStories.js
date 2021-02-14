import { prisma } from "../../../../generated/prisma-client";
import { STORYUSER_FRAGMENT } from "../../../fragments";
import { isAuthenticated } from "../../../middlewares"

export default {
    Query: {
        feedStories: async (_, __, { request }) => {
            isAuthenticated(request);
            const { user } = request;
            const sliejls=[];
            const dhodkseho = [];

            const username = await prisma.user({ id: user.id }).following().$fragment(STORYUSER_FRAGMENT)
            username.map(user => {
                dhodkseho.push(user.username);
            })
            //const gotstory = await prisma.users({where:{}})
            console.log(dhodkseho);
               const gotstory = await prisma.stories({
                 where:
                {
                    AND: [
                        { user: { username_in: dhodkseho } },
                    { state: "1" }]
                }
            }).user();
          
            
            //console.log(gotstory);
            gotstory.map(info => {
                if (info.user.id !== user.id) {
                    // if (같으면) {
                            sliejls.push(info.user)
                        // }
                  }  
            })
            //console.log(sliejls);
            const seen = new Set();
            const filteredArr = sliejls.filter(el => {
                const duplicate = seen.has(el.id);
                     seen.add(el.id);
                 return !duplicate;
           });
            console.log("스토리있는내팔로우들!",filteredArr);
            return filteredArr;
        }
    }
}; 