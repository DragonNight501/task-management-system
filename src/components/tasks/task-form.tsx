import { useState } from "react";

type Props = {
  onAdd: (title: string, description: string) => void;
};

export default function TaskForm({ onAdd }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  function closeModal() {
    setIsOpen(false);
    setTitle("");
    setDesc("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) return;

    onAdd(title.trim(), desc.trim());
    closeModal();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="create-task-trigger"
      >
        <span className="create-task-plus">+</span>
        New Task
      </button>

      {isOpen ? (
        <div className="modal-overlay">
          <form onSubmit={handleSubmit} className="modal-card">
            <h2 className="modal-title">Create Task</h2>
            <p className="modal-subtitle">
              Add a short task name and a clear description.
            </p>

            <div className="modal-field">
              <label className="modal-label">Task Name</label>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                maxLength={15}
                placeholder="Max 15 chars"
                className="modal-input"
              />
            </div>

            <div className="modal-field">
              <label className="modal-label">Description</label>
              <textarea
                value={desc}
                onChange={(event) => setDesc(event.target.value)}
                maxLength={45}
                rows={3}
                placeholder="Max 45 chars"
                className="modal-input resize-none"
              />
            </div>

            <div className="modal-actions">
              <button type="submit" className="modal-blue-btn">
                Create
              </button>

              <button
                type="button"
                onClick={closeModal}
                className="modal-red-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}
