const SkeletonLine = ({ className = "" }) => (
  <div className={`animate-pulse rounded-full bg-white/[0.08] ${className}`} />
);

const ChatSkeleton = ({ rows = 5 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-3"
        >
          <div className="h-11 w-11 shrink-0 animate-pulse rounded-2xl bg-white/[0.08]" />
          <div className="min-w-0 flex-1 space-y-2">
            <SkeletonLine className="h-3 w-2/5" />
            <SkeletonLine className="h-3 w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatSkeleton;
