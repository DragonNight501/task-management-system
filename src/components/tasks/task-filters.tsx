import Button from "@/components/ui/button";

type TaskFilter = "ALL" | "TODO" | "IN_PROGRESS" | "DONE";

type Props = {
  search: string;
  setSearch: (value: string) => void;
  setFilter: (value: TaskFilter) => void;
};

export default function TaskFilters({ search, setSearch, setFilter }: Props) {
  return (
    <div className="rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Filters & Search</h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Search tasks and filter them by status.
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-[var(--border)] bg-black/20 p-4">
          <label className="mb-2 block text-sm text-[var(--text-secondary)]">
            Search
          </label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by task title"
            className="w-full bg-transparent text-white outline-none placeholder:text-[var(--text-secondary)]"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => setFilter("ALL")}>
            All
          </Button>
          <Button variant="ghost" onClick={() => setFilter("TODO")}>
            To Do
          </Button>
          <Button variant="ghost" onClick={() => setFilter("IN_PROGRESS")}>
            In Progress
          </Button>
          <Button variant="ghost" onClick={() => setFilter("DONE")}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
