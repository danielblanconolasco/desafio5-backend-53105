import mongoose from "mongoose"

const chatSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
},
{
    collection: "messages"
})

const ChatModel = mongoose.model("messages", chatSchema);

export default ChatModel