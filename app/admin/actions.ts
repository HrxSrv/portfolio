"use server";

import { updateTag } from "next/cache";
import { getAdmin } from "@/lib/auth";
import { RESUMES_TAG, setActiveResume } from "@/lib/resumes";

// Server Actions are public endpoints, so each one checks the session itself.

export async function makeActive(_prev: string | null, formData: FormData): Promise<string | null> {
  if (!(await getAdmin())) return "Your session has expired. Sign in again.";
  try {
    await setActiveResume(String(formData.get("id")));
  } catch (err) {
    console.error(err);
    return err instanceof Error ? err.message : "Couldn't update the active résumé.";
  }
  updateTag(RESUMES_TAG);
  return null;
}
