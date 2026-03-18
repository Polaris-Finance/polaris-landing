"use client";

export function isNewPost(dateString: string): boolean {
  const postDate = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - postDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 30;
}

export function NewBadge() {
  return (
    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[rgba(var(--polaris-warning-rgb),0.2)] text-[var(--polaris-warning)] border border-[rgba(var(--polaris-warning-rgb),0.3)]">
      New
    </span>
  );
}
