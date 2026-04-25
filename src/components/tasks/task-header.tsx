import Container from "@/components/ui/container";

type TaskFilter = "ALL" | "TODO" | "IN_PROGRESS" | "DONE";

type Props = {
  search: string;
  setSearch: (value: string) => void;
  filter: TaskFilter;
  setFilter: (value: TaskFilter) => void;
};

const filters: {
  value: TaskFilter;
  dotClass: string;
  label: string;
}[] = [
  { value: "ALL", dotClass: "dot-all", label: "All" },
  { value: "TODO", dotClass: "dot-todo", label: "To Do" },
  { value: "IN_PROGRESS", dotClass: "dot-progress", label: "In Progress" },
  { value: "DONE", dotClass: "dot-done", label: "Done" },
];

export default function TaskHeader({
  search,
  setSearch,
  filter,
  setFilter,
}: Props) {
  return (
    <header className="border-b border-[var(--border)] bg-black/20 backdrop-blur-xl">
      <Container className="flex min-h-24 flex-wrap items-center justify-between gap-6 py-6">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-[var(--text-secondary)]">
            Productivity System
          </p>

          <h1 className="text-4x1 neon-title">Task Management System</h1>
        </div>

        <div className="header-toolbar">
          <div className="search-shell">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search task..."
              className="search-input"
            />
          </div>

          <div className="filter-dots">
            {filters.map((item) => (
              <button
                key={item.value}
                type="button"
                title={item.label}
                onClick={() => setFilter(item.value)}
                className={`filter-dot-button ${
                  filter === item.value ? "active" : ""
                }`}
              >
                <span className={`filter-dot-inner ${item.dotClass}`} />
              </button>
            ))}
          </div>
        </div>
      </Container>
    </header>
  );
}
