import mongoose, { Schema } from "mongoose";

const moduleSchema = new Schema({
    title: {
        require: true,
        type: String,

    },
    description: {
        require: true,
        type: String
    },
    status: {
        require: true,
        type: String
    },
    slug: {
        require: true,
        type: String
    },
    course: {
        require: true,
        type: String
    },
    lessonIds: {
        require: true,
        type: [String]
    }
})


export const Module = mongoose.models.Module ?? mongoose.model("Module", moduleSchema)