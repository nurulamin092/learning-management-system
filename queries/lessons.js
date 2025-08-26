import { replaceMongoIdInObject } from "@/lib/convertData";
import { Lesson } from "@/model/lesson.model";

export async function getLesson(lessonId) {
    const lessons = await Lesson.findById(lessonId).lean();
    return replaceMongoIdInObject(lessons)
}