import { GlassCard } from '../components/common/GlassCard';
import { Loading } from '../components/common/Loading';

export function Results() {
	return (
		<section className="space-y-6 py-10">
			<div className="section-title">
				<h1 className="text-3xl text-white md:text-4xl">Search results</h1>
				<p>Company summaries, contacts, and outreach content will render here.</p>
			</div>

			<GlassCard>
				<p className="text-white">Results view placeholder.</p>
			</GlassCard>

			<Loading />
		</section>
	);
}
