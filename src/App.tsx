import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import Home from './components/Home';
import RowDetails from './components/grid/RowDetails';
import Breadcrumbs from './components/nav/Breadcrumbs';
import VulnerabilitiesPage from './pages/VulnerabilitiesPage';
import LogsPage from './pages/LogsPage';

function App() {
  return (
    <Router>
      <AppContainer>
        <PageWrapper>
          <NavBar role="navigation">
            <NavTitle>Grid Suite</NavTitle>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/vulnerabilities">Vulnerabilities</NavLink>
            <NavLink to="/logs">Application Logs</NavLink>
          </NavBar>
          <Breadcrumbs />
          <MainContent>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/vulnerabilities"
                element={<VulnerabilitiesPage />}
              />
              <Route path="/logs" element={<LogsPage />} />
              <Route path="/details/:id" element={<RowDetails />} />
            </Routes>
          </MainContent>
        </PageWrapper>
      </AppContainer>
    </Router>
  );
}

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f4f7f9;
  font-family: 'Lato', sans-serif;
`;

const PageWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const NavBar = styled.nav`
  background: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  padding: 1rem 2rem;
  margin-bottom: 1rem;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const NavTitle = styled.h1`
  font-size: 1.25rem;
  margin: 0;
  color: #333;
  font-weight: 600;
  margin-right: auto;
`;

const NavLink = styled(Link)`
  color: #646cff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: #535bf2;
  }
`;

const MainContent = styled.main`
  padding-top: 1rem;
  width: 980px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    padding: 0 1rem;
    width: 100%;
  }
`;
export default App;
