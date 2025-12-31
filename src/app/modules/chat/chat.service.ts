import { prisma } from "../../../../lib/prisma";
import ApiError from "../../error/ApiError";
import statusCode from "http-status";

const getMyConversations = async (userId: string) => {
  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        conversationMembers: {
          some: { userId },
        },
      },
      include: {
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },

        conversationMembers: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                profilePhoto: true,
              },
            },
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    const formattedData = conversations.map((chat) => {
      const latestMessage = chat.messages[0];
      return {
        id: chat.id,
        name: chat.title,
        tripId: chat.tripId,
        latestMessage: latestMessage
          ? {
              content: latestMessage.content,
              createdAt: latestMessage.createdAt,
              isRead: latestMessage.isRead,
            }
          : null,
        members: chat.conversationMembers.map((m) => m.user),
      };
    });

    return formattedData;
  } catch (error) {
    console.error(error);
    throw new ApiError(statusCode.BAD_REQUEST, "Failed to load chats");
  }
};
export const ChatServices = {
  getMyConversations,
};
