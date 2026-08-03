import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout.tsx';
import { SearchProvider } from '@/features/search/SearchContext';
import Home from '@/pages/Home';
import { History } from '@/pages/History';
import { Settings } from '@/pages/Settings';

const AppRouter = () => {
	return (
		<BrowserRouter>
			<SearchProvider>
				<AppLayout>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/history" element={<History />} />
						<Route path="/settings" element={<Settings />} />
					</Routes>
				</AppLayout>
			</SearchProvider>
		</BrowserRouter>
	);
};

export default AppRouter;
