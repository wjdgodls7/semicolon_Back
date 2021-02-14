import { getRecommend } from "../../../start";

export default {
    Query: { 
        Recommendation: async (_, args, { request }) => { 
            const { data } = await getRecommend();
            return data;
        }
    }
}