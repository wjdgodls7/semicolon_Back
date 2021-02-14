import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
  Query: {
    getMessages: (_, args, { request }) => {
      isAuthenticated(request);
          const { roomId } = args;
          return prisma.messages({ where: { room: { id: roomId } } })
    }
  }
};