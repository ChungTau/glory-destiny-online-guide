// apps/web/src/components/ui/loading.tsx
import { Loader2 } from 'lucide-react'; // 用 Lucide Icons 嘅 Loader2
import { cn } from '@glory-destiny-online-guide/ui/lib/utils'; // 如果你有用 shadcn/ui 嘅 cn 工具

interface LoadingProps {
  className?: string;
}

export function Loading({ className }: LoadingProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
