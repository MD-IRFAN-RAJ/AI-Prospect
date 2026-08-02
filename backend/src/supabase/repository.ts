import { randomUUID } from 'node:crypto';
import type { CompanyRecord, ContactRecord, SearchHistoryEntry } from '../types/search.js';
import { supabaseClient as supabase } from './client.js';

const searchHistory: SearchHistoryEntry[] = [];

export async function saveSearchHistory(query: string) {
  const entry: SearchHistoryEntry = {
    id: randomUUID(),
    query,
    created_at: new Date().toISOString(),
  };

  searchHistory.unshift(entry);

  if (supabase) {
    await supabase.from('search_history').insert({ query });
  }

  return entry;
}

export async function listSearchHistory() {
  if (supabase) {
    const { data, error } = await supabase
      .from('search_history')
      .select('id, query, created_at')
      .order('created_at', { ascending: false })
      .limit(20);

    if (!error && data) {
      return data as SearchHistoryEntry[];
    }
  }

  return searchHistory;
}

export async function saveCompany(company: CompanyRecord) {
  if (supabase) {
    await supabase.from('companies').upsert(company, { onConflict: 'name' });
  }
}

export async function saveContacts(companyName: string, contacts: ContactRecord[]) {
  if (supabase) {
    const { data: company } = await supabase.from('companies').select('id').eq('name', companyName).maybeSingle();

    if (company?.id) {
      await supabase
        .from('contacts')
        .upsert(
          contacts.map((contact) => ({
            company_id: company.id,
            name: contact.name,
            designation: contact.designation,
            linkedin: contact.linkedin,
            email: contact.email,
            confidence: contact.confidence,
          })),
        );
    }
  }
}