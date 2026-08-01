import { EmptyState } from '../components/common/EmptyState';

export function Home() {
	return (
		<section className="space-y-8 py-10">
			<div className="section-title">
				<span className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">Prospecting workspace</span>
				<h1 className="text-4xl text-white md:text-6xl">Find the right accounts faster.</h1>
				<p className="text-lg">
					Search, summarize, and draft outreach from one glassmorphic dashboard.
				</p>
			</div>

			<EmptyState
				title="No search yet"
				description="Run a company search to generate contacts, news, history, and outreach suggestions."
				actionLabel="Start a search"
			/>
		</section>
	);
}
