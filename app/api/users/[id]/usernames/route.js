import { connectToDB } from "@utils/database";
import User from "@models/user";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        
        const user = await User.findById(params.id);
        return new Response(JSON.stringify(user.username), { status: 201 })
    } catch (error) {
        return new Response("Failed to fetch username", { status: 500 });
    }
}