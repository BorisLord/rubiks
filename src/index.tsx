import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";

import { Header } from "./components/Header.jsx";
import { Home } from "./pages/Scenes.js";
import { NotFound } from "./pages/_404.jsx";
import RenderScene from "./components/RenderScene.js";

export function App() {
  return (
    <LocationProvider>
      <div id="app">
        <Header />
        <main>
          <Router>
            <Route path="/" component={Home} />
            <Route path="/renderScene" component={RenderScene} />
            <Route default component={NotFound} />
          </Router>
        </main>
      </div>
    </LocationProvider>
  );
}

const appElement = document.getElementById("app");
if (appElement) {
  render(<App />, appElement);
} else {
  console.error("App root element not found");
}
