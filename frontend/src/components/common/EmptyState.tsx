import { type ReactNode } from 'react';
import { GlassCard } from './GlassCard';
import { GradientButton } from './GradientButton';

type EmptyStateProps = {
	title: string;
	description: string;
	actionLabel?: string;
	onActionClick?: () => void;
	icon?: ReactNode;
};

export function EmptyState({
	title,
	description,
	actionLabel,
	onActionClick,
	icon,
}: EmptyStateProps) {
	return (
		<GlassCard className="mx-auto max-w-2xl text-center">
			<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/8 text-2xl text-cyan-200">
				{icon ?? '⌁'}
			</div>
			<h3 className="mt-5 text-2xl text-white">{title}</h3>
			<p className="mt-3 text-base">{description}</p>
			{actionLabel ? (
				<div className="mt-6">
					<GradientButton onClick={onActionClick}>{actionLabel}</GradientButton>
				</div>
			) : null}
		</GlassCard>
	);
}
