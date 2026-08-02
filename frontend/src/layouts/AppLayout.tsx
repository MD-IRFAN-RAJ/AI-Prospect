import type { ReactNode } from 'react';
import Navbar from '@/components/layout/Navbar.tsx';
import Footer from '@/components/layout/Footer.tsx';
import FloatingAI from '@/components/layout/FloatingAI.tsx';

type AppLayoutProps = {
	children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
	return (
		<div className="relative min-h-screen overflow-hidden">
			<Navbar />
			<main>{children}</main>
			<Footer />
			<FloatingAI />
		</div>
	);
};

export default AppLayout;
