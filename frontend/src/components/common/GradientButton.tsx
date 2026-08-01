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
				'glass-button inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 px-5 py-3 font-medium text-slate-950 shadow-lg shadow-cyan-500/20 transition duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60',
				loading && 'animate-pulse',
				className,
			)}
			disabled={disabled || loading}
			{...props}
		>
			{loading ? <span>Loading...</span> : leadingIcon}
			<span>{children}</span>
		</button>
	);
}
