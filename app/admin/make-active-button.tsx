"use client";

import { useActionState } from "react";
import { makeActive } from "./actions";

export function MakeActiveButton({ id, disabled = false }: { id: string; disabled?: boolean }) {
  const [error, action, pending] = useActionState(makeActive, null);
  return (
    <form action={action} className="flex flex-col items-end gap-1">
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        disabled={disabled || pending}
        className="inline-flex h-9 items-center rounded-full border border-line px-4 text-sm font-medium transition hover:border-line-strong disabled:pointer-events-none disabled:opacity-40"
      >
        {pending ? "Saving…" : "Make active"}
      </button>
      {error && (
        <span role="alert" className="max-w-56 text-right text-xs text-danger">
          {error}
        </span>
      )}
    </form>
  );
}
