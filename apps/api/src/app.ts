import express from "express";
import { prisma } from "@repo/db";

const app = express();

app.get("/", async (req, res) => {
    console.log("Received request on /");
    try {
        const users = await prisma.user.create({
            data: {
                email: `test-${Date.now()}@gmail.com`,
            }
        });
        console.log("User created:", users);
        res.json({
            message:"hello ",
            users
        })
    } catch (error: any) {
        console.error("Error creating user:", error);
        res.status(500).send({ error: error.message });
    }
});

app.listen(5000, () => {
    console.log("Server started on port 3001");
});
