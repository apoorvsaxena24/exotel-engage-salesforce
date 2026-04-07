import { cn } from '../../utils';

const variants: Record<string, string> = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-amber-100 text-amber-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
  neutral: 'bg-gray-100 text-gray-700',
  purple: 'bg-purple-100 text-purple-800',
};

export function Badge({ children, variant = 'neutral', className, dot }: {
  children: React.ReactNode; variant?: keyof typeof variants; className?: string; dot?: boolean;
}) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold', variants[variant], className)}>
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', variant === 'success' ? 'bg-green-500' : variant === 'warning' ? 'bg-amber-500' : variant === 'error' ? 'bg-red-500' : 'bg-gray-500')} />}
      {children}
    </span>
  );
}
