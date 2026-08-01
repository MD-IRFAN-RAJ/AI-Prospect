import { GlassCard } from '../components/common/GlassCard';
import { GradientButton } from '../components/common/GradientButton';

export function Settings() {
	return (
		<section className="space-y-6 py-10">
			<div className="section-title">
				<h1 className="text-3xl text-white md:text-4xl">Settings</h1>
				<p>Tune theme, search defaults, and AI workflow preferences.</p>
			</div>

			<GlassCard className="space-y-4">
				<div>
					<p className="text-white">Theme control</p>
					<p>Theme switching is wired through the provider layer.</p>
				</div>
				<GradientButton>Save preferences</GradientButton>
			</GlassCard>
		</section>
	);
}
