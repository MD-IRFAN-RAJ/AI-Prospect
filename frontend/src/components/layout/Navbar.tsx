import { Link, NavLink } from 'react-router-dom';
import { routes } from '../../config/routes';
import { cn } from '../../lib';

const navItems = [
	{ label: 'Home', to: routes.home },
	{ label: 'History', to: routes.history },
	{ label: 'Settings', to: routes.settings },
];

export function Navbar() {
	return (
		<header className="sticky top-0 z-40 border-b border-white/10 bg-[hsl(var(--background))/0.72] backdrop-blur-xl">
			<div className="container flex items-center justify-between gap-4 py-4">
				<Link to={routes.home} className="group flex items-center gap-3">
					<span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-400 to-violet-500 text-lg font-semibold text-slate-950 shadow-lg shadow-cyan-500/20">
						AI
					</span>
					<span className="flex flex-col">
						<span className="font-semibold tracking-tight text-white">Buyhatke Prospect</span>
						<span className="text-sm text-slate-300">AI-assisted outbound intelligence</span>
					</span>
				</Link>

				<nav className="hidden items-center gap-2 md:flex">
					{navItems.map((item) => (
						<NavLink
							key={item.to}
							to={item.to}
							className={({ isActive }) =>
								cn(
									'rounded-full px-4 py-2 text-sm transition-colors',
									isActive ? 'bg-white/12 text-white' : 'text-slate-300 hover:bg-white/8 hover:text-white',
								)
							}
						>
							{item.label}
						</NavLink>
					))}
				</nav>
			</div>
		</header>
	);
}
