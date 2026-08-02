import { Search, Sparkles } from 'lucide-react';
import { type FormEvent } from 'react';
import { useSearch } from '@/features/search/hooks/useSearch';

const SearchBar = () => {
	const { query, setQuery, loading, search } = useSearch();

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		void search(query);
	};

	return (
		<form onSubmit={handleSubmit} className="mx-auto w-full max-w-3xl">
			<div className="group relative rounded-[28px] border border-white/12 bg-white/8 p-2 shadow-[0_24px_90px_rgba(2,6,23,0.36)] backdrop-blur-2xl transition-all duration-300 hover:border-white/20 hover:shadow-[0_28px_100px_rgba(34,211,238,0.12)] focus-within:border-cyan-300/40 focus-within:shadow-[0_28px_100px_rgba(34,211,238,0.16)]">
				<div className="flex items-center gap-3 rounded-[22px] border border-white/8 bg-black/15 px-4 py-3">
					<Search className="h-5 w-5 flex-none text-cyan-200/90" />
					<input
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						type="text"
						placeholder="Search any brand..."
						className="min-w-0 flex-1 border-0 bg-transparent text-base text-white outline-none placeholder:text-white/35 md:text-lg"
					/>
					<button
						type="submit"
						className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/12 text-cyan-100 transition hover:scale-105 hover:bg-cyan-300/20"
						aria-label="Search"
						disabled={loading}
					>
						{loading ? <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">...</span> : <Sparkles className="h-4 w-4" />}
					</button>
				</div>
			</div>
		</form>
	);
};

export default SearchBar;