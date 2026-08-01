import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../layouts';
import { routes } from '../config/routes';
import { History } from '../pages/History';
import { Home } from '../pages/Home';
import { NotFound } from '../pages/NotFound';
import { Results } from '../pages/Results';
import { Settings } from '../pages/Settings';

export function AppRouter() {
	return (
		<Routes>
			<Route element={<AppLayout />}>
				<Route path={routes.home} element={<Home />} />
				<Route path={routes.history} element={<History />} />
				<Route path={routes.settings} element={<Settings />} />
				<Route path={routes.results} element={<Results />} />
				<Route path="/dashboard" element={<Navigate to={routes.home} replace />} />
			</Route>
			<Route path={routes.notFound} element={<NotFound />} />
		</Routes>
	);
}
