"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterRegistration = void 0;
const mongoose_1 = require("mongoose");
const semesterRegistration_constant_1 = require("./semesterRegistration.constant");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const semsesterRegistrationSchema = new mongoose_1.Schema({
    academicSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: "AcademicSemester",
    },
    status: {
        type: String,
        enum: semesterRegistration_constant_1.SemesterRegistrationStatus,
        default: "UPCOMMING",
    },
    startDate: { type: Date, trim: true, required: true },
    endDate: { type: Date, trim: true, required: true },
    minCredit: { type: Number, trim: true, default: 3 },
    maxCredit: { type: Number, trim: true, default: 15 },
}, {
    timestamps: true,
});
// const schema = new Schema<IUser, UserModel>({ name: String });
// schema.static('myStaticMethod', function myStaticMethod() {
//   return 42;
// });
semsesterRegistrationSchema.static("isExisteSemesterRegistrationStaticMethod", function isExisteSemesterRegistrationStaticMethod(academicSemester) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isSemesterRegistrationExiste = yield SemesterRegistration.findOne({
                academicSemester,
            });
            if (isSemesterRegistrationExiste) {
                throw new AppError_1.default(http_status_1.default.CONFLICT, "This Semester is already Registred !");
            }
        }
        catch (err) {
            throw new AppError_1.default(http_status_1.default.CONFLICT, `${err}`);
        }
    });
});
// const User = model<IUser, UserModel>('User', schema);
// const answer: number = User.myStaticMethod(); // 42
const SemesterRegistration = (0, mongoose_1.model)("SemesterRegistration", semsesterRegistrationSchema);
exports.SemesterRegistration = SemesterRegistration;
