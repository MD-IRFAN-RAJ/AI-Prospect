import { searchCompany } from './services/search.service.js';

async function test() {
  console.log('Starting test search for Nokia...');
  try {
    const result = await searchCompany('Nokia');
    console.log('Search successful! Result:', JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Search failed with error:', err);
  }
}

test();
