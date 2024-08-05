import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/homepage/HomePage";
import { Layout } from "./pages/layout/Layout";
import { EditPage } from "./pages/editpage/EditPage";
import { PlayPage } from "./pages/playpage/PlayPage";
import { FinishPage } from "./pages/finishpage/FinishPage";
import { NoPage } from "./pages/nopage/NoPage" ;


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='edit' element={<EditPage />} />
            <Route path="play" element={<PlayPage />} />
            <Route path="finish" element={<FinishPage />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
