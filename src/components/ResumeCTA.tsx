type Props = {
  onClick?: () => void;
};

export default function ResumeCTA({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        marginTop: "12px",
        padding: "8px 16px",
        borderRadius: "4px",
        border: "none",
        background: "#2563eb",
        color: "white",
        fontSize: "14px",
        cursor: "pointer"
      }}
    >
      Resume KYC
    </button>
  );
}
