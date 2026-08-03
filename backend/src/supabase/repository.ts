import { randomUUID } from 'node:crypto';
import type { CompanyRecord, ContactRecord, SearchHistoryEntry } from '../types/search.js';
import { supabaseClient as supabase } from './client.js';

const searchHistory: SearchHistoryEntry[] = [];
const companiesMap = new Map<string, CompanyRecord>();
const contactsMap = new Map<string, ContactRecord[]>();

export async function saveSearchHistory(query: string) {
  const entry: SearchHistoryEntry = {
    id: randomUUID(),
    query,
    created_at: new Date().toISOString(),
  };

  searchHistory.unshift(entry);

  if (supabase) {
    try {
      await supabase.from('search_history').insert({ query });
    } catch (err) {
      console.warn('Supabase saveSearchHistory error:', err);
    }
  }

  return entry;
}

export async function listSearchHistory() {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('search_history')
        .select('id, query, created_at')
        .order('created_at', { ascending: false })
        .limit(20);

      if (!error && data) {
        return data as SearchHistoryEntry[];
      } else if (error) {
        console.warn('Supabase listSearchHistory query error:', error.message);
      }
    } catch (err) {
      console.warn('Supabase listSearchHistory exception:', err);
    }
  }

  return searchHistory;
}

export async function saveCompany(company: CompanyRecord) {
  companiesMap.set(company.name, company);
  if (supabase) {
    try {
      const { error } = await supabase.from('companies').upsert(company, { onConflict: 'name' });
      if (error) {
        console.warn('Supabase saveCompany error:', error.message);
      }
    } catch (err) {
      console.warn('Supabase saveCompany exception:', err);
    }
  }
}

export async function saveContacts(companyName: string, contacts: ContactRecord[]) {
  contactsMap.set(companyName, contacts);
  if (supabase) {
    try {
      const { data: company, error: cErr } = await supabase.from('companies').select('id').eq('name', companyName).maybeSingle();

      if (cErr) {
        console.warn('Supabase saveContacts select error:', cErr.message);
        return;
      }

      if (company?.id) {
        const { error } = await supabase
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
        if (error) {
          console.warn('Supabase saveContacts upsert error:', error.message);
        }
      }
    } catch (err) {
      console.warn('Supabase saveContacts exception:', err);
    }
  }
}

export async function getSavedCompanyWithContacts(companyName: string) {
  if (supabase) {
    try {
      const { data: company, error: cErr } = await supabase
        .from('companies')
        .select('*')
        .eq('name', companyName)
        .maybeSingle();

      if (company && !cErr) {
        const { data: contacts, error: coErr } = await supabase
          .from('contacts')
          .select('*')
          .eq('company_id', company.id);

        if (!coErr && contacts) {
          return {
            company,
            contacts: contacts.map((c: any) => ({
              name: c.name,
              designation: c.designation,
              title: c.designation,
              company: companyName,
              linkedin: c.linkedin,
              email: c.email,
              confidence: c.confidence,
              prospectScore: c.confidence,
              verifiedProfile: true,
              publicEmail: !!c.email,
              bestContact: c.confidence >= 90,
            })),
          };
        }
      }
    } catch (err) {
      console.warn('Supabase getSavedCompanyWithContacts exception:', err);
    }
  }

  const company = companiesMap.get(companyName);
  const contacts = contactsMap.get(companyName);
  if (company && contacts) {
    return { company, contacts };
  }

  return null;
}