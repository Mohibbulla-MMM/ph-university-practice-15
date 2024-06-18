import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserServices } from "./user.services";
import sendRespons from "../../utils/sendRespons";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res, next) => {
  const { password, student } = req.body;
  const result = await UserServices.createStudent(password, student);

  sendRespons(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created success",
    data: result,
  });
});

// create admin
const createAdmin = catchAsync(async (req, res) => {
  const { password, admin } = req.body;
  const result = await UserServices.createAdmin(password, admin);

  sendRespons(res, {
    statusCode: httpStatus.OK,
    message: "Admin created successfull !!!",
    data: result,
  });
});

// create admin
const createFacultry = catchAsync(async (req, res) => {
  const { password, faculty } = req.body;
  const result = await UserServices.createFacultry(password, faculty);

  sendRespons(res, {
    statusCode: httpStatus.OK,
    message: "Faculty is created successfull !!!",
    data: result,
  });
});

// find all users
const findAllUsers = catchAsync(async (req, res, next) => {
  const result = await UserServices.findAllUsers();

  sendRespons(res, {
    message: "Find all User success",
    data: result,
  });
});

// find all users
const findMe = catchAsync(async (req, res, next) => {
  const { userId, role } = req.user;
  const result = await UserServices.findMe(userId, role);

  sendRespons(res, {
    message: "Find me success",
    data: result,
  });
});

// find all users
const changeUserStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.changeUserStatus(id, req.body);

  sendRespons(res, {
    message: "User Updated successfull",
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createAdmin,
  createFacultry,
  findAllUsers,
  findMe,
  changeUserStatus,
};
