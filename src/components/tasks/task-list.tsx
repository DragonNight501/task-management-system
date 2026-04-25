import TaskCard from "@/components/tasks/task-card";
import type { Task, TaskStatus } from "@/types/task";

type Props = {
  tasks: Task[];
  onDelete: (id: number) => void;
  onStatus: (id: number) => void;
  onEdit: (id: number, title: string, description: string) => void;
  onMove: (id: number, status: TaskStatus) => void;
};

const columns: {
  title: string;
  status: TaskStatus;
  description: string;
  titleClass: string;
}[] = [
  {
    title: "To Do",
    status: "TODO",
    description: "Tasks that need to be started.",
    titleClass: "kanban-title-todo",
  },
  {
    title: "In Progress",
    status: "IN_PROGRESS",
    description: "Tasks currently being worked on.",
    titleClass: "kanban-title-progress",
  },
  {
    title: "Done",
    status: "DONE",
    description: "Completed tasks.",
    titleClass: "kanban-title-done",
  },
];

export default function TaskList({
  tasks,
  onDelete,
  onStatus,
  onEdit,
  onMove,
}: Props) {
  function handleDrop(
    event: React.DragEvent<HTMLDivElement>,
    status: TaskStatus,
  ) {
    event.preventDefault();

    const taskId = Number(event.dataTransfer.getData("taskId"));

    if (!taskId) return;

    onMove(taskId, status);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-3">
      {columns.map((column) => {
        const columnTasks = tasks.filter(
          (task) => task.status === column.status,
        );

        return (
          <div
            key={column.status}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDrop(event, column.status)}
            className="min-h-[360px] rounded-[28px] border border-[var(--border)] bg-black/20 p-4 transition duration-300 hover:border-white/10"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h3
                  className={`kanban-column-title text-lg ${column.titleClass}`}
                >
                  {column.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                  {column.description}
                </p>
              </div>

              <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-secondary)]">
                {columnTasks.length}
              </span>
            </div>

            {columnTasks.length === 0 ? (
              <div className="animate-fade-up rounded-2xl border border-dashed border-[var(--border)] p-5 text-sm text-[var(--text-secondary)]">
                Drop tasks here
              </div>
            ) : (
              <div className="space-y-4">
                {columnTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={onDelete}
                    onStatus={onStatus}
                    onEdit={onEdit}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
