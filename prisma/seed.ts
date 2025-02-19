import prisma from "@/lib/prisma";
import { Message, User } from "@prisma/client";

async function main() {
    //change to reference a table in your schema

    const user: User = (await prisma.user.findMany())[0];

    const message: Message = await prisma.message.create({
        data: {
            content: "Hello, how can you assist me today?",
            userId: user.id,
            role: "USER",
        },
    });
    console.log(message);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
