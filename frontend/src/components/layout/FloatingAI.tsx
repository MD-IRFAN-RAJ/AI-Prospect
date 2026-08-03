import { useSearch } from '@/features/search/hooks/useSearch';

const FloatingAI = () => {
	const { results, aiAssistantOpen, setAiAssistantOpen } = useSearch();

	if (results && aiAssistantOpen) {
		return (
			<div className="fixed bottom-6 right-6 z-40 w-[320px] rounded-[28px] border border-white/10 bg-slate-950/90 p-5 text-sm text-white shadow-2xl shadow-cyan-950/40 backdrop-blur-2xl">
				<div className="flex items-center justify-between gap-3">
					<div className="flex items-center gap-2 text-cyan-400">
						<span className="text-lg">✨</span>
						<p className="font-bold">AI Copilot</p>
					</div>
					<button type="button" className="text-xs text-white/55 transition hover:text-white cursor-pointer" onClick={() => setAiAssistantOpen(false)}>
						Collapse
					</button>
				</div>
				<p className="mt-3 text-xs text-slate-300 leading-relaxed">Need another contact or a faster draft?</p>
				<div className="mt-4 grid gap-2">
					<button className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-left text-xs font-semibold hover:bg-white/10 transition cursor-pointer">
						Improve Email
					</button>
					<button className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-left text-xs font-semibold hover:bg-white/10 transition cursor-pointer">
						Generate Follow-up
					</button>
					<button className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-left text-xs font-semibold hover:bg-white/10 transition cursor-pointer">
						Summarize Company
					</button>
				</div>
			</div>
		);
	}

	if (!results) return null;

	return (
		<button
			type="button"
			onClick={() => setAiAssistantOpen(true)}
			className="fixed bottom-6 right-6 z-20 rounded-full border border-cyan-400/20 bg-slate-950/80 px-4 py-3 text-xs font-bold text-white shadow-2xl shadow-cyan-950/20 backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white/10 hover:border-cyan-400/40 cursor-pointer flex items-center gap-1.5"
		>
			<span>✨</span> AI Assistant
		</button>
	);
};

export default FloatingAI;
