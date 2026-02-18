import React, { useState } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
      active
        ? 'bg-blue-900 text-blue-100'
        : 'text-slate-400 hover:text-white hover:bg-slate-800'
    }`}
  >
    {children}
  </Link>
);

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      {/* Navigation */}
      <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-3">
                <img src="/images/logo-trans.png" alt="TRH Senate Logo" className="h-10 w-auto" />
                <div>
                  <h1 className="text-xl font-bold text-white tracking-tight">TRH Senate</h1>
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              <NavLink to="/" active={isActive('/')}>Home</NavLink>
              <NavLink to="/members" active={isActive('/members')}>Members</NavLink>
              <NavLink to="/meetings" active={isActive('/meetings')}>Meetings</NavLink>
              <NavLink to="/documents" active={isActive('/documents')}>Documents</NavLink>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800 pb-4">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
              <NavLink to="/" active={isActive('/')} onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
              <NavLink to="/members" active={isActive('/members')} onClick={() => setMobileMenuOpen(false)}>Members</NavLink>
              <NavLink to="/meetings" active={isActive('/meetings')} onClick={() => setMobileMenuOpen(false)}>Meetings</NavLink>
              <NavLink to="/documents" active={isActive('/documents')} onClick={() => setMobileMenuOpen(false)}>Documents</NavLink>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 text-white mb-4">
                <img src="/images/TRH-white-trans.png" alt="TRH Senate Logo" className="h-8 w-auto" />
                <span className="font-bold text-lg">TRH Senate</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs">
                Dedicated to serving the community through transparent leadership, organised governance, and collaborative action.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/members" className="hover:text-blue-400 transition-colors">Our Members</Link></li>
                <li><Link to="/meetings" className="hover:text-blue-400 transition-colors">Upcoming Meetings</Link></li>
                <li><Link to="/documents" className="hover:text-blue-400 transition-colors">Document Repository</Link></li>
              </ul>
            </div>

            <div>
               <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Administrative</h3>
               <p className="text-sm mb-4">Restricted access for senate administrators only.</p>
               <Link to="/admin" className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300">
                 Admin Panel <ChevronRight className="h-4 w-4 ml-1" />
               </Link>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-center">
            <p>&copy; {new Date().getFullYear()} TRH Senate. All rights reserved.</p>
            <p className="mt-2 text-slate-500 font-medium">Developed by TRH INNOVATION & TECHNOLOGY ORGANIZATION</p>
          </div>
        </div>
      </footer>
    </div>
  );
};