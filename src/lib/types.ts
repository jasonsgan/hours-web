export interface EditTimeLogDto {
  date: string;
  shift: string;
  timeIn: string;
  timeOut: string;
  remarks: string;
  overrideReason: string;
  weekend: boolean;
}

export interface EditTimesheetDto {
  timeLogs: EditTimeLogDto[];
}

export interface TaskDto {
  projectName: string;
  taskName: string;
  hours: number;
  taskDescription: string;
}

export interface TimeLogDto {
  date: string;
  shift: string;
  timeIn: string;
  timeOut: string;
  elapsedTime: string;
  workedHours: number;
  remarks: string;
  overrideReason: string;
  weekend: boolean;
  tasks: TaskDto[];
}

export interface TimesheetDto {
  timeLogs: TimeLogDto[];
}
