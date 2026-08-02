const BackgroundEffects = () => {
	return (
		<div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
			<div className="animate-blob absolute left-[-8rem] top-[-4rem] h-72 w-72 rounded-full bg-cyan-500/18 blur-3xl" />
			<div className="animate-blob absolute right-[-6rem] top-16 h-80 w-80 rounded-full bg-violet-500/14 blur-3xl [animation-delay:1.5s]" />
			<div className="animate-blob absolute bottom-[-8rem] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-400/12 blur-3xl [animation-delay:3s]" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(103,232,249,0.12),_transparent_28%),radial-gradient(circle_at_20%_20%,_rgba(168,85,247,0.10),_transparent_24%),linear-gradient(180deg,_transparent,_rgba(2,6,23,0.18))]" />
			<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30 [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />
		</div>
	);
};

export default BackgroundEffects;