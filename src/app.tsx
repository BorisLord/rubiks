import "./app.css";

import { render } from "preact";
import { Header } from "./components/Header.js";
import { NotFound } from "./pages/_404.js";
import { LocationProvider, Route, Router } from "preact-iso";

import RenderScene from "./components/RenderScene.js";
import { Home } from "./pages/Scenes.js";

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
