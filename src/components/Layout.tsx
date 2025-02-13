import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import Logo from './Logo';

export default function Layout() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="px-4">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center">
              <Logo size="small" color="url(#dDourado)" />
            </Link>
            {location.pathname !== '/register' && (
              <Link
                to="/register"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Cadastrar Nova Joia
              </Link>
            )}
          </div>
        </div>
      </nav>
      <main className="px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}