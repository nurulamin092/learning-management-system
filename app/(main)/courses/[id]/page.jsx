import CourseDetailsInfo from "./_components/CourseDetailsInfo";
import CourseDetails from "./_components/CourseDetails";
import CourseRelated from "./_components/CourseRelated";
import Testimonials from "./_components/Testimonials";
import { getCourseDetails } from "@/queries/courses";
import { replaceMongoIdInArray } from "@/lib/convertData";

const SingleCoursePage = async ({ params: { id } }) => {
  const course = await getCourseDetails(id);
  console.log(course.testimonials);

  return (
    <>
      <CourseDetailsInfo
        title={course?.title}
        subtitle={course?.subtitle}
        thumbnail={course?.thumbnail}
      />
      <CourseDetails />
      {/* Testimonials */}
      {course?.testimonials && (
        <Testimonials
          testimonials={replaceMongoIdInArray(course?.testimonials)}
        />
      )}
      {/* Releated Course */}
      <CourseRelated />
    </>
  );
};
export default SingleCoursePage;
