import { motion } from 'framer-motion';
import {
	ArrowUpRight,
	BadgeCheck,
	Building2,
	Copy,
	Globe,
	Mail,
	Newspaper,
	Sparkles,
	Star,
	Bot,
	Send,
	ShieldCheck,
} from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { useSearch } from '@/features/search/hooks/useSearch';
import { useState } from 'react';
import axios from 'axios';

const cardMotion = {
	hidden: { opacity: 0, y: 24 },
	show: { opacity: 1, y: 0 },
};

const containerMotion = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.09,
			delayChildren: 0.08,
		},
	},
};

function SectionLabel({ title, subtitle }: { title: string; subtitle: string }) {
	return (
		<div className="mb-4 flex items-end justify-between gap-4">
			<div>
				<p className="text-xs uppercase tracking-[0.28em] text-cyan-100/70">{subtitle}</p>
				<h3 className="mt-2 text-xl font-semibold text-white">{title}</h3>
			</div>
		</div>
	);
}

function CompanyOverview() {
	const { results } = useSearch();

	if (!results) {
		return null;
	}

	return (
		<GlassCard className="p-6">
			<div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
				<div className="space-y-3">
					<div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-100">
						<Building2 className="h-3.5 w-3.5" />
						Company Overview
					</div>
					<div className="flex items-center gap-3">
						<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/8 text-xl font-semibold text-white">
							{results.company.name
								.split(' ')
								.slice(0, 2)
								.map((part) => part.charAt(0))
								.join('')}
						</div>
						<div>
							<h3 className="text-3xl font-semibold text-white">{results.company.name}</h3>
							<p className="text-sm text-cyan-100/75">Recent launch signal detected</p>
						</div>
					</div>
					<div className="grid gap-3 text-sm text-white/65 sm:grid-cols-2">
						<div>
							<p className="text-white/45">Industry</p>
							<p>{results.company.industry}</p>
						</div>
						<div>
							<p className="text-white/45">Website</p>
							<p>{results.company.website}</p>
						</div>
					</div>
				</div>

				<div className="max-w-xl rounded-[26px] border border-white/10 bg-white/6 p-4 text-sm text-white/65">
					<p className="mb-2 text-xs uppercase tracking-[0.24em] text-white/45">AI Summary</p>
					<p>{results.company.summary}</p>
					<p className="mt-3 text-cyan-100/90">Recent Launch: {results.company.recentLaunch}</p>
				</div>
			</div>
		</GlassCard>
	);
}

function ContactCards() {
	const { results } = useSearch();
	const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

	const copyEmail = async (email: string) => {
		await navigator.clipboard.writeText(email);
		setCopiedEmail(email);
		window.setTimeout(() => setCopiedEmail(null), 1200);
	};

	if (!results) {
		return null;
	}

	return (
		<div className="grid gap-4 xl:grid-cols-3">
			{results.contacts.map((contact, index) => (
				<motion.div key={contact.email} variants={cardMotion} whileHover={{ y: -6, scale: 1.01 }} transition={{ duration: 0.2 }}>
					<GlassCard className="group relative h-full overflow-hidden border border-white/10 p-5 shadow-[0_20px_60px_rgba(2,6,23,0.26)] transition duration-300 hover:border-cyan-300/30 hover:shadow-[0_24px_80px_rgba(34,211,238,0.12)]">
						<div className="absolute left-4 top-4 rounded-full bg-amber-300 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-950 shadow-lg shadow-amber-300/20">
							Best Contact
						</div>
						<div className="absolute right-4 top-4 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-100">
							{contact.score}% Match
						</div>
						<div className="mt-8 flex items-start justify-between gap-3">
							<div className="flex items-center gap-4">
								<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-lg font-semibold text-white transition duration-300 group-hover:scale-105">
									{contact.name
										.split(' ')
										.slice(0, 2)
										.map((part) => part.charAt(0))
										.join('')}
								</div>
								<div>
									<p className="text-lg font-semibold text-white">{contact.name}</p>
									<div className="mt-1 flex items-center gap-1 text-amber-300">
										{Array.from({ length: 5 }).map((_, starIndex) => (
											<Star key={starIndex} className={`h-3.5 w-3.5 ${starIndex < Math.round(contact.score / 20) ? 'fill-current' : 'text-white/20'}`} />
										))}
									</div>
									<div className="mt-2 inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/10 px-3 py-1 text-xs font-medium text-emerald-100">
										<ShieldCheck className="h-3.5 w-3.5" />
										Verified Public Profile
									</div>
								</div>
							</div>

							<div className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-medium text-white/65">
								#{index + 1}
							</div>
						</div>

						<div className="mt-4 space-y-2 text-sm text-white/65">
							<p className="font-medium text-white/90">{contact.title}</p>
							<p className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
								<Globe className="h-3.5 w-3.5" />
								{contact.company}
							</p>
							<p className="inline-flex items-center gap-2 rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
								<BadgeCheck className="h-3.5 w-3.5" />
								Public Email
							</p>
						</div>

						<div className="mt-5 flex flex-wrap items-center gap-2 text-white/70">
							{contact.email ? (
								<a
									href={`mailto:${contact.email}`}
									className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-2 text-xs transition hover:bg-white/10 text-white"
								>
									<Mail className="h-3.5 w-3.5" />
									Email
								</a>
							) : (
								<button
									disabled
									className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/4 px-3 py-2 text-xs text-white/30 cursor-not-allowed"
								>
									<Mail className="h-3.5 w-3.5" />
									No Email
								</button>
							)}

							{contact.linkedin ? (
								<a
									href={contact.linkedin.startsWith('http') ? contact.linkedin : `https://${contact.linkedin}`}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-2 text-xs transition hover:bg-white/10 text-white"
								>
									<Send className="h-3.5 w-3.5" />
									LinkedIn
								</a>
							) : (
								<button
									disabled
									className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/4 px-3 py-2 text-xs text-white/30 cursor-not-allowed"
								>
									<Send className="h-3.5 w-3.5" />
									No LinkedIn
								</button>
							)}
							<button
								type="button"
								disabled={!contact.email}
								onClick={() => contact.email && void copyEmail(contact.email)}
								className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-2 text-xs transition hover:bg-white/10 ${!contact.email ? 'opacity-50 cursor-not-allowed' : ''}`}
							>
								<Copy className="h-3.5 w-3.5" />
								{copiedEmail === contact.email ? 'Copied' : 'Copy'}
							</button>
						</div>
					</GlassCard>
				</motion.div>
			))}
		</div>
	);
}

function AiSummaryCard() {
	const { results } = useSearch();

	if (!results) {
		return null;
	}

	return (
		<GlassCard className="p-6">
			<div className="flex items-start gap-4">
				<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/12 text-cyan-100">
					<Bot className="h-5 w-5" />
				</div>
				<div className="flex-1">
					<p className="text-xs uppercase tracking-[0.28em] text-cyan-100/70">AI Summary</p>
					<p className="mt-2 text-lg text-white">{results.aiSummary.headline}</p>
					<div className="mt-4 rounded-[22px] border border-white/10 bg-black/15 p-4 text-sm text-white/70">
						<p className="text-white/45">Best outreach angle</p>
						<p className="mt-1 text-base text-white">{results.aiSummary.bestAngle}</p>
					</div>
				</div>
				<div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-100">
					{results.aiSummary.confidence}% confidence
			</div>
			</div>
		</GlassCard>
	);
}

function EmailCard() {
	const { results, setResults } = useSearch();
	const [copied, setCopied] = useState(false);
	const [regenerating, setRegenerating] = useState(false);

	if (!results) {
		return null;
	}

	const handleCopy = async () => {
		if (!results.email.body) return;
		await navigator.clipboard.writeText(results.email.body);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1500);
	};

	const handleRegenerate = async () => {
		if (!results.company.name) return;
		setRegenerating(true);
		try {
			const res = await axios.post('http://localhost:4000/api/email', { company: results.company.name });
			if (res.data?.success && res.data?.data?.email) {
				setResults((prev) =>
					prev
						? {
								...prev,
								email: {
									...prev.email,
									body: res.data.data.email,
								},
							}
						: null
				);
			}
		} catch (err) {
			console.error('Failed to regenerate email', err);
		} finally {
			setRegenerating(false);
		}
	};

	return (
		<GlassCard className="p-6">
			<SectionLabel title="Email" subtitle="Gmail style" />
			<div className="rounded-[26px] border border-white/10 bg-black/15 p-4 text-sm text-white/80">
				<div className="mb-3 flex items-center justify-between gap-3 border-b border-white/10 pb-3">
					<p className="font-medium text-white">Subject</p>
					<p className="text-white/55">{results.email.subject}</p>
				</div>
				<pre className="whitespace-pre-wrap text-sm leading-7 text-white/70">{results.email.body}</pre>
			</div>

			<div className="mt-4 flex flex-wrap gap-3">
				<button
					type="button"
					onClick={handleCopy}
					disabled={!results.email.body}
					className="rounded-full bg-cyan-300/15 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/20 disabled:opacity-50"
				>
					{copied ? 'Copied' : 'Copy'}
				</button>
				<button
					type="button"
					onClick={handleRegenerate}
					disabled={regenerating}
					className="rounded-full bg-white/8 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/12 disabled:opacity-50"
				>
					{regenerating ? 'Regenerating...' : 'Regenerate'}
				</button>
			</div>
		</GlassCard>
	);
}

function LinkedInCard() {
	const { results, setResults } = useSearch();
	const [copied, setCopied] = useState(false);
	const [regenerating, setRegenerating] = useState(false);

	if (!results) {
		return null;
	}

	const handleCopy = async () => {
		if (!results.linkedin.message) return;
		await navigator.clipboard.writeText(results.linkedin.message);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1500);
	};

	const handleRegenerate = async () => {
		if (!results.company.name) return;
		setRegenerating(true);
		try {
			const res = await axios.post('http://localhost:4000/api/linkedin', { company: results.company.name });
			if (res.data?.success && res.data?.data?.linkedin) {
				setResults((prev) =>
					prev
						? {
								...prev,
								linkedin: {
									message: res.data.data.linkedin,
								},
							}
						: null
				);
			}
		} catch (err) {
			console.error('Failed to regenerate linkedin message', err);
		} finally {
			setRegenerating(false);
		}
	};

	return (
		<GlassCard className="p-6">
			<SectionLabel title="LinkedIn" subtitle="Chat style" />
			<div className="rounded-[26px] border border-white/10 bg-[#0a66c2]/12 p-4 text-white/80">
				<div className="mb-3 flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0a66c2] text-sm font-semibold text-white">
						in
					</div>
					<div>
						<p className="font-medium text-white">LinkedIn message</p>
						<p className="text-xs text-white/55">Personalized outreach draft</p>
					</div>
				</div>
				<p className="text-sm leading-7 text-white/78">{results.linkedin.message}</p>
			</div>

			<div className="mt-4 flex flex-wrap gap-3">
				<button
					type="button"
					onClick={handleCopy}
					disabled={!results.linkedin.message}
					className="rounded-full bg-cyan-300/15 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/20 disabled:opacity-50"
				>
					{copied ? 'Copied' : 'Copy'}
				</button>
				<button
					type="button"
					onClick={handleRegenerate}
					disabled={regenerating}
					className="rounded-full bg-white/8 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/12 disabled:opacity-50"
				>
					{regenerating ? 'Regenerating...' : 'Regenerate'}
				</button>
			</div>
		</GlassCard>
	);
}

function NewsCards() {
	const { results } = useSearch();

	if (!results) {
		return null;
	}

	return (
		<div className="grid gap-4 md:grid-cols-2">
			{results.news.map((item) => (
				<GlassCard key={item.title} className="p-5">
					<div className="flex items-start justify-between gap-4">
						<div className="flex items-center gap-3">
							<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/8 text-cyan-100">
								<Newspaper className="h-5 w-5" />
							</div>
							<div>
								<p className="text-lg font-semibold text-white">{item.title}</p>
								<p className="text-sm text-white/50">{item.age}</p>
							</div>
						</div>
						<button className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/6 px-3 py-2 text-xs text-white/70 transition hover:bg-white/10">
							Read
							<ArrowUpRight className="h-3.5 w-3.5" />
						</button>
					</div>
					<p className="mt-4 text-sm text-white/65">{item.useCase}</p>
				</GlassCard>
			))}
		</div>
	);
}

function Sources() {
	const { results } = useSearch();

	if (!results) {
		return null;
	}

	return (
		<GlassCard className="p-6">
			<SectionLabel title="Sources" subtitle="Trusted signals" />
			<div className="grid gap-4 sm:grid-cols-2">
				{results.sources.map((source, index) => (
					<div key={index} className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/8 hover:border-cyan-300/20">
						<p className="font-semibold text-cyan-200 text-sm mb-1">{source.label}</p>
						<p className="text-white/60 text-xs leading-relaxed break-words">{source.value}</p>
					</div>
				))}
			</div>
		</GlassCard>
	);
}

function LoadingPanel() {
	return (
		<GlassCard className="p-6">
			<div className="flex items-center gap-4">
				<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/12 text-cyan-100">
					<Sparkles className="h-5 w-5 animate-pulse" />
				</div>
				<div>
					<p className="text-xs uppercase tracking-[0.28em] text-cyan-100/70">Loading Animation</p>
					<p className="mt-1 text-lg text-white">Finding the best contacts and writing the first draft...</p>
				</div>
			</div>
		</GlassCard>
	);
}

function ErrorPanel({ message }: { message: string }) {
	return (
		<GlassCard className="border-red-400/20 p-6 text-red-100">
			<p className="text-sm uppercase tracking-[0.24em] text-red-200/70">Search Error</p>
			<p className="mt-2 text-base">{message}</p>
		</GlassCard>
	);
}

function Dashboard() {
	const { loading, error, results, hasSearched } = useSearch();

	if (!hasSearched && !loading && !results) {
		return null;
	}

	if (loading) {
		return (
			<section id="dashboard" className="page-container pb-24">
				<LoadingPanel />
			</section>
		);
	}

	if (error) {
		return (
			<section id="dashboard" className="page-container pb-24">
				<ErrorPanel message={error} />
			</section>
		);
	}

	return (
		<motion.section
			id="dashboard"
			className="page-container pb-24"
			variants={containerMotion}
			initial="hidden"
			animate="show"
		>
			<motion.div variants={cardMotion} className="mb-6 flex items-center justify-between gap-4">
				<div>
					<p className="text-xs uppercase tracking-[0.28em] text-cyan-100/70">Dashboard</p>
					<h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">Results appear below the hero</h2>
				</div>
				<div className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
					Search complete
				</div>
			</motion.div>

			<div className="space-y-6">
				<motion.div variants={cardMotion}><CompanyOverview /></motion.div>
				<motion.div variants={cardMotion}><AiSummaryCard /></motion.div>
				<motion.div variants={cardMotion}><ContactCards /></motion.div>
				<motion.div variants={cardMotion} className="grid gap-6 lg:grid-cols-2">
					<EmailCard />
					<LinkedInCard />
				</motion.div>
				<motion.div variants={cardMotion}><NewsCards /></motion.div>
				<motion.div variants={cardMotion}><Sources /></motion.div>
			</div>
		</motion.section>
	);
}

export default Dashboard;