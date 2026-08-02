export type SearchContact = {
	name: string;
	title: string;
	company: string;
	match: string;
	score: number;
	email: string;
	linkedin: string;
};

export type SearchNewsItem = {
	title: string;
	age: string;
	useCase: string;
	urlLabel: string;
};

export type SearchSourceItem = {
	label: string;
	value: string;
};

export type SearchResult = {
	query: string;
	company: {
		name: string;
		industry: string;
		website: string;
		summary: string;
		recentLaunch: string;
	};
	contacts: SearchContact[];
	aiSummary: {
		headline: string;
		bestAngle: string;
		confidence: number;
	};
	email: {
		subject: string;
		body: string;
	};
	linkedin: {
		message: string;
	};
	news: SearchNewsItem[];
	sources: SearchSourceItem[];
};

function toTitleCase(value: string) {
	return value
		.trim()
		.replace(/\s+/g, ' ')
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ');
}

function toSlug(value: string) {
	return value
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '') || 'brand';
}

import axios from 'axios';

export async function searchBrand(query: string): Promise<SearchResult> {
	const brand = toTitleCase(query);

	try {
		const res = await axios.post('http://localhost:4000/api/search', { company: brand }, { headers: { 'Content-Type': 'application/json' } });

		const payload = res.data?.data;

		if (!payload) throw new Error('Invalid response');

		const company = {
			name: payload.company.name,
			industry: payload.company.industry || 'Unknown',
			website: payload.company.website || '',
			summary: payload.company.summary || '',
			recentLaunch: payload.news?.[0]?.title || '',
		};

		const contacts = (payload.contacts || []).map((c: any) => ({
			name: c.name,
			title: c.designation || c.title || '',
			company: payload.company.name,
			match: c.bestContact ? 'Best Match' : '',
			score: c.prospectScore ?? c.score ?? 0,
			email: c.email,
			linkedin: c.linkedin,
		}));

		return {
			query: brand,
			company,
			contacts,
			aiSummary: {
				headline: payload.aiSummary?.headline || payload.summary || '',
				bestAngle: payload.aiSummary?.bestAngle || 'Prospecting Hook',
				confidence: payload.aiSummary?.confidence ?? 100,
			},
			email: {
				subject: payload.email?.subject || `Outreach for ${brand}`,
				body: payload.email?.body || (typeof payload.email === 'string' ? payload.email : ''),
			},
			linkedin: {
				message: payload.linkedin?.message || (typeof payload.linkedin === 'string' ? payload.linkedin : ''),
			},
			news: payload.news || [],
			sources: payload.sources || [],
		} as SearchResult;
	} catch (err) {
		console.warn('Search API failed, falling back to mock', err);
		// Fallback to previous mock implementation for resilience
		await new Promise((resolve) => setTimeout(resolve, 800));
		const slug = toSlug(query);
		const brand = toTitleCase(query);

		return {
			query: brand,
			company: {
				name: brand,
				industry: 'Electronics',
				website: `https://www.${slug}.com`,
				summary: `${brand} has high-intent decision makers across brand and performance marketing.`,
				recentLaunch: `${brand} recently launched a new flagship campaign with premium positioning.`,
			},
			contacts: [
				{ name: 'Ankit Sharma', title: 'Marketing Director', company: brand, match: 'Best Match', score: 98, email: `ankit.sharma@${slug}.com`, linkedin: 'linkedin.com/in/ankit-sharma' },
				{ name: 'Priya Kapoor', title: 'Head of Growth', company: brand, match: 'High Intent', score: 94, email: `priya.kapoor@${slug}.com`, linkedin: 'linkedin.com/in/priya-kapoor' },
				{ name: 'Rohan Mehta', title: 'Brand Lead', company: brand, match: 'New Signal', score: 89, email: `rohan.mehta@${slug}.com`, linkedin: 'linkedin.com/in/rohan-mehta' },
			],
			aiSummary: { headline: `${brand} recently launched a high-visibility product push.`, bestAngle: 'Shopping Intent Campaign', confidence: 98 },
			email: { subject: `Boost ${brand} Reach`, body: `Hello ${brand} team,\n\nI noticed your latest campaign and wanted to share a sharper way to capture high-intent buyers.` },
			linkedin: { message: `Hi Ankit, I came across ${brand}'s recent launch and thought I could share a few high-intent marketing contacts.` },
			news: [ { title: `${brand} unveils new flagship launch`, age: '2 days ago', useCase: 'Use this in outreach', urlLabel: 'Read' } ],
			sources: [ { label: 'LinkedIn', value: brand }, { label: 'News', value: 'Recent launch coverage' }, { label: 'Company', value: `${brand} website` } ],
		} as SearchResult;
	}
}