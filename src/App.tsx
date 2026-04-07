import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import HomePage from './pages/HomePage';
import ExotelHomePage from './pages/ExotelHomePage';
import JourneyExecutionPage from './pages/JourneyExecutionPage';
import JourneyDetailPage from './pages/JourneyDetailPage';
import JourneyCanvasPage from './pages/JourneyCanvasPage';
import WizardPage from './pages/WizardPage';
import LiveMonitorPage from './pages/LiveMonitorPage';
import ContactCenterPage from './pages/ContactCenterPage';
import Contact360Page from './pages/Contact360Page';
import AccountsPage from './pages/AccountsPage';
import ContactsPage from './pages/ContactsPage';
import ReportsPage from './pages/ReportsPage';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/exotel" element={<ExotelHomePage />} />
          <Route path="/journeys" element={<JourneyExecutionPage />} />
          <Route path="/journeys/:id" element={<JourneyDetailPage />} />
          <Route path="/canvas" element={<JourneyCanvasPage />} />
          <Route path="/wizard" element={<WizardPage />} />
          <Route path="/monitor" element={<LiveMonitorPage />} />
          <Route path="/contact-center" element={<ContactCenterPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/contacts/:id" element={<Contact360Page />} />
          <Route path="/accounts" element={<AccountsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
