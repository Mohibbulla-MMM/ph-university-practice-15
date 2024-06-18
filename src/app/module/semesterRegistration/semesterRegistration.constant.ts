import { TStatus } from "./semesterRegistration.interface";

export const SemesterRegistrationStatus: TStatus[] = [
  "UPCOMMING",
  "ONGOING",
  "ENDED",
];

export const ConstSemseterStatus = {
  UPCOMMING: "UPCOMMING",
  ONGOING: "ONGOING",
  ENDED: "ENDED",
} as const;


 