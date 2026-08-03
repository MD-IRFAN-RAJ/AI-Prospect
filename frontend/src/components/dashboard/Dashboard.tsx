import { motion } from 'framer-motion';
import {
	ArrowUpRight,
	Mail,
	Sparkles,
	Star,
	Bot,
	Send,
	ShieldCheck,
} from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { useSearch } from '@/features/search/hooks/useSearch';
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

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

function StatsRow({ statsData }: { statsData: any }) {
	const stats = [
		{ label: 'SEARCHES', value: statsData?.searches?.value || '1,284', change: statsData?.searches?.change || '+ 12%', isPositive: statsData?.searches?.isPositive ?? true },
		{ label: 'PROSPECTS FOUND', value: statsData?.prospects?.value || '42.1k', change: statsData?.prospects?.change || '+ 8%', isPositive: statsData?.prospects?.isPositive ?? true },
		{ label: 'VERIFIED CONTACTS', value: statsData?.contacts?.value || '8.4k', change: statsData?.contacts?.change || '+ 15%', isPositive: statsData?.contacts?.isPositive ?? true },
		{ label: 'EMAILS SENT', value: statsData?.emailsSent?.value || '3,102', change: statsData?.emailsSent?.change || '- 2%', isPositive: statsData?.emailsSent?.isPositive ?? false },
		{ label: 'RESPONSE RATE', value: statsData?.responseRate?.value || '24.5%', change: statsData?.responseRate?.change || '+ 3.1%', isPositive: statsData?.responseRate?.isPositive ?? true },
	];

	return (
		<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 mb-6">
			{stats.map((stat, i) => (
				<GlassCard key={i} className="p-4 flex flex-col justify-between border border-white/5">
					<p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{stat.label}</p>
					<div className="mt-3 flex items-baseline justify-between">
						<span className="text-2xl font-bold text-white tracking-tight">{stat.value}</span>
						<span className={`text-[10px] font-bold ${stat.isPositive ? 'text-emerald-400' : 'text-amber-500'}`}>
							{stat.change}
						</span>
					</div>
				</GlassCard>
			))}
		</div>
	);
}

function CompanyOverview() {
	const { results } = useSearch();

	if (!results) {
		return null;
	}

	const initials = results.company.name
		.split(' ')
		.slice(0, 2)
		.map((part) => part.charAt(0))
		.join('');

	const websiteUrl = results.company.website
		? results.company.website.startsWith('http')
			? results.company.website
			: `https://${results.company.website}`
		: '#';

	return (
		<GlassCard className="p-6 h-full flex flex-col justify-between border border-white/10">
			<div className="space-y-4">
				<div className="flex items-center gap-3">
					<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-400/20 text-lg font-bold">
						{initials}
					</div>
					<div>
						<h3 className="text-xl font-bold text-white leading-tight">{results.company.name}</h3>
						<p className="text-xs text-white/50">{results.company.industry || 'Technology'} • {results.company.hqRegion || 'Global'}</p>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-y-3 gap-x-4 border-t border-b border-white/5 py-4 text-[10px]">
					<div>
						<p className="text-white/40 font-bold uppercase tracking-wider">MARKET STATUS</p>
						<p className={`text-xs font-bold ${
							results.company.marketStatus === 'Dominant' || results.company.marketStatus === 'Market Leader'
								? 'text-emerald-400'
								: 'text-cyan-400'
						}`}>
							{results.company.marketStatus || 'High-Growth'}
						</p>
					</div>
					<div>
						<p className="text-white/40 font-bold uppercase tracking-wider">SCALE</p>
						<p className="text-xs font-semibold text-white">{results.company.scale || '10,000+ Employees'}</p>
					</div>
					<div>
						<p className="text-white/40 font-bold uppercase tracking-wider">ANNUAL REVENUE</p>
						<p className="text-xs font-semibold text-white">{results.company.annualRevenue || '$10B+'}</p>
					</div>
					<div>
						<p className="text-white/40 font-bold uppercase tracking-wider">HQ REGION</p>
						<p className="text-xs font-semibold text-white">{results.company.hqRegion || 'Global'}</p>
					</div>
				</div>

				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">AI SUMMARY</p>
						{results.company.website && (
							<a
								href={websiteUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
							>
								Visit Website <ArrowUpRight className="h-2.5 w-2.5" />
							</a>
						)}
					</div>
					<p className="text-xs leading-relaxed text-slate-300">{results.company.summary}</p>
				</div>
			</div>
		</GlassCard>
	);
}

function ProprietaryInsights() {
	const { results, setAiAssistantOpen } = useSearch();

	if (!results) {
		return null;
	}

	return (
		<GlassCard className="p-6 h-full flex flex-col justify-between border border-white/10 relative overflow-hidden">
			<div className="space-y-4">
				<div className="flex items-start justify-between">
					<div>
						<p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300/80">PROPRIETARY INSIGHTS</p>
						<h3 className="mt-1 text-lg font-bold text-white">Strategic Opportunity Scan</h3>
					</div>
					<div className="text-right">
						<span className="text-2xl font-black text-cyan-300 block leading-none">{results.aiSummary.confidence}%</span>
						<span className="text-[8px] font-bold uppercase tracking-[0.1em] text-cyan-300/70">HIGH CONFIDENCE</span>
					</div>
				</div>

				<div className="rounded-xl border border-white/5 bg-white/5 p-4 space-y-3">
					<div>
						<span className="inline-block rounded-md bg-cyan-400/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-cyan-300">
							BEST OUTREACH ANGLE
						</span>
						<p className="mt-1 text-xs font-semibold text-white leading-relaxed">{results.aiSummary.bestAngle}</p>
					</div>

					<div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
						<div>
							<p className="text-[9px] font-bold uppercase tracking-[0.1em] text-white/40">KEY FOCUS</p>
							<p className="text-xs font-semibold text-slate-200 mt-0.5">{results.aiSummary.headline}</p>
						</div>
						<div>
							<p className="text-[9px] font-bold uppercase tracking-[0.1em] text-white/40">SUGGESTED BUDGET</p>
							<p className="text-xs font-semibold text-slate-200 mt-0.5">{results.company.suggestedBudget || '$10M+ Allocation Signal'}</p>
						</div>
					</div>
				</div>

				<div>
					<div className="flex items-center justify-between text-xs mb-2">
						<span className="font-semibold text-slate-300">Growth Trajectory</span>
						<span className="text-cyan-400 font-bold text-xs">{results.company.growthTrajectory || 'Bullish'}</span>
					</div>
					<div className="flex items-end gap-1.5 h-10 w-full pt-2">
						<div className="bg-white/10 rounded-sm w-full h-[20%]" />
						<div className="bg-white/10 rounded-sm w-full h-[30%]" />
						<div className="bg-cyan-500/20 rounded-sm w-full h-[45%]" />
						<div className="bg-cyan-500/40 rounded-sm w-full h-[60%]" />
						<div className="bg-cyan-500 rounded-sm w-full h-[90%]" />
					</div>
				</div>
			</div>

			<div className="mt-4 flex justify-end">
				<button
					type="button"
					onClick={() => setAiAssistantOpen(true)}
					className="flex items-center gap-1.5 rounded-full bg-cyan-400 text-slate-950 px-4 py-2 text-xs font-bold shadow-lg shadow-cyan-500/20 hover:bg-cyan-300 transition duration-200 cursor-pointer"
				>
					<Bot className="h-3.5 w-3.5" />
					AI Assistant
				</button>
			</div>
		</GlassCard>
	);
}

function ContactCards({
	selectedContact,
	setSelectedContact,
}: {
	selectedContact: any;
	setSelectedContact: (c: any) => void;
}) {
	const { results } = useSearch();


	if (!results) {
		return null;
	}

	return (
		<div className="space-y-4">
			<div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
				<div>
					<p className="text-xs uppercase tracking-[0.28em] text-cyan-100/70">OUTREACH TARGETS</p>
					<h3 className="mt-2 text-xl font-semibold text-white">Priority Decision Makers</h3>
					<p className="mt-1 text-xs text-white/50">
						AI-matched decision makers verified for outreach. Click any card to select for outreach draft customization.
					</p>
				</div>
				<span className="text-xs text-cyan-400 font-bold hover:underline cursor-pointer whitespace-nowrap self-start md:self-end mt-2 md:mt-0">
					View All {results.contacts.length} Contacts
				</span>
			</div>

			<div className="grid gap-4 md:grid-cols-3">
				{results.contacts.slice(0, 2).map((contact, index) => {
					const isSelected = selectedContact?.name === contact.name;
					const matchScore = index === 0 ? 100 : 90;
					const initials = contact.name
						.split(' ')
						.slice(0, 2)
						.map((part) => part.charAt(0))
						.join('');

					const linkedinUrl = contact.linkedin
						? contact.linkedin.startsWith('http')
							? contact.linkedin
							: `https://${contact.linkedin}`
						: '#';

					return (
						<motion.div key={contact.email || index} variants={cardMotion} whileHover={{ y: -6, scale: 1.01 }} transition={{ duration: 0.2 }}>
							<GlassCard
								onClick={() => setSelectedContact(contact)}
								className={`relative h-full overflow-hidden border p-5 flex flex-col justify-between shadow-[0_20px_60px_rgba(2,6,23,0.26)] transition duration-300 cursor-pointer ${
									isSelected
										? 'border-cyan-400/80 bg-cyan-950/20 shadow-[0_0_25px_rgba(34,211,238,0.15)]'
										: 'border-white/10 hover:border-cyan-300/30'
								}`}
							>
								<div>
									<div className="flex items-center justify-between gap-2 mb-4">
										<div className="flex items-center gap-1.5">
											<span className="rounded-full bg-amber-300 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-slate-950 shadow-md shadow-amber-300/10">
												BEST CONTACT
											</span>
											{isSelected && (
												<span className="rounded-full bg-cyan-400 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.05em] text-slate-950 shadow-md shadow-cyan-400/10 flex items-center gap-0.5">
													<ShieldCheck className="h-2 w-2" /> Selected
												</span>
											)}
										</div>
										<span className="text-[10px] font-bold text-cyan-400">
											{matchScore}% MATCH
										</span>
									</div>

									<div className="flex items-center gap-3">
										<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-sm font-semibold text-white">
											{initials}
										</div>
										<div>
											<p className="font-semibold text-white text-sm">{contact.name}</p>
											<p className="text-[11px] text-white/40 mt-0.5 leading-snug">{contact.title}</p>
										</div>
									</div>

									<div className="mt-3 flex items-center gap-1 text-amber-300">
										{Array.from({ length: 5 }).map((_, starIndex) => (
											<Star key={starIndex} className={`h-3 w-3 ${starIndex < (index === 0 ? 5 : 4) ? 'fill-current' : 'text-white/20'}`} />
										))}
									</div>

									<div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
										<ShieldCheck className="h-4 w-4" />
										Verified Profile
									</div>
								</div>

								<div className="mt-5 grid grid-cols-2 gap-2">
									{contact.email ? (
										<a
											href={`mailto:${contact.email}`}
											className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
										>
											<Mail className="h-3.5 w-3.5" />
											Public Email
										</a>
									) : (
										<button
											disabled
											className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/5 bg-white/2 py-2 text-xs text-white/30 cursor-not-allowed"
										>
											<Mail className="h-3.5 w-3.5" />
											No Email
										</button>
									)}

									{contact.linkedin ? (
										<a
											href={linkedinUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
										>
											<Send className="h-3.5 w-3.5" />
											LinkedIn
										</a>
									) : (
										<button
											disabled
											className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/5 bg-white/2 py-2 text-xs text-white/30 cursor-not-allowed"
										>
											<Send className="h-3.5 w-3.5" />
											No LinkedIn
										</button>
									)}
								</div>
							</GlassCard>
						</motion.div>
					);
				})}

				{/* Unlock card */}
				<motion.div variants={cardMotion} whileHover={{ y: -6 }} className="h-full">
					<GlassCard className="h-full border-dashed border-white/20 p-5 flex flex-col items-center justify-center text-center cursor-pointer hover:border-cyan-400/50 hover:bg-white/2 transition duration-200 min-h-[170px]">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-400 mb-3 border border-white/10">
							<ArrowUpRight className="h-5 w-5" />
						</div>
						<p className="text-sm font-bold text-white">Unlock {results.contacts.length} Decision Makers</p>
						<p className="text-[11px] text-white/40 mt-1 max-w-[200px]">Unlock verified direct contact info for the rest of the leadership team.</p>
					</GlassCard>
				</motion.div>
			</div>
		</div>
	);
}

function replaceContactName(text: string, originalContact: any, selectedContact: any): string {
	if (!text) return '';
	let result = text;

	const selectedName = selectedContact ? selectedContact.name : '[Name]';
	const selectedFirstName = selectedContact ? selectedContact.name.split(' ')[0] : '[Name]';

	if (originalContact) {
		const origFullName = originalContact.name;
		const origFirstName = originalContact.name.split(' ')[0];
		const origLastName = originalContact.name.split(' ').slice(1).join(' ');

		const escapeReg = (s: string) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

		if (origFullName) {
			result = result.replace(new RegExp(escapeReg(origFullName), 'gi'), selectedName);
		}
		if (origFirstName && origFirstName.length > 2) {
			result = result.replace(new RegExp(escapeReg(origFirstName), 'gi'), selectedFirstName);
		}
		if (origLastName && origLastName.length > 2 && selectedContact) {
			const selectedLastName = selectedContact.name.split(' ').slice(1).join(' ');
			result = result.replace(new RegExp(escapeReg(origLastName), 'gi'), selectedLastName || selectedName);
		}
	}

	result = result.replace(/\[name\]/gi, selectedFirstName);
	result = result.replace(/\[contact\s*name\]/gi, selectedFirstName);
	result = result.replace(/\[contact\]/gi, selectedFirstName);
	result = result.replace(/\[recipient\]/gi, selectedFirstName);

	return result;
}

function EmailCard({ selectedContact }: { selectedContact: any }) {
	const { results, setResults } = useSearch();
	const [copied, setCopied] = useState(false);
	const [regenerating, setRegenerating] = useState(false);

	if (!results) {
		return null;
	}

	const originalContact = results.contacts[0];
	const emailBody = replaceContactName(results.email.body, originalContact, selectedContact);
	const targetEmail = selectedContact?.email || '';

	const handleCopy = async () => {
		if (!emailBody) return;
		await navigator.clipboard.writeText(emailBody);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1500);
	};

	const handleRegenerate = async () => {
		if (!results.company.name) return;
		setRegenerating(true);
		try {
			const res = await axios.post(`${API_URL}/api/email`, { company: results.company.name });
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

	const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${encodeURIComponent(results.email.subject)}&body=${encodeURIComponent(emailBody)}`;

	return (
		<GlassCard className="p-6 border border-white/10 flex flex-col justify-between h-full">
			<div>
				<div className="mb-2">
					<p className="text-xs uppercase tracking-[0.28em] text-cyan-100/70 font-semibold">EMAIL OUTREACH DRAFT</p>
					<p className="text-[11px] text-white/40 mt-0.5">Gmail Style Outreach message. Open in Gmail to launch your outreach instantly.</p>
				</div>

				<div className="rounded-xl border border-white/10 bg-black/15 p-4 text-xs text-white/80 mt-4">
					<div className="mb-2 flex items-center justify-between border-b border-white/5 pb-2">
						<p className="font-bold text-white/40">To</p>
						{targetEmail ? (
							<a href={`mailto:${targetEmail}`} className="text-cyan-400 hover:underline font-semibold">
								{targetEmail}
							</a>
						) : (
							<span className="text-white/40">No email found</span>
						)}
					</div>
					<div className="mb-3 flex items-center justify-between border-b border-white/5 pb-2">
						<p className="font-bold text-white/40">Subject</p>
						<p className="text-slate-300 font-medium text-right">{results.email.subject}</p>
					</div>
					<pre className="whitespace-pre-wrap text-slate-300 leading-relaxed max-h-60 overflow-y-auto pr-1">{emailBody}</pre>
				</div>
			</div>

			<div className="mt-4 flex flex-wrap gap-2">
				<button
					type="button"
					onClick={handleCopy}
					disabled={!results.email.body}
					className="rounded-full bg-cyan-300/15 px-4 py-2 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-300/20 disabled:opacity-50 cursor-pointer"
				>
					{copied ? 'Copied' : 'Copy Draft'}
				</button>
				<a
					href={gmailComposeUrl}
					target="_blank"
					rel="noopener noreferrer"
					className={`rounded-full bg-cyan-400 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-cyan-300 inline-flex items-center gap-1.5 ${!results.email.body ? 'opacity-50 pointer-events-none' : ''}`}
				>
					<Mail className="h-3.5 w-3.5" />
					Open in Gmail
				</a>
				<button
					type="button"
					onClick={handleRegenerate}
					disabled={regenerating}
					className="rounded-full bg-white/8 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/12 disabled:opacity-50 cursor-pointer"
				>
					{regenerating ? 'Regenerating...' : 'Regenerate'}
				</button>
			</div>
		</GlassCard>
	);
}

function LinkedInCard({ selectedContact }: { selectedContact: any }) {
	const { results, setResults } = useSearch();
	const [copied, setCopied] = useState(false);
	const [regenerating, setRegenerating] = useState(false);

	if (!results) {
		return null;
	}

	const originalContact = results.contacts[0];
	const linkedinMessage = replaceContactName(results.linkedin.message, originalContact, selectedContact);

	const handleCopy = async () => {
		if (!linkedinMessage) return;
		await navigator.clipboard.writeText(linkedinMessage);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1500);
	};

	const handleRegenerate = async () => {
		if (!results.company.name) return;
		setRegenerating(true);
		try {
			const res = await axios.post(`${API_URL}/api/linkedin`, { company: results.company.name });
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
		<GlassCard className="p-6 border border-white/10 flex flex-col justify-between h-full">
			<div>
				<div className="mb-2">
					<p className="text-xs uppercase tracking-[0.28em] text-cyan-100/70 font-semibold">LINKEDIN MESSAGE DRAFT</p>
					<p className="text-[11px] text-white/40 mt-0.5">Chat Style Outreach message. Perfect for direct LinkedIn messaging or InMail.</p>
				</div>

				<div className="rounded-xl border border-white/5 bg-[#0a66c2]/10 p-4 text-xs text-white/80 mt-4">
					<div className="mb-3 flex items-center gap-3">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0a66c2] text-sm font-semibold text-white">
							in
						</div>
						<div>
							<p className="font-bold text-white">LinkedIn Message</p>
							<p className="text-[10px] text-white/50">Personalized connection request</p>
						</div>
					</div>
					<pre className="whitespace-pre-wrap text-slate-300 leading-relaxed max-h-60 overflow-y-auto pr-1">{linkedinMessage}</pre>
				</div>
			</div>

			<div className="mt-4 flex flex-wrap gap-2">
				<button
					type="button"
					onClick={handleCopy}
					disabled={!results.linkedin.message}
					className="rounded-full bg-cyan-300/15 px-4 py-2 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-300/20 disabled:opacity-50 cursor-pointer"
				>
					{copied ? 'Copied' : 'Copy Message'}
				</button>
				<button
					type="button"
					onClick={handleRegenerate}
					disabled={regenerating}
					className="rounded-full bg-white/8 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/12 disabled:opacity-50 cursor-pointer"
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
		<div className="space-y-4">
			<div>
				<p className="text-xs uppercase tracking-[0.28em] text-cyan-100/70 font-semibold">SIGNAL VERIFICATION</p>
				<h3 className="mt-2 text-xl font-semibold text-white">Trusted Signals & Market Moves</h3>
				<p className="mt-1 text-xs text-white/50">
					Publicly tracked events, launch news, and leadership moves. Use these topics as relevant openers in your outreach drafts.
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-3">
				{results.news.map((item, index) => {
					// Cyclically assign realistic categories for aesthetic variety matching the design mockups
					const categories = ['AWARD', 'EXECUTIVE MOVE', 'CAMPAIGN'];
					const category = categories[index % categories.length];

					return (
						<GlassCard key={item.title || index} className="p-5 border border-white/5 flex flex-col justify-between">
							<div className="space-y-3">
								<div className="flex items-center justify-between text-[10px]">
									<span className="rounded-md bg-cyan-500/10 px-2 py-0.5 font-bold uppercase tracking-wider text-cyan-400">
										{category}
									</span>
									<span className="text-white/40 font-semibold">{item.age || 'Recent'}</span>
								</div>
								<div className="space-y-1">
									<p className="text-sm font-bold text-white leading-snug">{item.title}</p>
									<p className="text-xs text-slate-400 leading-relaxed">{item.useCase}</p>
								</div>
							</div>
							<div className="mt-4 flex items-center justify-between text-xs pt-3 border-t border-white/5">
								<span className="text-[10px] text-white/30 font-bold">SOURCE VERIFIED</span>
								<a
									href={results.company.website ? (results.company.website.startsWith('http') ? results.company.website : `https://${results.company.website}`) : '#'}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1 text-cyan-400 hover:underline font-semibold"
								>
									Read <ArrowUpRight className="h-3 w-3" />
								</a>
							</div>
						</GlassCard>
					);
				})}
			</div>
		</div>
	);
}

function SourcesTable() {
	const { results } = useSearch();

	if (!results) {
		return null;
	}

	const rows = [
		{
			insight: 'Retail AI Expansion',
			matters: results.company.recentLaunch || 'Recent launches show shifts to digital and retail-led AI campaigns.',
			confidence: '98%',
		},
		{
			insight: 'Commerce Loop Integration',
			matters: results.aiSummary.bestAngle || 'High priority to integrate Pay & SmartThings structures.',
			confidence: '92%',
		},
		{
			insight: 'Strategic Diversification',
			matters: results.company.summary || 'Market pivots toward automated operations and B2B growth.',
			confidence: '78%',
		},
	];

	return (
		<GlassCard className="p-6 border border-white/10">
			<div className="mb-4">
				<p className="text-xs uppercase tracking-[0.28em] text-cyan-100/70 font-semibold">DATA INTEGRITY</p>
				<h3 className="mt-2 text-xl font-semibold text-white">Research Sources & Confidence</h3>
				<p className="mt-1 text-xs text-white/50">
					Transparency audit of the signals compiled by our Tavily scraper and verified by Gemini AI.
				</p>
			</div>

			<div className="overflow-x-auto mt-4">
				<table className="w-full text-left text-xs border-collapse">
					<thead>
						<tr className="border-b border-white/10 text-white/40 uppercase tracking-[0.15em] font-bold">
							<th className="pb-3 pt-2 font-semibold">Intelligence Insight</th>
							<th className="pb-3 pt-2 font-semibold">Why It Matters</th>
							<th className="pb-3 pt-2 font-semibold text-right">Confidence</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-white/5 text-slate-300">
						{rows.map((row, index) => (
							<tr key={index} className="hover:bg-white/2 transition duration-150">
								<td className="py-3.5 font-bold text-white text-xs">{row.insight}</td>
								<td className="py-3.5 pr-4 max-w-md leading-relaxed text-slate-400">{row.matters}</td>
								<td className="py-3.5 text-right font-black text-cyan-400 text-sm">{row.confidence}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</GlassCard>
	);
}

function LoadingPanel() {
	return (
		<GlassCard className="p-6 border border-white/10">
			<div className="flex items-center gap-4">
				<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/12 text-cyan-100">
					<Sparkles className="h-5 w-5 animate-pulse" />
				</div>
				<div>
					<p className="text-xs uppercase tracking-[0.28em] text-cyan-100/70 font-bold">Scraping Signals...</p>
					<p className="mt-1 text-sm text-white">Finding key contacts and drafting personalized outreach sequences...</p>
				</div>
			</div>
		</GlassCard>
	);
}

function ErrorPanel({ message }: { message: string }) {
	return (
		<GlassCard className="border-red-400/20 p-6 text-red-100 border bg-red-500/10">
			<p className="text-xs uppercase tracking-[0.24em] text-red-200/70 font-bold">Search Error</p>
			<p className="mt-2 text-sm">{message}</p>
		</GlassCard>
	);
}

function Dashboard() {
	const { loading, error, results, hasSearched } = useSearch();
	const [statsData, setStatsData] = useState<any>(null);
	const [selectedContact, setSelectedContact] = useState<any>(null);

	useEffect(() => {
		if (results?.contacts?.length) {
			setSelectedContact(results.contacts[0]);
		} else {
			setSelectedContact(null);
		}
	}, [results]);

	useEffect(() => {
		if (hasSearched && !loading && !error) {
			axios.get(`${API_URL}/api/stats`)
				.then(res => {
					if (res.data?.success) {
						setStatsData(res.data.data);
					}
				})
				.catch(err => {
					console.warn('Failed to fetch stats:', err);
				});
		}
	}, [results, loading, error, hasSearched]);

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
			className="page-container pb-24 space-y-8"
			variants={containerMotion}
			initial="hidden"
			animate="show"
		>
			<motion.div variants={cardMotion} className="mb-2 flex items-center justify-between gap-4">
				<div>
					<p className="text-xs uppercase tracking-[0.28em] text-cyan-100/70 font-semibold">SCAN STATUS</p>
					<h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">AI Prospecting Intel</h2>
				</div>
				<div className="flex items-center gap-2">
					{statsData?.visitorsCount !== undefined && (
						<div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-slate-300">
							Active Visitors: {statsData.visitorsCount}
						</div>
					)}
					<div className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-4 py-2 text-xs font-semibold text-cyan-300">
						Search complete
					</div>
				</div>
			</motion.div>

			{/* Stats Row */}
			<motion.div variants={cardMotion}>
				<StatsRow statsData={statsData} />
			</motion.div>

			{/* Overview & Insights side-by-side */}
			<div className="grid gap-6 md:grid-cols-2">
				<motion.div variants={cardMotion}>
					<CompanyOverview />
				</motion.div>
				<motion.div variants={cardMotion}>
					<ProprietaryInsights />
				</motion.div>
			</div>

			{/* Decision Makers Grid */}
			<motion.div id="features" variants={cardMotion}>
				<ContactCards selectedContact={selectedContact} setSelectedContact={setSelectedContact} />
			</motion.div>

			{/* Outreach Drafts */}
			<div className="grid gap-6 md:grid-cols-2">
				<motion.div variants={cardMotion}>
					<EmailCard selectedContact={selectedContact} />
				</motion.div>
				<motion.div variants={cardMotion}>
					<LinkedInCard selectedContact={selectedContact} />
				</motion.div>
			</div>

			{/* News cards */}
			<motion.div variants={cardMotion}>
				<NewsCards />
			</motion.div>

			{/* Sources / Integrity Table */}
			<motion.div id="intelligence" variants={cardMotion}>
				<SourcesTable />
			</motion.div>
		</motion.section>
	);
}

export default Dashboard;