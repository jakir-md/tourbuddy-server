"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatServices = void 0;
const prisma_1 = require("../../../shared/prisma");
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const getMyConversations = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conversations = yield prisma_1.prisma.conversation.findMany({
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
    }
    catch (error) {
        console.error(error);
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to load chats");
    }
});
exports.ChatServices = {
    getMyConversations,
};
//# sourceMappingURL=chat.service.js.map