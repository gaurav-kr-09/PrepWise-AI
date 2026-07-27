import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(form.email, form.password);
      const redirectTo = location.state?.from?.pathname || '/dashboard';
      navigate(redirectTo, { replace: true });
    } catch (submitError) {
      setError(submitError.response?.data?.message || 'Unable to log in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen text-slate-900">
      <section className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-12 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-950/20">
            <p className="text-sm uppercase tracking-[0.25em] text-brand-200">PrepWise AI</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Welcome back.
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Continue your mock interview practice and review Gemini-powered scoring from previous sessions.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/80 bg-white/85 p-8 shadow-xl backdrop-blur">
            <h2 className="text-3xl font-semibold tracking-tight text-ink">Log in</h2>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-700">Email</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-brand-400"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-700">Password</span>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-brand-400"
                />
              </label>
              {error ? (
                <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
              ) : null}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>
            <p className="mt-6 text-sm text-slate-600">
              New here?{' '}
              <Link to="/register" className="font-semibold text-brand-700 hover:text-brand-800">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
