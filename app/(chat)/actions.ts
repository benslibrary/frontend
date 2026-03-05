"use server";

/**
 * Stub actions for chat features (removed). Kept so components that still
 * import these do not break. Chat UI is no longer in use.
 */

export async function updateChatVisibility(_: {
  chatId: string;
  visibility: "public" | "private";
}) {
  // no-op
}

export async function deleteTrailingMessages(_: { id: string }) {
  // no-op
}
