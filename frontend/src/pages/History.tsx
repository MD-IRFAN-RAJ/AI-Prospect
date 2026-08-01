import { GlassCard } from '../components/common/GlassCard';

export function History() {
	return (
		<section className="space-y-6 py-10">
			<div className="section-title">
				<h1 className="text-3xl text-white md:text-4xl">History</h1>
				<p>Previously searched companies and saved prospecting sessions will appear here.</p>
			</div>
			<GlassCard>
				<p className="text-white">Search history is ready for future results.</p>
			</GlassCard>
		</section>
	);
}
