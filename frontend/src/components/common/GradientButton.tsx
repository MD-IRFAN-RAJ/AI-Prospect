import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib';

type GradientButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	loading?: boolean;
	leadingIcon?: ReactNode;
};

export function GradientButton({
	className,
	children,
	loading = false,
	leadingIcon,
	disabled,
	...props
}: GradientButtonProps) {
	return (
		<button
			className={cn(
				'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-medium text-slate-950 shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-60',
				loading && 'animate-pulse',
				className,
			)}
			style={{
				backgroundImage: 'linear-gradient(135deg, #67e8f9 0%, #38bdf8 45%, #8b5cf6 100%)',
			}}
			disabled={disabled || loading}
			{...props}
		>
			{loading ? <span>Loading...</span> : leadingIcon}
			<span>{children}</span>
		</button>
	);
}
