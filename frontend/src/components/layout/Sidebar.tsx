import { NavLink } from 'react-router-dom';
import { routes } from '../../config/routes';
import { cn } from '../../lib';

const sidebarItems = [
	{ label: 'Overview', to: routes.home },
	{ label: 'History', to: routes.history },
	{ label: 'Settings', to: routes.settings },
];

export function Sidebar() {
	return (
		<aside className="glass-panel hidden h-fit w-64 shrink-0 p-4 lg:block">
			<div className="space-y-1">
				<p className="text-xs uppercase tracking-[0.24em] text-slate-400">Workspace</p>
				<h2 className="text-xl text-white">Prospect Hub</h2>
			</div>

			<nav className="mt-6 flex flex-col gap-2">
				{sidebarItems.map((item) => (
					<NavLink
						key={item.to}
						to={item.to}
						className={({ isActive }) =>
							cn(
								'rounded-2xl px-4 py-3 text-sm transition-colors',
								isActive ? 'bg-white/14 text-white' : 'text-slate-300 hover:bg-white/8 hover:text-white',
							)
						}
					>
						{item.label}
					</NavLink>
				))}
			</nav>
		</aside>
	);
}
