import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout.tsx';
import { SearchProvider } from '@/features/search/SearchContext';
import Home from '@/pages/Home';

const AppRouter = () => {
	return (
		<BrowserRouter>
			<SearchProvider>
				<AppLayout>
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
				</AppLayout>
			</SearchProvider>
		</BrowserRouter>
	);
};

export default AppRouter;
