const brands = ['Samsung', 'Boat', 'Puma', 'Noise', 'Myntra'];

const TrendingBrands = () => {
	return (
		<div className="flex flex-wrap items-center justify-center gap-3">
			{brands.map((brand) => (
				<span
					key={brand}
					className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-white/70 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/12 hover:text-white"
				>
					{brand}
				</span>
			))}
		</div>
	);
};

export default TrendingBrands;