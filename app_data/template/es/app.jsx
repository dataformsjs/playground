{/*
	Código JavaScript / JSX utilizado con la demostración [app-react.htm]
    
    The <ErrorBoundary> component provides Error Boundaries to help
    solve and display React Component Errors. However if you have
    a syntax error with this file that prevents it from being
    compiled then refer to the Browsers Dev Tools to see the error.
*/}
const Router = window.ReactRouterDOM.HashRouter;
const Route = window.ReactRouterDOM.Route;
const NavLink = window.ReactRouterDOM.NavLink;

const format = new Format();

function ShowLoading() {
    return <h3 className="loading">Cargando...</h3>;
}

function ShowError(props) {
    return <p className="error">{props.error}</p>;
}

function HomePage() {
    return (
        <React.Fragment>
            <h1>Hola Mundo</h1>
			<div className="home-page-animation">
                <img src="sun.svg" className="sun" />
                <div className="orbit">
                    <img src="planet.svg" className="planet" />
                    <img src="moon.svg" className="moon" />
                </div>
            </div>
        </React.Fragment>
    );
}

function DataPage() {
    return (
        <JsonData
            url="https://www.dataformsjs.com/data/geonames/countries"
            isLoading={<ShowLoading />}
            hasError={<ShowError />}
            isLoaded={<ShowCountries />}
            loadOnlyOnce={true} />
    );
}

function DemosPage() {
    return (
        <React.Fragment>
            <h1>Otras demostraciones</h1>
            <ul className="demos">
                <li><a href="app.htm">Handlebars</a></li>
                <li><a href="app-vue.htm">Vue + GraphQL</a></li>
                <li><a href="app-web.htm">Web Components</a></li>
            </ul>
        </React.Fragment>
    );
}

class App extends React.Component {
    render() {
        return (
            <ErrorBoundary>
                <Router>
                    <header>
                        <nav>
                            <NavLink exact to="/" activeClassName="active">Casa</NavLink>
                            <NavLink exact to="/data" activeClassName="active">Ejemplo de datos</NavLink>
                            <NavLink exact to="/demos" activeClassName="active">Otras demostraciones</NavLink>
                        </nav>
                    </header>

                    <main id="view" className="container">
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/data" component={DataPage} />
                        <Route exact path="/demos" component={DemosPage} />
                    </main>

                    <footer>
                        <p>{(new Date()).getFullYear()}</p>
                        <p>{(new Date()).toString()}</p>
                    </footer>
                </Router>
            </ErrorBoundary>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
