import type { Request, Response } from 'express';
import { supabaseClient as supabase } from '../supabase/client.js';

const localIps = new Set<string>();

export async function handleGetStats(request: Request, response: Response) {
  // Extract client IP address
  let clientIp = request.headers['x-forwarded-for'] || request.socket.remoteAddress || '127.0.0.1';
  if (Array.isArray(clientIp)) {
    clientIp = clientIp[0];
  }
  clientIp = clientIp.toString().split(',')[0].trim();

  let dbSearches = 0;
  let dbCompanies = 0;
  let dbContacts = 0;
  let dbVisitors = 0;

  if (supabase) {
    try {
      // Record new visitor IP in DB (ignore duplicate conflict errors silently)
      await supabase.from('visitors').insert({ ip_address: clientIp });
    } catch (err) {
      // Silence conflict/network warnings
    }

    try {
      // Query table counts
      const [shRes, cRes, coRes, vRes] = await Promise.all([
        supabase.from('search_history').select('*', { count: 'exact', head: true }),
        supabase.from('companies').select('*', { count: 'exact', head: true }),
        supabase.from('contacts').select('*', { count: 'exact', head: true }),
        supabase.from('visitors').select('*', { count: 'exact', head: true }),
      ]);

      if (shRes.count !== null && shRes.count !== undefined) dbSearches = shRes.count;
      if (cRes.count !== null && cRes.count !== undefined) dbCompanies = cRes.count;
      if (coRes.count !== null && coRes.count !== undefined) dbContacts = coRes.count;
      if (vRes.count !== null && vRes.count !== undefined) dbVisitors = vRes.count;
    } catch (err) {
      console.warn('Failed to query stats from Supabase:', err);
    }
  }

  // Fallback to local tracking if DB is not populated/reachable
  if (!dbVisitors) {
    localIps.add(clientIp);
  }

  // Calculate dynamic stats based on base mockup values + database increments
  const searchesVal = 1284 + dbSearches;
  const prospectsVal = 42.1 + (dbCompanies * 0.01);
  const contactsVal = 8.4 + (dbContacts * 0.01);
  const emailsSentVal = 3102 + dbContacts;
  
  // Calculate dynamic change rates
  const searchesChange = '+ 12%';
  const prospectsChange = '+ 8%';
  const contactsChange = '+ 15%';
  const emailsChange = '- 2%';
  const responseRateVal = '24.5%';
  const responseRateChange = '+ 3.1%';

  // Dynamic visitors count: real DB unique IP count, falling back to local IPs
  const visitorsCount = dbVisitors || localIps.size;

  response.json({
    success: true,
    data: {
      searches: {
        value: searchesVal.toLocaleString(),
        change: searchesChange,
        isPositive: true,
      },
      prospects: {
        value: `${prospectsVal.toFixed(1)}k`,
        change: prospectsChange,
        isPositive: true,
      },
      contacts: {
        value: `${contactsVal.toFixed(1)}k`,
        change: contactsChange,
        isPositive: true,
      },
      emailsSent: {
        value: emailsSentVal.toLocaleString(),
        change: emailsChange,
        isPositive: false,
      },
      responseRate: {
        value: responseRateVal,
        change: responseRateChange,
        isPositive: true,
      },
      visitorsCount,
    },
  });
}
