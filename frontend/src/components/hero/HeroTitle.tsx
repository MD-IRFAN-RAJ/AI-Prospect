const HeroTitle = () => {
	return (
		<div className="space-y-5 text-center">
			<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-cyan-100 shadow-lg shadow-cyan-500/10 backdrop-blur-xl">
				<span className="h-2 w-2 rounded-full bg-cyan-300" />
				AI prospecting assistant
			</div>

			<h1 className="text-balance animate-fade text-4xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
				<span className="gradient-text animate-gradient bg-size-[200%_200%]">Buyhatke AI Prospect</span>
			</h1>

			<p className="mx-auto max-w-3xl text-balance text-lg text-white/72 md:text-2xl">
				Find marketing decision makers using AI.
			</p>

			<p className="mx-auto max-w-2xl text-sm text-white/52 md:text-base">
				Search a brand, uncover contacts, and let the dashboard animate in below the hero.
			</p>
		</div>
	);
};

export default HeroTitle;