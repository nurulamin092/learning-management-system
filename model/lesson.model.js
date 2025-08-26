import mongoose, { Schema } from "mongoose"
const lessonSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: false,
        type: String
    },
    duration: {
        required: false,
        type: String
    },
    video_url: {
        required: true,
        type: String
    },
    published: {
        required: true,
        type: String
    },
    slug: {
        required: true,
        type: String
    },
    access: {
        required: true,
        type: String
    }
})


export const Lesson = mongoose.models.Lesson ?? mongoose.model("Lesson", lessonSchema)