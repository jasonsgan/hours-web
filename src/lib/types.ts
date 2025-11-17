export interface TaskDto {
  projectName: string;
  taskName: string;
  hours: number;
  taskDescription: string;
}

export interface TimeLogDto {
  date: string;
  timeIn: string;
  timeOut: string;
  elapsedTime: string;
  workedHours: number;
  tasks: TaskDto[];
}

export interface TimesheetDto {
  timeLogs: TimeLogDto[];
}
