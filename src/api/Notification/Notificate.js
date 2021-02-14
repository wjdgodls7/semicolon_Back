import { prisma } from "../../../generated/prisma-client";

export default {
  Notification: {
    to: ({ id }) => prisma.notification({ id }).to(),
    from: ({ id }) => prisma.notification({ id }).from(),
    message: ({ id }) => prisma.notification({ id }).message(),
    post: ({ id }) => prisma.notification({ id }).post(),
  },
  User: {
      followers: ({ id }) => prisma.user({ id }).followers(),
  }
};