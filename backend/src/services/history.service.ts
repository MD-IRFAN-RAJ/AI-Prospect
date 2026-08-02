import { listSearchHistory, saveSearchHistory } from '../supabase/repository.js';

export async function getHistory() {
  return listSearchHistory();
}

export async function addHistoryEntry(query: string) {
  return saveSearchHistory(query);
}