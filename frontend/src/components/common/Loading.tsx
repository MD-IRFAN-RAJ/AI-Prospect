import { GlassCard } from './GlassCard';

function SkeletonBlock({ className = '' }: { className?: string }) {
	return (
		<div
			className={`animate-shimmer rounded-2xl ${className}`}
			style={{
				backgroundImage:
					'linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.05) 100%)',
				backgroundSize: '200% 100%',
			}}
		/>
	);
}

export function ContactCardSkeleton() {
	return (
		<GlassCard className="space-y-4">
			<div className="flex items-center gap-4">
				<SkeletonBlock className="h-14 w-14 rounded-full" />
				<div className="flex-1 space-y-3">
					<SkeletonBlock className="h-4 w-1/2" />
					<SkeletonBlock className="h-3 w-2/3" />
				</div>
			</div>
			<SkeletonBlock className="h-24 w-full" />
			<div className="flex gap-3">
				<SkeletonBlock className="h-10 flex-1" />
				<SkeletonBlock className="h-10 w-28" />
			</div>
		</GlassCard>
	);
}

export function NewsCardSkeleton() {
	return (
		<GlassCard className="space-y-4">
			<SkeletonBlock className="h-4 w-20" />
			<SkeletonBlock className="h-6 w-4/5" />
			<SkeletonBlock className="h-4 w-full" />
			<SkeletonBlock className="h-4 w-3/4" />
		</GlassCard>
	);
}

export function CompanySummarySkeleton() {
	return (
		<GlassCard className="space-y-4">
			<div className="flex items-center gap-4">
				<SkeletonBlock className="h-12 w-12 rounded-2xl" />
				<div className="flex-1 space-y-3">
					<SkeletonBlock className="h-5 w-2/5" />
					<SkeletonBlock className="h-3 w-1/3" />
				</div>
			</div>
			<SkeletonBlock className="h-36 w-full" />
		</GlassCard>
	);
}

export function Loading() {
	return (
		<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
			<ContactCardSkeleton />
			<NewsCardSkeleton />
			<CompanySummarySkeleton />
		</div>
	);
}
