
import React from 'react';
import {Router, Route, browserHistory} from 'react-router';

import MainPage from '../ui/pages/MainPage.jsx';
import CategoriesPage from '../ui/pages/CategoriesPage.jsx';
import ProjectsPage from '../ui/pages/ProjectsPage.jsx';
import NotFoundPage from '../ui/pages/NotFoundPage.jsx';

export default function renderRoutes(){
	return (
		<Router history={browserHistory}>
			<Route path="/" component={MainPage} />
			<Route path="/categories" component={CategoriesPage} />
			<Route path="/projects" component={ProjectsPage} />
			<Route path="/*" component={NotFoundPage} />
		</Router>
	);
}