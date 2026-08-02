import { createContext, type Dispatch, type ReactNode, type SetStateAction, useContext, useState } from 'react';
import { searchBrand, type SearchResult } from '@/services/search.api';

const searchStages = [
	'Finding company...',
	'Searching LinkedIn...',
	'Finding decision makers...',
	'Generating outreach...',
	'Done',
] as const;

export type SearchStage = (typeof searchStages)[number];

type SearchContextValue = {
	query: string;
	setQuery: Dispatch<SetStateAction<string>>;
	loading: boolean;
	error: string | null;
	stage: SearchStage | null;
	results: SearchResult | null;
	hasSearched: boolean;
	search: (value?: string) => Promise<void>;
	setResults: Dispatch<SetStateAction<SearchResult | null>>;
};

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
	const [query, setQuery] = useState('Samsung');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [stage, setStage] = useState<SearchStage | null>(null);
	const [results, setResults] = useState<SearchResult | null>(null);
	const [hasSearched, setHasSearched] = useState(false);

	const delay = (duration: number) => new Promise((resolve) => window.setTimeout(resolve, duration));

	const search = async (value?: string) => {
		const nextQuery = (value ?? query).trim();

		if (!nextQuery) {
			return;
		}

		setQuery(nextQuery);
		setLoading(true);
		setError(null);
		setHasSearched(true);
		setStage(searchStages[0]);

		try {
			for (const nextStage of searchStages.slice(0, -1)) {
				setStage(nextStage);
				await delay(320);
			}

			const data = await searchBrand(nextQuery);
			setResults(data);
			setStage('Done');
			await delay(240);
		} catch (err: any) {
			setResults(null);
			setError(err.message || 'We could not load search results.');
			setStage(null);
		} finally {
			setLoading(false);
		}
	};

	return (
		<SearchContext.Provider value={{ query, setQuery, loading, error, stage, results, hasSearched, search, setResults }}>
			{children}
		</SearchContext.Provider>
	);
}

export function useSearchContext() {
	const context = useContext(SearchContext);

	if (!context) {
		throw new Error('useSearchContext must be used within SearchProvider');
	}

	return context;
}