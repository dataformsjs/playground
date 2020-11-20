{/*
	[app-react.htm]演示使用的JavaScript/JSX代码.
    
    <ErrorBoundary>组件提供错误边界以帮助
     解决并显示对组件错误的反应.但是,
     如果这个文件有语法错误,无法编译,
     那么请参考浏览器开发工具查看错误.
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
                            <NavLink exact to="/data" activeClassName="active">Data Example</NavLink>
                            <NavLink exact to="/demos" activeClassName="active">Other Demos</NavLink>
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
