"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyTimeConflict = void 0;
const facultyTimeConflict = (newShedule, existingShedule) => {
    for (const shedule of existingShedule) {
        const exitingStartTime = new Date(`1970-01-01T${shedule.startTime}`);
        const exitingEndTime = new Date(`1970-01-01T${shedule.endTime}`);
        const newStartTime = new Date(`1970-01-01T${newShedule.startTime}`);
        const newEndTime = new Date(`1970-01-01T${newShedule.endTime}`);
        // 10:30 - 12:30  new
        // 13:30 - 15:30  exist
        if (newStartTime < exitingEndTime && newEndTime > exitingStartTime) {
            return true;
        }
    }
    return false;
};
exports.facultyTimeConflict = facultyTimeConflict;
