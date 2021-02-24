{/*
	JavaScript/JSX Code used with the [app-react.htm] demo

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
    return <h3 className="loading">Loading...</h3>;
}

function ShowError(props) {
    return <p className="error">{props.error}</p>;
}

function HomePage() {
    return (
        <React.Fragment>
            <h1>Hello World</h1>
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
            isLoaded={<LazyLoadDataPage />}
            loadOnlyOnce={true} />
    );
}

// Load and compile [data-react.jsx] the first time this page is accessed
function LazyLoadDataPage(props) {
    return (
        <LazyLoad
            scripts={[
                "data-react.jsx",
                "https://cdn.jsdelivr.net/npm/semantic-ui-flag@2.4.0/flag.min.css",
            ]}
            isLoading={<ShowLoading />}
            isLoaded="ShowCountries"
            data={props.data}
            params={props.params} />
    );
}

// Load and compile [calc-react.jsx] the first time this page is accessed
function CalculatorPage() {
    return (
        <LazyLoad
            scripts="calc-react.jsx"
            isLoading={<ShowLoading />}
            isLoaded="Calculator" />
    );
}

function DemosPage() {
    return (
        <React.Fragment>
            <h1>Other Demos</h1>
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
                            <NavLink exact to="/" activeClassName="active">Home</NavLink>
                            <NavLink exact to="/calc" activeClassName="active">Calculator</NavLink>
                            <NavLink exact to="/data" activeClassName="active">Data Example</NavLink>
                            <NavLink exact to="/demos" activeClassName="active">Other Demos</NavLink>
                        </nav>
                    </header>

                    <main id="view" className="container">
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/calc" component={CalculatorPage} />
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
