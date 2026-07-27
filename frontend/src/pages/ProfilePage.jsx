import { useContext } from 'react';
import ProtectedNavbar from '../components/ProtectedNavbar';
import { AuthContext } from '../context/AuthContext';

function ProfilePage() {
  const { user } = useContext(AuthContext);

  return (
    <main className="min-h-screen text-slate-900">
      <ProtectedNavbar />
      <section className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <div className="rounded-[2rem] border border-white/80 bg-white/85 p-8 shadow-xl backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-700">Profile</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">Account details</h1>
          <div className="mt-8 grid gap-4 rounded-[1.5rem] bg-slate-50 p-6 text-sm text-slate-700">
            <div>
              <span className="font-semibold text-ink">Name: </span>
              {user?.name || 'N/A'}
            </div>
            <div>
              <span className="font-semibold text-ink">Email: </span>
              {user?.email || 'N/A'}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;
