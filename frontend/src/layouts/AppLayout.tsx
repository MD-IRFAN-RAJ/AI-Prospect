import { type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/layout/Footer.tsx';
import { FloatingAI } from '../components/layout/FloatingAI.tsx';
import { Navbar } from '../components/layout/Navbar.tsx';

type AppLayoutProps = {
	children?: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
	return (
		<div className="relative min-h-screen overflow-x-hidden">
			<Navbar />
			<main className="page-container relative z-10">
				{children ?? <Outlet />}
			</main>
			<FloatingAI />
			<Footer />
		</div>
	);
}
