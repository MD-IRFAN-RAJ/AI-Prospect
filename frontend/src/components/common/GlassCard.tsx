import { type HTMLAttributes } from 'react';
import { cn } from '../../lib';

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
	glow?: boolean;
};

export function GlassCard({ className, glow = false, ...props }: GlassCardProps) {
	return (
		<div
			className={cn(
				`hover-lift relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(2,6,23,0.35)] backdrop-blur-2xl`,
				glow && 'animate-glow',
				className,
			)}
			{...props}
		/>
	);
}
