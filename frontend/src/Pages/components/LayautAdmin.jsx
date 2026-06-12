import React from 'react';
import { LayoutDashboard, Tag, Package, FileText, Users, UserCircle, Search, Bell, ChevronDown } from 'lucide-react';

const LayoutAdmin = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col flex-shrink-0">
        <div className="p-8 font-bold text-2xl text-indigo-900">Pharmacy</div>

        <div className="px-6 flex-1">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 ml-2">Menu</p>
          <nav className="space-y-1 mb-10">
            <NavItem icon={LayoutDashboard} label="Dashboard" active />
            <NavItem icon={Tag} label="Categories" />
            <NavItem icon={Package} label="Product" />
            <NavItem icon={FileText} label="Transaction" />
          </nav>

          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 ml-2">Others</p>
          <nav className="space-y-1">
            <NavItem icon={Users} label="Customer" />
            <NavItem icon={UserCircle} label="User" />
          </nav>
        </div>
      </aside>

      {/* CONTENEDOR DERECHO (Navbar + Contenido) */}
      <div className="flex-1 flex flex-col">
        {/* NAVBAR */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8">
          <div>
            <p className="text-xs text-gray-400">Welcome,</p>
            <h3 className="font-bold text-slate-800">Admin</h3>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Search anything" className="w-full pl-10 py-2 bg-gray-50 rounded-xl text-sm outline-none" />
            </div>
            <Bell size={20} className="text-gray-400" />
            <div className="flex items-center gap-2 border-l pl-6">
              <div className="w-8 h-8 rounded-full bg-gray-200"></div>
              <span className="font-semibold text-sm">Annisa Salma</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </header>

        {/* CONTENIDO */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon: Icon, label, active }) => (
  <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? "bg-[#1e1b4b] text-white" : "text-gray-500 hover:bg-gray-50"}`}>
    <Icon size={20} />
    <span className="font-medium text-sm">{label}</span>
  </a>
);

export default LayoutAdmin;