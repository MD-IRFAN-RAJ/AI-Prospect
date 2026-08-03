import { useSearch } from '@/features/search/hooks/useSearch';

const brands = ['Apple Inc.', 'Sony', 'LG', 'Microsoft'];

const TrendingBrands = () => {
	const { search } = useSearch();

	return (
		<div className="flex flex-wrap items-center justify-center gap-3 text-sm text-white/50">
			<span>Quick Search:</span>
			{brands.map((brand) => (
				<button
					key={brand}
					type="button"
					onClick={() => void search(brand)}
					className="cursor-pointer rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-slate-200 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/12 hover:text-white focus:outline-none focus:ring-1 focus:ring-cyan-300"
				>
					{brand}
				</button>
			))}
		</div>
	);
};

export default TrendingBrands;