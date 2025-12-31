// import { Server as HttpServer } from "http";
// import { Server, Socket } from "socket.io";
// import { prisma } from "../lib/prisma";
export {};
// interface ServerToClientEvents {
//   receive_message: (data: any) => void;
//   user_typing: (data: { userId: string; isTyping: boolean }) => void;
// }
// interface ClientToServerEvents {
//   join_room: (roomId: string) => void;
//   send_message: (data: {
//     roomId: string;
//     senderId: string;
//     content: string;
//   }) => void;
//   typing: (data: { roomId: string; userId: string; isTyping: boolean }) => void;
// }
// export const initSocket = (httpServer: HttpServer) => {
//   const io = new Server<ClientToServerEvents, ServerToClientEvents>(
//     httpServer,
//     {
//       cors: {
//         origin: process.env.CLIENT_URL || "http://localhost:3000",
//         methods: ["GET", "POST"],
//       },
//     }
//   );
//   io.on("connection", (socket: Socket) => {
//     console.log(`User connected: ${socket.id}`);
//     // 1. Join a specific chat room (Trip ID or Conversation ID)
//     socket.on("join_room", (roomId) => {
//       socket.join(roomId);
//       console.log(`User ${socket.id} joined room: ${roomId}`);
//     });
//     // 2. Handle Sending Messages
//     socket.on("send_message", async (data) => {
//       const { roomId, senderId, content } = data;
//       // A. Broadcast IMMEDIATELY to others in the room (Optimistic UI)
//       socket.to(roomId).emit("receive_message", {
//         id: Date.now().toString(), // Temp ID
//         content,
//         senderId,
//         createdAt: new Date(),
//       });
//       // B. Save to Database (Async - doesn't block UI)
//       try {
//         await prisma.message.create({
//           data: {
//             content,
//             senderId,
//             conversationId: roomId, // Assuming roomId maps to Conversation ID
//           },
//         });
//       } catch (error) {
//         console.error("Failed to save message:", error);
//         // In a real app, you might emit an 'error' event back to the sender
//       }
//     });
//     // 3. Typing Indicators
//     socket.on("typing", (data) => {
//       socket.to(data.roomId).emit("user_typing", {
//         userId: data.userId,
//         isTyping: data.isTyping,
//       });
//     });
//     socket.on("disconnect", () => {
//       console.log("User disconnected");
//     });
//   });
//   return io;
// };
//# sourceMappingURL=socket.js.map