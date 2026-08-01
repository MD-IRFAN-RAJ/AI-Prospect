import { type HTMLAttributes } from 'react';
import { cn } from '../../lib';

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
	glow?: boolean;
};

export function GlassCard({ className, glow = false, ...props }: GlassCardProps) {
	return (
		<div
			className={cn('glass-card rounded-[28px] p-6', glow && 'animate-glow', className)}
			{...props}
		/>
	);
}
