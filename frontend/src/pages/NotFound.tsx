import { Link } from 'react-router-dom';
import { routes } from '../config/routes';
import { GlassCard } from '../components/common/GlassCard';

export function NotFound() {
	return (
		<section className="page-container grid min-h-[70vh] place-items-center py-10">
			<GlassCard className="max-w-xl text-center">
				<p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">404</p>
				<h1 className="mt-4 text-4xl text-white">Page not found</h1>
				<p className="mt-3">The route you opened does not exist.</p>
				<Link
					to={routes.home}
					className="glass-button mt-6 inline-flex rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-3 font-medium text-slate-950"
				>
					Back home
				</Link>
			</GlassCard>
		</section>
	);
}
