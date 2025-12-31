export declare const ChatServices: {
    getMyConversations: (userId: string) => Promise<{
        id: string;
        name: string;
        tripId: string;
        latestMessage: {
            content: string;
            createdAt: Date;
            isRead: boolean;
        } | null;
        members: {
            id: string;
            name: string;
            profilePhoto: string | null;
        }[];
    }[]>;
};
//# sourceMappingURL=chat.service.d.ts.map