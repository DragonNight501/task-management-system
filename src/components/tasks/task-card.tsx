"use client";

import { useState } from "react";
import type { Task } from "@/types/task";

type Props = {
  task: Task;
  onDelete: (id: number) => void;
  onStatus: (id: number) => void;
  onEdit: (id: number, title: string, description: string) => void;
};

export default function TaskCard({ task, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const statusClasses = {
    TODO: "status-todo",
    IN_PROGRESS: "status-progress",
    DONE: "status-done",
  };

  const statusClass = statusClasses[task.status];

  function closeEdit(resetValues: boolean) {
    setIsClosing(true);

    setTimeout(() => {
      if (resetValues) {
        setTitle(task.title);
        setDescription(task.description);
      }

      setIsEditing(false);
      setIsClosing(false);
    }, 340);
  }

  function handleSave() {
    if (!title.trim()) return;

    onEdit(task.id, title.trim(), description.trim());

    setTimeout(() => {
      closeEdit(false);
    }, 1050);
  }

  function handleCancel() {
    closeEdit(true);
  }

  function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
    event.dataTransfer.setData("taskId", String(task.id));
  }

  return (
    <>
      {isEditing ? (
        <div
          className={`edit-overlay ${isClosing ? "edit-overlay-closing" : ""}`}
          onClick={handleCancel}
        />
      ) : null}

      <div
        draggable={!isEditing}
        onDragStart={handleDragStart}
        className={`animate-fade-up task-card-custom ${
          isEditing
            ? isClosing
              ? "task-card-closing"
              : "task-card-editing"
            : "active:cursor-grabbing"
        }`}
      >
        <span className={`task-status-glow ${statusClass}`} />

        {isEditing ? (
          <>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={15}
              className="task-card-title w-full bg-transparent outline-none"
            />

            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              maxLength={45}
              rows={3}
              className="mt-4 w-full resize-none rounded-2xl border border-[var(--border)] bg-black/20 p-4 text-white outline-none"
            />

            <div className="task-card-actions">
              <button
                type="button"
                onClick={handleSave}
                className="task-action-edit"
              >
                Save
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="task-action-delete"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="task-card-title">{task.title}</h3>

            <p className="task-card-date">
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(new Date(task.createdAt))}
            </p>

            <p className="task-card-description">
              {task.description || "No description provided."}
            </p>

            <div className="task-card-actions">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="task-action-edit"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => onDelete(task.id)}
                className="task-action-delete"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
