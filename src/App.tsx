import KycFlow from "./pages/KycFlow";

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", padding: "16px" }}>
      <div
        style={{
          maxWidth: "640px",
          margin: "0 auto",
          background: "white",
          borderRadius: "8px",
          padding: "16px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        <KycFlow />
      </div>
    </div>
  );
}
