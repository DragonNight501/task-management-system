import type { Task } from "@/types/task";

export const initialTasks: Task[] = [
  {
    id: 1,
    title: "Design dashboard layout",
    description: "Create the main layout and sidebar structure.",
    status: "TODO",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Build task form",
    description: "Add form inputs for title and description.",
    status: "IN_PROGRESS",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Add status filter",
    description: "Implement filtering by task status.",
    status: "DONE",
    createdAt: new Date().toISOString(),
  },
];
