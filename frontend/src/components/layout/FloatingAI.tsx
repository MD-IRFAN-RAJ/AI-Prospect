export function FloatingAI() {
	return (
		<div className="pointer-events-none fixed bottom-6 right-6 z-40 max-w-sm">
			<div className="pointer-events-auto glass-card animate-glow p-4 shadow-2xl shadow-cyan-950/40">
				<p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">AI Assistant</p>
				<p className="mt-2 text-sm text-slate-200">
					Ask for a summary, a follow-up sequence, or a quick contact shortlist.
				</p>
			</div>
		</div>
	);
}
