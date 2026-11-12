import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Edit3,
  Users,
  MessageSquare,
  BarChart3,
  ArrowLeft,
  CheckCircle,
  LogOut,
  Menu,
  X,
  Plus,
  Eye,
  ExternalLink,
  Copy,
  Check,
  Printer,
  ChevronDown,
  User,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  useInvitationsList,
  useQuickUpdateInvitation,
} from '../../hooks/useAdminInvitations';
import { useLandingContent } from '../../hooks/useBrandSettings';
import InvitationsTab from './dashboard/InvitationsTab';
import EditorTab from './dashboard/EditorTab';
import PhysicalPrintTab from './dashboard/PhysicalPrintTab';
import GuestsTab from './dashboard/GuestsTab';
import RsvpTab from './dashboard/RsvpTab';
import AnalyticsTab from './dashboard/AnalyticsTab';
import CreateInvitationModal from './dashboard/CreateInvitationModal';

const TABS = [
  { id: 'invitations', label: 'Undangan Saya', icon: Sparkles },
  { id: 'editor', label: 'Edit Undangan', icon: Edit3 },
  { id: 'print', label: 'Cetak Fisik', icon: Printer },
  { id: 'guests', label: 'Tamu & Broadcast', icon: Users },
  { id: 'rsvp', label: 'Ucapan & RSVP', icon: MessageSquare },
  { id: 'analytics', label: 'Statistik', icon: BarChart3 },
];

export default function CustomerDashboardPage() {
  const { user, logout } = useAuth();
  const { data: brandData } = useLandingContent();
  const navigate = useNavigate();
  const { data: invitations } = useInvitationsList();
  const quickUpdate = useQuickUpdateInvitation();

  const [activeTab, setActiveTab] = useState('editor');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedInvId, setSelectedInvId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
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

  useEffect(() => {
    if (!selectedInvId && invitations?.length > 0) {
      const yusufInv = invitations.find(
        (i) => i.slug === 'yusuf-cahya' || i.slug === 'yusuf-nabilla'
      );
      setSelectedInvId(yusufInv ? yusufInv.id : invitations[0].id);
    }
  }, [invitations, selectedInvId]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  const selectTab = (id) => {
    setActiveTab(id);
    setSidebarOpen(false);
  };

  const goToInvitation = (id, tab = 'editor') => {
    setSelectedInvId(id);
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  const totalInvitations = invitations?.length ?? 0;
  const totalViews = (invitations ?? []).reduce(
    (sum, inv) => sum + (inv.views_count ?? 0),
    0
  );
  const selectedInv =
    (invitations ?? []).find((inv) => inv.id === selectedInvId) ?? null;

  const handleTogglePublish = async () => {
    if (!selectedInv) return;
    const next = !selectedInv.is_published;
    await quickUpdate.mutateAsync({ id: selectedInv.id, is_published: next });
    showToast(
      next
        ? `Undangan "${selectedInv.groom_name} & ${selectedInv.bride_name}" sekarang TAYANG!`
        : `Undangan "${selectedInv.groom_name} & ${selectedInv.bride_name}" diubah ke DRAFT.`
    );
  };

  const handleCopyActiveLink = () => {
    if (!selectedInv) return;
    const url = `${window.location.origin}/${selectedInv.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    showToast(`Link ${url} berhasil disalin!`);
    setTimeout(() => setCopied(false), 2000);
  };

  const CUSTOMER_SECTIONS = [
    {
      title: 'Undangan',
      items: [
        { id: 'invitations', label: 'Undangan Saya', icon: Sparkles },
        { id: 'editor', label: 'Edit Undangan', icon: Edit3 },
      ],
    },
    {
      title: 'Tamu & Interaksi',
      items: [
        { id: 'guests', label: 'Tamu & Broadcast', icon: Users },
        { id: 'rsvp', label: 'Ucapan & RSVP', icon: MessageSquare },
        { id: 'analytics', label: 'Statistik', icon: BarChart3 },
      ],
    },
    {
      title: 'Output',
      items: [
        { id: 'print', label: 'Cetak Fisik', icon: Printer },
      ],
    },
  ];

  const navItems = (
    <nav className="space-y-4">
      {CUSTOMER_SECTIONS.map((section, sIdx) => (
        <div key={section.title || sIdx} className="space-y-1">
          {section.title && (
            <div className="px-3 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 select-none">
              {section.title}
            </div>
          )}
          <div className="space-y-0.5">
            {section.items.map(({ id, label, icon: Icon }) => {
              const isActive = activeTab === id;
              const isDisabled = id !== 'invitations' && totalInvitations === 0;
              return (
                <button
                  key={id}
                  onClick={() => selectTab(id)}
                  disabled={isDisabled}
                  className={`group w-full px-3 py-2 rounded-xl text-[13px] flex items-center gap-2.5 transition-all duration-200 relative disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ${
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
  const activeTabLabel =
    TABS.find((t) => t.id === activeTab)?.label || 'Studio Undangan';

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
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500 via-pink-400 to-rose-300 p-0.5 shadow-sm shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-purple-600">
                <Sparkles className="w-4 h-4 fill-purple-200 text-purple-600" />
              </div>
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-slate-900 block leading-tight">
                {siteName}
                <span className="text-purple-500 font-serif italic">.</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium block">
                Client Studio
              </span>
            </div>
          </div>
        )}
      </a>

      {/* Centered Role Pill Banner */}
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-50/90 via-pink-50/50 to-slate-50 border border-purple-100/90 rounded-full text-[11px] shadow-2xs">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-bold text-[10px] text-purple-800">
          Client
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

      {/* Full-Height Left Sidebar (Standard Sidebar Pattern) */}
      <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 border-r border-slate-200 bg-white h-screen sticky top-0 p-4">
        <div className="pb-4 mb-4 border-b border-slate-100">
          {sidebarBrandHeader}
        </div>
        <div className="flex-1 overflow-y-auto pr-1">{navItems}</div>
        <div className="mt-auto pt-4 border-t border-slate-100">{backLink}</div>
      </aside>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-2xl p-4 flex flex-col">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              {sidebarBrandHeader}
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{navItems}</div>
            <div className="mt-auto pt-4 border-t border-slate-100">{backLink}</div>
          </div>
        </div>
      )}

      {/* Right Main Column */}
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
              {activeTabLabel}
            </h1>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <div className="hidden lg:flex items-center gap-3 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-600">
              <span className="font-semibold">{totalInvitations} Undangan</span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-indigo-500" />
                {totalViews.toLocaleString('id-ID')} Dilihat
              </span>
            </div>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Buat Undangan Baru</span>
            </button>

            {/* User Profile Dropdown */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                type="button"
                onClick={() => setProfileDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 p-1.5 pl-2 pr-2.5 rounded-full bg-slate-100/90 hover:bg-slate-200/70 border border-slate-200/90 transition-all cursor-pointer shadow-2xs group"
                aria-expanded={profileDropdownOpen}
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 text-white font-bold flex items-center justify-center text-xs shadow-xs shrink-0">
                  {(user?.name ?? 'U').charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline font-semibold text-xs text-slate-700 max-w-[130px] truncate">
                  {user?.name || 'Pelanggan'}
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
                      {user?.name || 'Pelanggan'}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {user?.email || 'user@invitory.com'}
                    </p>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200/70">
                      <span>Akun Client</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="py-1">
                    <button
                      onClick={() => {
                        selectTab('editor');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-purple-700 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-slate-400" />
                      <span>Studio Undangan</span>
                    </button>
                    <a
                      href="/"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-purple-700 flex items-center gap-2.5 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-slate-400" />
                      <span>Buka Halaman Utama</span>
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
          {/* Top Active Invitation Switcher & 1-Click Publish Bar */}
          {totalInvitations > 0 && (
            <div className="no-print mb-6 bg-white border border-slate-200 rounded-2xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3 shadow-xs overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 min-w-0 flex-1">
                <span className="text-xs font-semibold text-slate-500 shrink-0">
                  Pilih Undangan:
                </span>
                <select
                  value={selectedInvId ?? ''}
                  onChange={(e) => setSelectedInvId(Number(e.target.value))}
                  className="w-full sm:w-auto sm:max-w-xs md:max-w-md min-w-0 truncate bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500 cursor-pointer"
                >
                  {invitations.map((inv) => (
                    <option key={inv.id} value={inv.id}>
                      {inv.groom_name} &amp; {inv.bride_name} (/{inv.slug})
                    </option>
                  ))}
                </select>
              </div>

              {selectedInv && (
                <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 text-xs">
                  {/* 1-Click Toggle Publish */}
                  <button
                    type="button"
                    onClick={handleTogglePublish}
                    disabled={quickUpdate.isPending}
                    title="Klik untuk mengubah status Tayang / Draft"
                    className={`px-3 py-2 rounded-xl font-semibold inline-flex items-center gap-2 border transition-all cursor-pointer ${
                      selectedInv.is_published
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                        : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        selectedInv.is_published
                          ? 'bg-emerald-500 animate-pulse'
                          : 'bg-amber-500'
                      }`}
                    />
                    <span>
                      {selectedInv.is_published ? 'TAYANG' : 'DRAFT'}
                    </span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => selectTab('print')}
                      title="Buka Studio Desain Undangan Fisik (Siap Cetak)"
                      className="px-3 h-9 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl inline-flex items-center gap-1.5 font-semibold cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5 text-purple-600" />
                      <span className="hidden sm:inline">Versi Cetak</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyActiveLink}
                      title="Salin Link Undangan"
                      className="w-9 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl inline-flex items-center justify-center cursor-pointer"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    <a
                      href={`/dashboard/preview/${selectedInv.id}`}
                      target="_blank"
                      rel="noreferrer"
                      title="Preview Undangan"
                      className="w-9 h-9 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl inline-flex items-center justify-center"
                    >
                      <Eye className="w-4 h-4" />
                    </a>

                    <a
                      href={`/${selectedInv.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      title="Buka Link Live"
                      className="w-9 h-9 bg-purple-600 hover:bg-purple-700 text-white rounded-xl inline-flex items-center justify-center"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'invitations' && (
            <InvitationsTab
              invitations={invitations ?? []}
              onCreateNew={() => setIsCreateModalOpen(true)}
              onManage={goToInvitation}
              showToast={showToast}
            />
          )}
          {activeTab === 'editor' && selectedInvId && (
            <EditorTab
              invitationId={selectedInvId}
              showToast={showToast}
              onOpenPrintTab={() => selectTab('print')}
            />
          )}
          {activeTab === 'print' && selectedInvId && (
            <PhysicalPrintTab invitationId={selectedInvId} />
          )}
          {activeTab === 'guests' && selectedInvId && (
            <GuestsTab invitationId={selectedInvId} showToast={showToast} />
          )}
          {activeTab === 'rsvp' && selectedInvId && (
            <RsvpTab invitationId={selectedInvId} showToast={showToast} />
          )}
          {activeTab === 'analytics' && selectedInvId && (
            <AnalyticsTab invitationId={selectedInvId} />
          )}

          {activeTab !== 'invitations' && totalInvitations === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
              <p className="text-slate-500 text-sm mb-4">
                Kamu belum punya undangan. Buat undangan pertama dulu.
              </p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-xs inline-flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Buat Undangan Baru</span>
              </button>
            </div>
          )}
        </main>
      </div>

      {isCreateModalOpen && (
        <CreateInvitationModal
          onClose={() => setIsCreateModalOpen(false)}
          onCreated={(inv) => {
            setSelectedInvId(inv.id);
            setActiveTab('editor');
            showToast('Undangan baru berhasil dibuat!');
          }}
        />
      )}
    </div>
  );
}
