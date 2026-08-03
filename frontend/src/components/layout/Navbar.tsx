import { Settings, Sparkles, Bell } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<header className="sticky top-0 z-30 border-b border-white/10 bg-[hsl(var(--background))/0.7] backdrop-blur-2xl">
			<div className="page-container flex h-16 items-center justify-between py-0">
				{/* Left side: Brand Logo */}
				<Link to="/" className="flex items-center gap-3 group">
					<div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-cyan-300 shadow-lg shadow-cyan-500/10 backdrop-blur-xl bg-linear-to-br from-cyan-400/10 to-violet-400/10 transition-transform group-hover:scale-105">
						<Sparkles className="h-5 w-5" />
					</div>
					<div className="leading-tight">
						<p className="text-lg font-bold text-white tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text">
							ProspectFlow AI
						</p>
					</div>
				</Link>

				{/* Center: Navigation Links */}
				<nav className="hidden items-center gap-8 text-sm font-medium md:flex">
					<NavLink
						to="/"
						className={({ isActive }) =>
							`relative py-5 transition-colors duration-200 hover:text-white ${
								isActive ? 'text-cyan-400 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-cyan-400' : 'text-slate-300'
							}`
						}
					>
						Dashboard
					</NavLink>
					<a
						href="/#features"
						className="py-5 text-slate-300 transition-colors duration-200 hover:text-white"
					>
						Features
					</a>
					<NavLink
						to="/history"
						className={({ isActive }) =>
							`relative py-5 transition-colors duration-200 hover:text-white ${
								isActive ? 'text-cyan-400 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-cyan-400' : 'text-slate-300'
							}`
						}
					>
						History
					</NavLink>
					<a
						href="/#intelligence"
						className="py-5 text-slate-300 transition-colors duration-200 hover:text-white"
					>
						Intelligence
					</a>
				</nav>

				{/* Right side: Actions & User Menu */}
				<div className="flex items-center gap-4">
					<button
						type="button"
						className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition duration-200"
						aria-label="Notifications"
					>
						<Bell className="h-4 w-4" />
						<span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
						<span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-cyan-400" />
					</button>

					<Link
						to="/settings"
						className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition duration-200"
						aria-label="Settings"
					>
						<Settings className="h-4 w-4" />
					</Link>

					<div className="h-10 w-10 rounded-full border border-cyan-400/30 bg-gradient-to-br from-cyan-400 to-violet-500 p-[1px] shadow-md shadow-cyan-500/10">
						<div className="flex h-full w-full items-center justify-center rounded-full bg-slate-950 text-xs font-semibold text-white">
							AP
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
