// src/shared/components/Loader.tsx

export const Loader = ({ text = "Loading..." }: { text?: string }) => {
  return (
    <div
      style={{
        padding: "1rem",
        textAlign: "center",
        color: "#475569"
      }}
    >
      {text}
    </div>
  );
};
