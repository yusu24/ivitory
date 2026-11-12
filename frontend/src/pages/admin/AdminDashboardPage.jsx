import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Sparkles,
  Globe,
  ShoppingBag,
  Users,
  Settings,
  ArrowLeft,
  CheckCircle,
  LogOut,
  Menu,
  X,
  Heart,
  ShieldCheck,
  CreditCard,
  ExternalLink,
  ChevronDown,
  User,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSuperAdminOrders } from '../../hooks/useOrders';
import { useInvitationsList } from '../../hooks/useAdminInvitations';
import { useLandingContent } from '../../hooks/useBrandSettings';
import OverviewTab from './dashboard/OverviewTab';
import AdminInvitationsTab from './dashboard/AdminInvitationsTab';
import TemplatesTab from './dashboard/TemplatesTab';
import LandingTab from './dashboard/LandingTab';
import OrdersTab from './dashboard/OrdersTab';
import UsersTab from './dashboard/UsersTab';
import SettingsTab from './dashboard/SettingsTab';

const NAV_SECTIONS = [
  {
    title: 'Ringkasan',
    items: [
      { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Kelola Undangan',
    items: [
      { id: 'orders', label: 'Pesanan', icon: ShoppingBag },
      { id: 'invitations', label: 'Undangan', icon: Heart },
      { id: 'customers', label: 'Pelanggan', icon: Users },
    ],
  },
  {
    title: 'Desain & Konten',
    items: [
      { id: 'templates', label: 'Template', icon: Sparkles },
      {
        id: 'landing',
        label: 'Landing Page',
        icon: Globe,
        superAdminOnly: true,
      },
    ],
  },
  {
    title: 'Sistem & Konfigurasi',
    items: [
      {
        id: 'admins',
        label: 'Tim Admin',
        icon: ShieldCheck,
        superAdminOnly: true,
      },
      {
        id: 'settings',
        label: 'Pengaturan',
        icon: Settings,
        superAdminOnly: true,
      },
    ],
  },
];

export default function AdminDashboardPage() {
  const { user, logout } = useAuth();
  const { data: brandData } = useLandingContent();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isSuperAdmin = user?.role === 'superadmin';

  const { data: orders } = useSuperAdminOrders();
  const { data: invitations = [] } = useInvitationsList();

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  const totalRevenue = (orders ?? []).reduce(
    (sum, o) => sum + (o.status === 'paid' ? o.amount : 0),
    0
  );
  const activeOrdersCount = (orders ?? []).filter((o) => o.status === 'paid').length;
  const pendingOrdersCount = (orders ?? []).filter((o) => o.status === 'pending').length;

  const selectTab = (id) => {
    setActiveTab(id);
    setSidebarOpen(false);
  };

  const visibleSections = NAV_SECTIONS.map((sec) => ({
    ...sec,
    items: sec.items.filter((item) => !item.superAdminOnly || isSuperAdmin),
  })).filter((sec) => sec.items.length > 0);

  const visibleNavItems = visibleSections.flatMap((s) => s.items);

  const navItems = (
    <nav className="space-y-4">
      {visibleSections.map((section, sIdx) => (
        <div key={section.title || sIdx} className="space-y-1">
          {section.title && (
            <div className="px-3 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 select-none">
              {section.title}
            </div>
          )}
          <div className="space-y-0.5">
            {section.items.map(({ id, label, icon: Icon }) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => selectTab(id)}
                  className={`group w-full px-3 py-2 rounded-xl text-[13px] flex items-center gap-2.5 transition-all duration-200 relative cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-500/12 via-purple-500/8 to-pink-500/5 text-purple-950 font-bold border border-purple-200/80 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 font-medium'
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-gradient-to-b from-purple-600 to-pink-500 rounded-r-full" />
                  )}

                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-tr from-purple-600 to-pink-500 text-white shadow-xs shadow-purple-500/25 scale-105'
                        : 'text-slate-400 group-hover:text-purple-600 group-hover:scale-110'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <span className="flex-1 text-left truncate">{label}</span>

                  {id === 'invitations' && invitations.length > 0 && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive
                          ? 'bg-purple-200/80 text-purple-900'
                          : 'bg-slate-100 text-slate-600 group-hover:bg-purple-50 group-hover:text-purple-700'
                      }`}
                    >
                      {invitations.length}
                    </span>
                  )}
                  {id === 'orders' && pendingOrdersCount > 0 && (
                    <span className="min-w-5 h-5 px-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-[10px] flex items-center justify-center shadow-2xs animate-pulse">
                      {pendingOrdersCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );

  const backLink = (
    <div className="pt-3 border-t border-slate-100">
      <a
        href="/"
        className="w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 text-slate-600 hover:text-purple-700 hover:bg-purple-50/70 transition-all border border-slate-200/70 hover:border-purple-200 shadow-2xs"
      >
        <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
        <span>Lihat Website</span>
      </a>
    </div>
  );

  const siteName = brandData?.site_name || 'Invitory';
  const logoUrl = brandData?.logo_url;
  const activeNavLabel =
    visibleNavItems.find((i) => i.id === activeTab)?.label || 'Dashboard';

  const sidebarBrandHeader = (
    <div className="flex flex-col items-center justify-center text-center space-y-2 py-1">
      <a
        href="/"
        className="flex flex-col items-center justify-center text-center group w-full"
      >
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={siteName}
            className="h-10 w-auto max-w-[160px] object-contain mx-auto transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-1.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-rose-400 p-0.5 shadow-sm shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-purple-600">
                <Sparkles className="w-4 h-4 fill-purple-100 text-purple-600" />
              </div>
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-slate-900 block leading-tight">
                {siteName}
                <span className="text-purple-500 font-serif italic">.</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium block">
                Admin Workspace
              </span>
            </div>
          </div>
        )}
      </a>

      {/* Centered Role Pill Banner */}
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-50/90 via-pink-50/50 to-slate-50 border border-purple-100/90 rounded-full text-[11px] shadow-2xs">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span
          className={`font-bold text-[10px] ${
            isSuperAdmin ? 'text-purple-800' : 'text-indigo-800'
          }`}
        >
          {isSuperAdmin ? 'Super Admin' : 'Admin'}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 font-sans-body selection:bg-purple-200 selection:text-purple-900 flex">
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-zinc-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 font-semibold text-xs border border-zinc-700">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Full-Height Left Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 border-r border-slate-200/80 bg-white h-screen sticky top-0 p-4">
        <div className="pb-3 mb-3 border-b border-slate-100">
          {sidebarBrandHeader}
        </div>
        <div className="flex-1 overflow-y-auto pr-0.5">{navItems}</div>
        <div className="mt-auto">{backLink}</div>
      </aside>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-2xl p-4 flex flex-col">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex-1 min-w-0 pr-2">
                {sidebarBrandHeader}
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{navItems}</div>
            <div className="mt-auto">{backLink}</div>
          </div>
        </div>
      )}

      {/* Right Main Column (Top Header + Page Content) */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl border border-slate-200 cursor-pointer"
              aria-label="Buka menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <h1 className="text-sm sm:text-base font-bold text-slate-900 truncate">
              {activeNavLabel}
            </h1>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <div className="hidden xl:flex items-center gap-3 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-600">
              <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Rp {totalRevenue.toLocaleString('id-ID')}
              </span>
              <span className="text-slate-300">|</span>
              <span className="font-semibold text-slate-700">
                {invitations.length} Undangan Pelanggan
              </span>
            </div>

            {/* User Profile Dropdown */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                type="button"
                onClick={() => setProfileDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 p-1.5 pl-2 pr-2.5 rounded-full bg-slate-100/90 hover:bg-slate-200/70 border border-slate-200/90 transition-all cursor-pointer shadow-2xs group"
                aria-expanded={profileDropdownOpen}
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 text-white font-bold flex items-center justify-center text-xs shadow-xs shrink-0">
                  {(user?.name ?? 'A').charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline font-semibold text-xs text-slate-700 max-w-[130px] truncate">
                  {user?.name || 'Administrator'}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 group-hover:text-slate-600 ${
                    profileDropdownOpen ? 'rotate-180 text-purple-600' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {/* User Profile Info */}
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {user?.name || 'Administrator'}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {user?.email || 'admin@invitory.com'}
                    </p>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200/70">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{isSuperAdmin ? 'Super Admin' : 'Admin'}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="py-1">
                    {isSuperAdmin && (
                      <button
                        onClick={() => {
                          selectTab('settings');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-purple-700 flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <Settings className="w-4 h-4 text-slate-400" />
                        <span>Pengaturan Akun & Sistem</span>
                      </button>
                    )}
                    <a
                      href="/"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-purple-700 flex items-center gap-2.5 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-slate-400" />
                      <span>Buka Website</span>
                    </a>
                  </div>

                  {/* Logout */}
                  <div className="pt-1 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      <span>Keluar dari Akun</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 min-w-0 px-4 sm:px-8 py-6">
          {activeTab === 'overview' && (
            <OverviewTab
              orders={orders ?? []}
              totalRevenue={totalRevenue}
              activeOrdersCount={activeOrdersCount}
              pendingOrdersCount={pendingOrdersCount}
              onNavigateTab={setActiveTab}
              isSuperAdmin={isSuperAdmin}
              showToast={showToast}
            />
          )}

          {activeTab === 'invitations' && (
            <AdminInvitationsTab showToast={showToast} />
          )}

          {activeTab === 'templates' && <TemplatesTab showToast={showToast} />}
          {(activeTab === 'landing' || activeTab === 'pricing') && isSuperAdmin && (
            <LandingTab key="landing-tab" initialSubTab="pricing" showToast={showToast} />
          )}
          {activeTab === 'orders' && <OrdersTab showToast={showToast} />}
          {activeTab === 'customers' && (
            <UsersTab key="customers-tab" mode="customers" showToast={showToast} />
          )}
          {activeTab === 'admins' && isSuperAdmin && (
            <UsersTab key="admins-tab" mode="admins" showToast={showToast} />
          )}
          {activeTab === 'settings' && isSuperAdmin && (
            <SettingsTab showToast={showToast} />
          )}
        </main>
      </div>
    </div>
  );
}
