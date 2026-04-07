import { cn } from '../../utils';

export function Card({ children, className, onClick, hover = false }: {
  children: React.ReactNode; className?: string; onClick?: () => void; hover?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-xl border border-gray-200 shadow-sm',
        hover && 'hover:shadow-md hover:border-gray-300 cursor-pointer transition-all duration-200',
        onClick && 'cursor-pointer',
        className,
      )}
    >
      {children}
    </div>
  );
}
