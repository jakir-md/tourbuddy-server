import { prisma } from "../../shared/prisma";

export async function generateUniqueUsername(
  baseName: string
): Promise<string> {
  let username = baseName.toLowerCase().replace(/[^a-z0-9]/g, "");
  let isUnique = false;
  let attempt = 0;
  const originalUsername = username;

  while (!isUnique) {
    const existingUser = await prisma.user.findFirst({
      where: { username: username },
    });

    if (!existingUser) {
      isUnique = true;
    } else {
      attempt++;
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      username = `${originalUsername}${randomSuffix}`;
    }
    if (attempt > 10) throw new Error("Could not generate unique username");
  }

  return username;
}
