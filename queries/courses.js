import { Course } from "@/model/course-model";
import { Category } from "@/model/category-model";
import { User } from "@/model/user-model";
import { Testimonial } from "@/model/testimonial-model";
import { Module } from "@/model/modules-model";

export async function getCourseList() {
    const courses = await Course.find({})
        .select(["title", "thumbnail", "modules", "price", "category", "instructor"])
        .populate({
            path: "category",
            model: Category
        }).populate({
            path: "instructor",
            model: User
        }).populate({
            path: "modules",
            model: Module
        }).populate({
            path: "testimonials",
            model: Testimonial
        }).lean();
    return courses
}