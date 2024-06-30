export default function Button(props: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  const { onClick, children } = props;

  return (
    <button
      className="rounded-md border-2 border-solid border-gray-400 p-2 shadow-lg"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
