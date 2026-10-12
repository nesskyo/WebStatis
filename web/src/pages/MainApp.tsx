import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { supabase, type Profile } from '../lib/supabase';
import Button from '../components/ui/Button';
import {
  LogOut,
  User as UserIcon,
  ShieldCheck,
  FolderKanban,
  Clock,
  Sparkles,
  ArrowUpRight,
  Plus,
  CheckCircle2,
  Edit3,
  Save,
  X,
  Layers,
  Activity,
  FileText
} from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: string;
  status: 'In Progress' | 'Review' | 'Completed';
  progress: number;
  dueDate: string;
}

const initialProjects: ProjectItem[] = [
  {
    id: 'PRJ-01',
    title: 'Brand Identity & Design System',
    client: 'Aurelia Studio',
    category: 'Branding',
    status: 'In Progress',
    progress: 75,
    dueDate: '24 Okt 2026',
  },
  {
    id: 'PRJ-02',
    title: 'Web Platform & 3D Interactive Showcase',
    client: 'Zenith Tech Labs',
    category: 'Web Development',
    status: 'Review',
    progress: 90,
    dueDate: '30 Okt 2026',
  },
  {
    id: 'PRJ-03',
    title: 'Editorial Campaign & Digital Assets',
    client: 'Meridian Capital',
    category: 'Art Direction',
    status: 'In Progress',
    progress: 40,
    dueDate: '12 Nov 2026',
  },
  {
    id: 'PRJ-04',
    title: 'Mobile Experience & Micro-Interactions',
    client: 'Pulse Fitness',
    category: 'UI/UX Design',
    status: 'Completed',
    progress: 100,
    dueDate: '04 Okt 2026',
  },
];

export const MainApp: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [fullNameInput, setFullNameInput] = useState('');
  const [isSavingName, setIsSavingName] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Dashboard projects & dynamic brief modal
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [isNewBriefModalOpen, setIsNewBriefModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newClient, setNewClient] = useState('');
  const [newCategory, setNewCategory] = useState('Branding');

  // Load user profile from Supabase profiles table (PRD M-03)
  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      if (!user) return;
      setLoadingProfile(true);

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.warn('[MainApp] Profile fetch error/fallback:', error.message);
          // Fallback to auth metadata if profile row pending
          if (isMounted) {
            const fallbackProfile: Profile = {
              id: user.id,
              email: user.email || '',
              full_name: (user.user_metadata?.full_name as string) || null,
              avatar_url: null,
              created_at: user.created_at || new Date().toISOString(),
              updated_at: new Date().toISOString(),
            };
            setProfile(fallbackProfile);
            setFullNameInput(fallbackProfile.full_name || '');
          }
        } else if (data && isMounted) {
          const profileData = data as Profile;
          setProfile(profileData);
          setFullNameInput(profileData.full_name || '');
        }
      } catch (err) {
        console.error('[MainApp] Error retrieving profile:', err);
      } finally {
        if (isMounted) {
          setLoadingProfile(false);
        }
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Handle Logout (PRD M-05)
  const handleLogout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error('[MainApp] Logout error:', err);
    } finally {
      // Replace history so back button cannot re-enter protected /app
      navigate('/', { replace: true });
    }
  };

  // Update Profile Name (RLS Update Test)
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSavingName(true);
    setSaveSuccess(false);

    try {
      const updatedName = fullNameInput.trim();
      const { error } = await (supabase.from('profiles') as any).upsert({
        id: user.id,
        email: user.email || '',
        full_name: updatedName || null,
        updated_at: new Date().toISOString(),
      });

      if (!error) {
        setProfile((prev) =>
          prev
            ? { ...prev, full_name: updatedName || null }
            : null
        );
        setIsEditingName(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        console.error('[MainApp] Failed to update profile:', error.message);
      }
    } catch (err) {
      console.error('[MainApp] Error updating profile:', err);
    } finally {
      setIsSavingName(false);
    }
  };

  // Add new creative brief
  const handleCreateBrief = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newPrj: ProjectItem = {
      id: `PRJ-0${projects.length + 1}`,
      title: newTitle.trim(),
      client: newClient.trim() || (profile?.full_name || 'Klien NESS'),
      category: newCategory,
      status: 'In Progress',
      progress: 10,
      dueDate: 'Desember 2026',
    };

    setProjects([newPrj, ...projects]);
    setNewTitle('');
    setNewClient('');
    setIsNewBriefModalOpen(false);
  };

  const displayName =
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'Anggota Studio';

  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('id-ID', {
        month: 'long',
        year: 'numeric',
      })
    : '2026';

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-between selection:bg-accent selection:text-cream">
      {/* ── Top Header (PRD M-02) ────────────────────────── */}
      <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b-2 border-ink px-6 md:px-12 py-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="font-display text-2xl md:text-3xl text-ink tracking-tight hover:text-accent transition-colors"
            >
              NESS
            </a>
            <span className="hidden sm:inline-block bg-ink text-cream text-[11px] font-body uppercase font-bold tracking-widest px-2.5 py-1">
              Client Portal
            </span>
          </div>

          {/* User Info & Logout Button */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2.5 text-right">
              <div className="w-9 h-9 bg-ink text-cream flex items-center justify-center font-display text-base border border-ink">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block text-left">
                <p className="font-body text-xs font-bold text-ink leading-tight truncate max-w-[180px]">
                  {displayName}
                </p>
                <p className="font-body text-[11px] text-ink/60 leading-tight truncate max-w-[180px]">
                  {user?.email}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs py-2 px-3.5"
            >
              <LogOut size={14} />
              <span>Keluar</span>
            </Button>
          </div>
        </div>
      </header>

      {/* ── Main Content Container ──────────────────────── */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-6 md:px-12 py-8 md:py-12 space-y-8 md:space-y-10">
        {/* Banner Greeting & Profile Card (PRD M-03) */}
        <section className="bg-cream border-2 border-ink p-6 md:p-8 shadow-[8px_8px_0px_0px_#0A0A0A]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 bg-neon text-ink text-[11px] font-body uppercase font-bold tracking-widest px-2.5 py-0.5 border border-ink">
                  <ShieldCheck size={12} /> Sesi Terverifikasi
                </span>
                <span className="text-xs font-body text-ink/60">
                  Anggota sejak {memberSince}
                </span>
              </div>

              <h1 className="font-display text-3xl md:text-5xl text-ink uppercase tracking-tight">
                Selamat Datang, {displayName}
              </h1>

              <p className="font-body text-sm md:text-base text-ink/70 max-w-2xl">
                Pantau perkembangan proyek kreatif Anda, kirimkan brief baru, dan kelola informasi akun langsung dari dashboard studio NESS.
              </p>
            </div>

            {/* Profile Detail & Edit Name */}
            <div className="border border-ink/20 p-4 bg-ink/5 min-w-[280px] space-y-3">
              <div className="flex items-center justify-between text-xs font-body font-bold uppercase tracking-wider text-ink/80 border-b border-ink/10 pb-2">
                <span className="flex items-center gap-1.5">
                  <UserIcon size={14} className="text-accent" /> Profil Pengguna
                </span>
                {!isEditingName && (
                  <button
                    type="button"
                    onClick={() => setIsEditingName(true)}
                    className="inline-flex items-center gap-1 text-accent hover:underline cursor-pointer"
                  >
                    <Edit3 size={12} /> Edit
                  </button>
                )}
              </div>

              {loadingProfile ? (
                <div className="py-2 text-xs font-body text-ink/60 animate-pulse">
                  Memuat data profil...
                </div>
              ) : isEditingName ? (
                <form onSubmit={handleSaveProfile} className="space-y-2">
                  <input
                    type="text"
                    value={fullNameInput}
                    onChange={(e) => setFullNameInput(e.target.value)}
                    placeholder="Nama Lengkap"
                    className="w-full text-xs font-body px-2.5 py-1.5 border border-ink bg-cream text-ink focus:outline-none focus:border-accent"
                    autoFocus
                  />
                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      disabled={isSavingName}
                      className="px-2.5 py-1 bg-ink text-cream text-[11px] font-body uppercase font-bold tracking-wider inline-flex items-center gap-1 hover:bg-accent cursor-pointer transition-colors"
                    >
                      <Save size={11} /> {isSavingName ? 'Menyimpan...' : 'Simpan'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingName(false);
                        setFullNameInput(profile?.full_name || '');
                      }}
                      className="px-2 py-1 text-ink/70 text-[11px] font-body uppercase font-bold tracking-wider inline-flex items-center gap-1 hover:text-ink cursor-pointer"
                    >
                      <X size={11} /> Batal
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-1 text-xs font-body">
                  <p className="text-ink font-semibold">
                    {profile?.full_name || <span className="text-ink/50 italic">Nama belum diisi</span>}
                  </p>
                  <p className="text-ink/60 truncate">{profile?.email || user?.email}</p>
                </div>
              )}

              {saveSuccess && (
                <div className="text-[11px] font-body text-emerald-700 flex items-center gap-1 font-semibold">
                  <CheckCircle2 size={12} /> Profil berhasil diperbarui!
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Summary Stats Cards (PRD M-04) ──────────────── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-cream border-2 border-ink p-5 shadow-[4px_4px_0px_0px_#0A0A0A] flex flex-col justify-between">
            <div className="flex items-center justify-between text-ink/70 mb-3">
              <span className="font-body text-xs uppercase font-bold tracking-wider">Proyek Aktif</span>
              <FolderKanban size={18} className="text-accent" />
            </div>
            <div>
              <p className="font-display text-4xl text-ink">03</p>
              <p className="font-body text-xs text-ink/60 mt-1">2 sedang tahap produksi</p>
            </div>
          </div>

          <div className="bg-cream border-2 border-ink p-5 shadow-[4px_4px_0px_0px_#0A0A0A] flex flex-col justify-between">
            <div className="flex items-center justify-between text-ink/70 mb-3">
              <span className="font-body text-xs uppercase font-bold tracking-wider">Creative Brief</span>
              <FileText size={18} className="text-accent" />
            </div>
            <div>
              <p className="font-display text-4xl text-ink">{projects.length}</p>
              <p className="font-body text-xs text-ink/60 mt-1">Total brief terdaftar</p>
            </div>
          </div>

          <div className="bg-cream border-2 border-ink p-5 shadow-[4px_4px_0px_0px_#0A0A0A] flex flex-col justify-between">
            <div className="flex items-center justify-between text-ink/70 mb-3">
              <span className="font-body text-xs uppercase font-bold tracking-wider">Waktu Kerja</span>
              <Clock size={18} className="text-accent" />
            </div>
            <div>
              <p className="font-display text-4xl text-ink">128<span className="text-xl">jam</span></p>
              <p className="font-body text-xs text-ink/60 mt-1">Sprint bulan ini</p>
            </div>
          </div>

          <div className="bg-cream border-2 border-ink p-5 shadow-[4px_4px_0px_0px_#0A0A0A] flex flex-col justify-between">
            <div className="flex items-center justify-between text-ink/70 mb-3">
              <span className="font-body text-xs uppercase font-bold tracking-wider">Status SLA</span>
              <Activity size={18} className="text-accent" />
            </div>
            <div>
              <p className="font-display text-4xl text-emerald-600">99.8%</p>
              <p className="font-body text-xs text-ink/60 mt-1">On-time delivery rate</p>
            </div>
          </div>
        </section>

        {/* ── Project Collaboration List (PRD M-04) ──────── */}
        <section className="bg-cream border-2 border-ink shadow-[8px_8px_0px_0px_#0A0A0A]">
          {/* Section Header with Action Button */}
          <div className="p-6 border-b-2 border-ink flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Layers size={18} className="text-accent" />
                <h2 className="font-display text-2xl md:text-3xl text-ink uppercase tracking-tight">
                  Daftar Proyek & Status Kolaborasi
                </h2>
              </div>
              <p className="font-body text-xs md:text-sm text-ink/60 mt-1">
                Lacak status pengerjaan desain, tahap review, serta tenggat waktu kreatif.
              </p>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsNewBriefModalOpen(true)}
              className="flex items-center gap-1.5 self-start sm:self-auto text-xs py-2.5"
            >
              <Plus size={16} />
              <span>Buat Brief Baru</span>
            </Button>
          </div>

          {/* Table / Project Cards List */}
          <div className="divide-y divide-ink/10">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-5 md:p-6 hover:bg-ink/[0.02] transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-accent">
                      {project.id}
                    </span>
                    <span className="text-[11px] font-body uppercase font-bold tracking-wider px-2 py-0.5 bg-ink/10 text-ink">
                      {project.category}
                    </span>
                    <span
                      className={`text-[11px] font-body uppercase font-bold tracking-wider px-2 py-0.5 border ${
                        project.status === 'Completed'
                          ? 'bg-emerald-500/10 text-emerald-800 border-emerald-500/30'
                          : project.status === 'Review'
                          ? 'bg-amber-500/10 text-amber-800 border-amber-500/30'
                          : 'bg-accent/10 text-accent border-accent/30'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <h3 className="font-display text-xl text-ink uppercase tracking-tight">
                    {project.title}
                  </h3>

                  <p className="font-body text-xs text-ink/60">
                    Klien: <strong className="text-ink font-medium">{project.client}</strong> • Target: {project.dueDate}
                  </p>
                </div>

                {/* Progress bar & detail button */}
                <div className="flex items-center gap-6 min-w-[240px]">
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-xs font-body">
                      <span className="text-ink/60">Kemajuan</span>
                      <span className="font-bold text-ink">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-ink/10 h-2 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          project.progress === 100 ? 'bg-emerald-600' : 'bg-accent'
                        }`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <a
                    href="#details"
                    onClick={(e) => e.preventDefault()}
                    className="p-2 border border-ink/20 hover:border-ink hover:bg-ink hover:text-cream transition-colors text-ink"
                    title="Lihat Detail Proyek"
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Studio Guidelines Card ──────────────────────── */}
        <section className="bg-ink text-cream p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 text-neon font-body text-xs uppercase font-bold tracking-widest">
              <Sparkles size={14} /> NESS Creative Standard
            </span>
            <h3 className="font-display text-2xl md:text-3xl text-cream uppercase">
              Butuh Pendampingan Langsung?
            </h3>
            <p className="font-body text-sm text-cream/70 max-w-xl">
              Tim desainer dan art director kami siap mendiskusikan konsep visual dan teknis implementasi proyek Anda melalui private consultation.
            </p>
          </div>

          <a
            href="mailto:contact@ness.design"
            className="px-6 py-3 bg-accent text-cream font-body font-semibold text-sm uppercase tracking-wider hover:brightness-110 transition-all inline-flex items-center gap-2 shrink-0 cursor-pointer"
          >
            Hubungi Tim Desain →
          </a>
        </section>
      </main>

      {/* ── New Brief Modal ─────────────────────────────── */}
      <AnimatePresence>
        {isNewBriefModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-cream border-2 border-ink w-full max-w-lg p-6 md:p-8 shadow-[12px_12px_0px_0px_#0A0A0A]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-ink/15 mb-6">
                <div>
                  <h3 className="font-display text-2xl text-ink uppercase">
                    Buat Creative Brief Baru
                  </h3>
                  <p className="font-body text-xs text-ink/60 mt-0.5">
                    Ajukan proyek baru langsung ke tim kreatif NESS.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsNewBriefModalOpen(false)}
                  className="p-1 text-ink/60 hover:text-ink cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateBrief} className="space-y-4 font-body">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink/80 mb-1.5">
                    Judul Proyek / Brief
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Digital Campaign Q4 2026"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-cream border-2 border-ink text-sm text-ink focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink/80 mb-1.5">
                    Nama Klien / Inisiatif
                  </label>
                  <input
                    type="text"
                    placeholder={displayName}
                    value={newClient}
                    onChange={(e) => setNewClient(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-cream border-2 border-ink text-sm text-ink focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink/80 mb-1.5">
                    Kategori Layanan
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-cream border-2 border-ink text-sm text-ink focus:outline-none focus:border-accent"
                  >
                    <option value="Branding">Branding & Identity</option>
                    <option value="Web Development">Web & Interactive Experience</option>
                    <option value="Art Direction">Art Direction & Visuals</option>
                    <option value="UI/UX Design">UI/UX Design & Product</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-ink/15">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsNewBriefModalOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    Simpan & Ajukan Brief
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="px-6 md:px-12 py-5 text-center text-xs font-body text-ink/50 border-t-2 border-ink bg-cream">
        &copy; {CURRENT_YEAR} NESS Creative Agency • Client Portal Protected Area
      </footer>
    </div>
  );
};

export default MainApp;
