// app/components/Divider.tsx
type DividerProps = {
  className?: string;
};

export default function Divider({ className = "" }: DividerProps) {
  return (
    <div aria-hidden="true" className={`h-[0.5px] bg-[#B5B5B5] ${className}`} />
  );
}
