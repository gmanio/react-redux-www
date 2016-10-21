import App from './containers/App';

import {
    LoaderComponent,
    GpsComponent,
    CounterComponent,
    NavComponent
} from './components/index'

const routes = [
    { path: '/',
        component: App,
        // childRoutes: [
        //     { path: 'nav',
        //         component: NavComponent
        //     }
        // ]
    }
];

export default routes;