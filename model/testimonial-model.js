import mongoose, { Schema } from "mongoose";

const testimonialSchema = new Schema({
    content: {
        require: true,
        type: String
    },

    user: {
        require: true,
        type: String
    },

    courseId: {
        type: String
    },
    rating: {
        require: true,
        type: Number
    }

})


export const Testimonial = mongoose.models.Testimonial ?? mongoose.model("Testimonial", testimonialSchema)