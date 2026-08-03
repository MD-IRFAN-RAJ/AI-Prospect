import { useEffect, useState } from 'react';
import { GlassCard } from '../components/common/GlassCard';
import { useSearch } from '@/features/search/hooks/useSearch';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { History as HistoryIcon, ArrowRight, Loader } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

type HistoryItem = {
	id: string;
	query: string;
	created_at: string;
};

export function History() {
	const { search } = useSearch();
	const navigate = useNavigate();
	const [history, setHistory] = useState<HistoryItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchHistory = async () => {
			try {
				const response = await axios.get(`${API_URL}/api/history`);
				if (response.data?.success && response.data?.data) {
					// Deduplicate history queries
					const unique: Record<string, HistoryItem> = {};
					for (const item of response.data.data) {
						if (!unique[item.query.toLowerCase()]) {
							unique[item.query.toLowerCase()] = item;
						}
					}
					setHistory(Object.values(unique));
				}
			} catch (err: any) {
				console.error('Failed to load history', err);
				setError('Failed to load search history. Please check if backend is running.');
			} finally {
				setLoading(false);
			}
		};

		void fetchHistory();
	}, []);

	const handleQueryClick = async (query: string) => {
		navigate('/');
		await search(query);
	};

	return (
		<section className="space-y-6 py-10 page-container">
			<div className="section-title">
				<h1 className="text-3xl font-bold text-white md:text-4xl">Search History</h1>
				<p className="text-slate-400 text-sm">
					Review and restore previous market intelligence scans. Click any brand to reload its priority decision makers and pre-filled email templates.
				</p>
			</div>

			{loading ? (
				<div className="flex justify-center py-10">
					<Loader className="h-6 w-6 animate-spin text-cyan-400" />
				</div>
			) : error ? (
				<GlassCard className="p-6 border border-red-500/20 bg-red-500/5 text-red-300">
					{error}
				</GlassCard>
			) : history.length === 0 ? (
				<GlassCard className="p-8 text-center text-slate-400">
					<p className="text-lg font-semibold text-white mb-2">No Search History yet</p>
					<p className="text-xs">Your searched brands will appear here for fast retrieval.</p>
				</GlassCard>
			) : (
				<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{history.map((item) => (
						<GlassCard
							key={item.id}
							onClick={() => void handleQueryClick(item.query)}
							className="p-5 border border-white/5 hover:border-cyan-400/30 hover:bg-white/5 transition duration-200 cursor-pointer flex items-center justify-between group"
						>
							<div className="flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-400 group-hover:bg-cyan-500/10 group-hover:text-cyan-300 border border-white/10 transition">
									<HistoryIcon className="h-4 w-4" />
								</div>
								<div>
									<p className="font-bold text-white text-sm group-hover:text-cyan-400 transition">{item.query}</p>
									<p className="text-[10px] text-white/35 mt-0.5">
										{new Date(item.created_at).toLocaleDateString(undefined, {
											month: 'short',
											day: 'numeric',
											hour: '2-digit',
											minute: '2-digit',
										})}
									</p>
								</div>
							</div>
							<ArrowRight className="h-4 w-4 text-white/30 group-hover:text-cyan-400 group-hover:translate-x-1 transition" />
						</GlassCard>
					))}
				</div>
			)}
		</section>
	);
}
