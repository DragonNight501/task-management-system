type ToastProps = {
  message: string;
  phase: "loading" | "success" | "";
  type?: "success" | "danger";
};

export default function Toast({
  message,
  phase,
  type = "success",
}: ToastProps) {
  if (!phase) return null;

  const isDanger = type === "danger";

  return (
    <div className="success-overlay">
      <div className="success-card">
        {phase === "loading" ? (
          <div className={isDanger ? "danger-spinner" : "success-spinner"} />
        ) : (
          <div className={isDanger ? "danger-check" : "success-check"}>
            {isDanger ? "✕" : "✓"}
          </div>
        )}

        <h3 className="success-title">
          {phase === "loading"
            ? "Processing..."
            : isDanger
              ? "Deleted"
              : "Success"}
        </h3>

        <p className="success-message">{message}</p>
      </div>
    </div>
  );
}
