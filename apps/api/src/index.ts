console.log("hello wordl api running")

import Prisma from '@repo/db/src/index'

async function add(){
    try {
        const user = await Prisma.user.create({
            data: {
                name: "John Doe",
            }})

            console.log(user)

    } catch (error) {
        console.log(error)
    }
}

add()