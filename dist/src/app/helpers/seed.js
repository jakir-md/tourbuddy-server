import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import { EnvVars } from "../../config/env";
export const seedAdmin = async () => {
    try {
        const isAdminExists = await prisma.user.findFirst({
            where: {
                role: "ADMIN",
            },
        });
        if (isAdminExists) {
            console.log("Super admin already exists!");
            return;
        }
        const hashedPassword = await bcrypt.hash("123456", Number(EnvVars.BCRYPT_SALT_ROUND));
        const adminCreated = await prisma.user.create({
            data: {
                email: "admin@gmail.com",
                password: hashedPassword,
                role: "ADMIN",
                name: "Admin Hossain",
                username: "admin84",
            },
        });
        console.log("admin created successfully", adminCreated);
    }
    catch (error) {
        console.log("error while seeding admin", error);
    }
    finally {
        await prisma.$disconnect();
    }
};
//# sourceMappingURL=seed.js.map