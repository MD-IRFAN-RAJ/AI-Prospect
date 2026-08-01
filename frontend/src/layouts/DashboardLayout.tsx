import { type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar.tsx';

type DashboardLayoutProps = {
	children?: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<div className="page-container flex gap-6">
			<Sidebar />
			<section className="min-w-0 flex-1">{children ?? <Outlet />}</section>
		</div>
	);
}
