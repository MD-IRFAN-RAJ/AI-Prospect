import BackgroundEffects from './BackgroundEffects';
import HeroTitle from './HeroTitle';
import SearchBar from './SearchBar';
import TrendingBrands from './TrendingBrands';
import { useSearch } from '@/features/search/hooks/useSearch';

const Hero = () => {
	const { results, loading, stage, error } = useSearch();

	return (
		<section className="relative isolate overflow-hidden px-4 pb-14 pt-14 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
			<BackgroundEffects />

			<div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10">
				<div className="mx-auto max-w-4xl space-y-8">
					<HeroTitle />
					<SearchBar />
					<TrendingBrands />
					<p className="text-center text-sm text-white/45 md:text-base">
						AI searches contacts in seconds
					</p>
					{error ? (
						<div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-center text-sm text-red-200 backdrop-blur-xl">
							<span className="text-lg">⚠️</span>
							<p className="font-semibold leading-relaxed">{error}</p>
						</div>
					) : null}
					{loading ? (
						<div className="mx-auto flex max-w-2xl items-center justify-center gap-3 rounded-full border border-white/10 bg-white/8 px-4 py-3 text-sm text-white/75 backdrop-blur-xl">
							<span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
							{stage ?? 'Finding company...'}
						</div>
					) : null}
				</div>

				{results ? <div className="h-2" /> : null}
			</div>
		</section>
	);
};

export default Hero;