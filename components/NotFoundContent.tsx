import { ReactNode } from "react";

type NotFoundContentProps = {
  title: string;
  message: string;
  actions: ReactNode;
};

export function NotFoundContent({ title, message, actions }: NotFoundContentProps) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="mb-6">
          <span className="font-serif text-8xl text-[var(--polaris-star)] opacity-20">
            404
          </span>
        </div>
        <h1 className="font-serif text-2xl text-[var(--polaris-star)] mb-4">
          {title}
        </h1>
        <p className="text-[var(--polaris-cream-muted)] mb-8">
          {message}
        </p>
        {actions}
      </div>
    </div>
  );
}
