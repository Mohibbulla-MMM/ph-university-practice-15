"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_router_1 = require("../module/student/student.router");
const user_router_1 = require("../module/user/user.router");
const academicSemester_router_1 = require("../module/academicSemester/academicSemester.router");
const academicFaculty_router_1 = require("../module/academicFaculty/academicFaculty.router");
const academicDepartment_router_1 = require("../module/academicDepartment/academicDepartment.router");
const admin_route_1 = require("../module/admin/admin.route");
const faculty_routers_1 = require("../module/faculty/faculty.routers");
const course_route_1 = require("../module/course/course.route");
const router = (0, express_1.Router)();
const modulesRoutes = [
    {
        path: "/students",
        router: student_router_1.StudentRouter,
    },
    {
        path: "/users",
        router: user_router_1.UserRouter,
    },
    {
        path: "/academic-semester",
        router: academicSemester_router_1.AcademicSemesterRouter,
    },
    {
        path: "/academic-faculty",
        router: academicFaculty_router_1.AcademicFacultyRouter,
    },
    {
        path: "/academic-department",
        router: academicDepartment_router_1.AcademicDepartmentRouter,
    },
    {
        path: "/admin",
        router: admin_route_1.AdminRouter,
    },
    {
        path: "/faculty",
        router: faculty_routers_1.FacultyRouter,
    },
    {
        path: "/courses",
        router: course_route_1.CourseRouter,
    },
];
modulesRoutes.forEach((routers) => {
    router.use(routers.path, routers.router);
});
exports.default = router;
