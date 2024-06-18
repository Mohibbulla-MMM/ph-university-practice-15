import { Router } from "express";
import { StudentRouter } from "../module/student/student.router";
import { UserRouter } from "../module/user/user.router";
import { AcademicSemesterRouter } from "../module/academicSemester/academicSemester.router";
import { AcademicFacultyRouter } from "../module/academicFaculty/academicFaculty.router";
import { AcademicDepartmentRouter } from "../module/academicDepartment/academicDepartment.router";
import { AdminRouter } from "../module/admin/admin.route";
import { FacultyRouter } from "../module/faculty/faculty.routers";
import { CourseRouter } from "../module/course/course.route";
import { SemesterRegistrationRouter } from "../module/semesterRegistration/semesterRegistration.route";
import { OfferedCourseRouter } from "../module/offeredCourse/offeredCourse.route";
import { AuthRouters } from "../module/auth/auth.route";

const router = Router();

const modulesRoutes = [
  {
    path: "/students",
    router: StudentRouter,
  },
  {
    path: "/users",
    router: UserRouter,
  },
  {
    path: "/academic-semester",
    router: AcademicSemesterRouter,
  },
  {
    path: "/academic-faculty",
    router: AcademicFacultyRouter,
  },
  {
    path: "/academic-department",
    router: AcademicDepartmentRouter,
  },
  {
    path: "/admin",
    router: AdminRouter,
  },
  {
    path: "/faculty",
    router: FacultyRouter,
  },
  {
    path: "/courses",
    router: CourseRouter,
  },
  {
    path: "/semester-registrations",
    router: SemesterRegistrationRouter,
  },
  {
    path: "/offered-courses",
    router: OfferedCourseRouter,
  },
  {
    path: "/auth",
    router: AuthRouters,
  },
];

modulesRoutes.forEach((routers) => {
  router.use(routers.path, routers.router);
});

export default router;
