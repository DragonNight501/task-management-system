"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/container";
import Toast from "@/components/ui/toast";
import TaskHeader from "@/components/tasks/task-header";
import TaskForm from "@/components/tasks/task-form";
import TaskList from "@/components/tasks/task-list";
import { initialTasks } from "@/data/tasks";
import type { Task, TaskStatus } from "@/types/task";

type TaskFilter = "ALL" | "TODO" | "IN_PROGRESS" | "DONE";

const STORAGE_KEY = "task-management-system-tasks";

function getInitialTasks() {
  if (typeof window === "undefined") return initialTasks;

  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return initialTasks;

  try {
    return JSON.parse(saved) as Task[];
  } catch {
    return initialTasks;
  }
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(getInitialTasks);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<TaskFilter>("ALL");
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState("");
  const [toastPhase, setToastPhase] = useState<"loading" | "success" | "">("");
  const [toastType, setToastType] = useState<"success" | "danger">("success");

  useEffect(() => {
    setMounted(true);
  }, []);

  function showToast(message: string, type: "success" | "danger" = "success") {
    setToastType(type);
    setToast("Please wait...");
    setToastPhase("loading");

    setTimeout(() => {
      setToast(message);
      setToastPhase("success");
    }, 350);

    setTimeout(() => {
      setToastPhase("");
    }, 800);
  }
  function saveTasks(nextTasks: Task[]) {
    setTasks(nextTasks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextTasks));
  }

  function addTask(title: string, description: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      status: "TODO",
      createdAt: new Date().toISOString(),
    };

    saveTasks([newTask, ...tasks]);
    showToast("Task added successfully.");
  }

  function deleteTask(id: number) {
    saveTasks(tasks.filter((task) => task.id !== id));
    showToast("Task deleted.", "danger");
  }

  function editTask(id: number, title: string, description: string) {
    saveTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title, description } : task,
      ),
    );

    showToast("Task updated.");
  }

  function changeStatus(id: number) {
    saveTasks(
      tasks.map((task) => {
        if (task.id !== id) return task;

        const nextStatus =
          task.status === "TODO"
            ? "IN_PROGRESS"
            : task.status === "IN_PROGRESS"
              ? "DONE"
              : "TODO";

        return { ...task, status: nextStatus };
      }),
    );

    setFilter("ALL");
    showToast("Status changed.");
  }

  function moveTask(id: number, status: TaskStatus) {
    saveTasks(
      tasks.map((task) => (task.id === id ? { ...task, status } : task)),
    );

    setFilter("ALL");
    showToast("Task moved successfully.");
  }

  function clearTasks() {
    saveTasks([]);
    showToast("All tasks cleared.", "danger");
  }

  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
    .filter((task) => (filter === "ALL" ? true : task.status === filter));

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text-main)]">
      <TaskHeader
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />

      <section className="py-10 md:py-14">
        <Container>
          <div className="space-y-8">
            <div className="tasks-overview-header">
              <div className="tasks-overview-layout">
                <div className="tasks-overview-copy">
                  <h2 className="text-2xl font-semibold">Tasks Overview</h2>

                  <p className="tasks-overview-subtitle">
                    Drag tasks between columns to update their status.
                  </p>
                </div>

                <div className="tasks-overview-actions">
                  <TaskForm onAdd={addTask} />

                  {tasks.length > 0 ? (
                    <button
                      type="button"
                      onClick={clearTasks}
                      className="clear-all-trigger"
                    >
                      Clear All
                    </button>
                  ) : null}
                </div>
              </div>
            </div>

            <TaskList
              tasks={filteredTasks}
              onDelete={deleteTask}
              onStatus={changeStatus}
              onEdit={editTask}
              onMove={moveTask}
            />
          </div>
        </Container>
      </section>

      <Toast message={toast} phase={toastPhase} type={toastType} />
    </main>
  );
}
