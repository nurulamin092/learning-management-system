import CourseDetailsInfo from "./_components/CourseDetailsInfo";
import CourseDetails from "./_components/CourseDetails";
import CourseRelated from "./_components/CourseRelated";
import Testimonials from "./_components/Testimonials";
import { getCourseDetails } from "@/queries/courses";

const SingleCoursePage = async ({ params: { id } }) => {
  const course = await getCourseDetails(id);

  return (
    <>
      <CourseDetailsInfo
        title={course?.title}
        subtitle={course?.subtitle}
        thumbnail={course?.thumbnail}
      />
      <CourseDetails />
      {/* Testimonials */}
      <Testimonials />
      {/* Releated Course */}
      <CourseRelated />
      {/* Authors */}
      {/* https://avatars.githubusercontent.com/u/1416832?v=4 */}
      {/* https://avatars.githubusercontent.com/u/3633137?v=4 */}
    </>
  );
};
export default SingleCoursePage;
