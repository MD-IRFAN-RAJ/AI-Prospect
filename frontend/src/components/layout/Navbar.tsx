import { Settings, Sparkles } from 'lucide-react';

const Navbar = () => {
	return (
		<header className="sticky top-0 z-30 border-b border-white/10 bg-[hsl(var(--background))/0.7] backdrop-blur-2xl">
			<div className="page-container flex h-16 items-center justify-between py-0">
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-cyan-200 shadow-lg shadow-cyan-500/10 backdrop-blur-xl bg-linear-to-br from-cyan-400/10 to-violet-400/10">
						<Sparkles className="h-5 w-5" />
					</div>
					<div className="leading-tight">
						<p className="text-sm font-semibold text-white">Buyhatke AI Prospect</p>
						<p className="text-xs text-white/50">Find marketing decision makers faster</p>
					</div>
				</div>

				<nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
					<a className="transition hover:text-white" href="#features">Features</a>
					<a className="transition hover:text-white" href="#history">History</a>
					<button type="button" className="flex items-center gap-2 transition hover:text-white">
						<Settings className="h-4 w-4" />
						Settings
					</button>
						<div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/8 text-sm font-semibold text-white">
						AP
					</div>
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
