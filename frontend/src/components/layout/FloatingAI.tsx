import { useSearch } from '@/features/search/hooks/useSearch';
import { useState } from 'react';

const FloatingAI = () => {
	const { results } = useSearch();
	const [open, setOpen] = useState(false);

	if (results && open) {
		return (
			<div className="fixed bottom-6 right-6 z-20 w-[320px] rounded-[28px] border border-white/10 bg-white/8 p-4 text-sm text-white shadow-2xl shadow-cyan-950/20 backdrop-blur-2xl">
				<div className="flex items-center justify-between gap-3">
					<div className="flex items-center gap-2 text-cyan-100">
						<span className="text-lg">✨</span>
						<p className="font-medium">AI Copilot</p>
					</div>
					<button type="button" className="text-xs text-white/55 transition hover:text-white" onClick={() => setOpen(false)}>
						Collapse
					</button>
				</div>
				<p className="mt-2 text-sm text-white/65">Need another contact or a faster draft?</p>
				<div className="mt-3 grid gap-2">
					<button className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-left transition hover:bg-white/12">
						Improve Email
					</button>
					<button className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-left transition hover:bg-white/12">
						Generate Follow-up
					</button>
					<button className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-left transition hover:bg-white/12">
						Summarize Company
					</button>
				</div>
			</div>
		);
	}

	return (
		<button
			type="button"
			onClick={() => setOpen(true)}
			className="fixed bottom-6 right-6 z-20 rounded-full border border-white/10 bg-white/8 px-4 py-3 text-sm text-white shadow-2xl shadow-cyan-950/20 backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white/12"
		>
			AI Assistant
		</button>
	);
};

export default FloatingAI;
