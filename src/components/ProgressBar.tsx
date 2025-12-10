type Props = {
  step?: number;
  total?: number;
};

export default function ProgressBar({ step = 1, total = 3 }: Props) {
  const percent = Math.round((step / total) * 100);

  return (
    <div style={{ marginTop: "12px" }}>
      <div style={{ fontSize: "12px", color: "#555", marginBottom: "4px" }}>
        Step {step} of {total} ({percent}%)
      </div>
      <div
        style={{
          width: "100%",
          background: "#e5e7eb",
          borderRadius: "4px",
          height: "6px",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background: "#16a34a"
          }}
        />
      </div>
    </div>
  );
}
