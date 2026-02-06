// src/shared/components/EmptyState.tsx

export const EmptyState = ({
  message
}: {
  message: string;
}) => {
  return (
    <div
      style={{
        padding: "1.5rem",
        textAlign: "center",
        color: "#64748b"
      }}
    >
      {message}
    </div>
  );
};
