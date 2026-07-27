import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';
import ProtectedNavbar from '../components/ProtectedNavbar';
import { AuthContext } from '../context/AuthContext';

const interviewTypes = [
  { value: 'technical', label: 'Technical' },
  { value: 'hr', label: 'HR' },
];

const experienceLevels = [
  { value: 'entry', label: 'Entry' },
  { value: 'mid', label: 'Mid' },
  { value: 'senior', label: 'Senior' },
];

const initialForm = {
  type: 'technical',
  experienceLevel: 'mid',
  role: '',
  questionCount: 5,
};

function StartInterviewPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const validateForm = () => {
    const nextErrors = {};

    if (!form.role.trim()) {
      nextErrors.role = 'Job role is required.';
    }

    if (!Number.isInteger(form.questionCount) || form.questionCount < 1 || form.questionCount > 20) {
      nextErrors.questionCount = 'Number of questions must be between 1 and 20.';
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: name === 'questionCount' ? Number(value) : value,
    }));
    setFieldErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!validateForm()) {
      toast.error('Please fix the form errors before continuing.');
      return;
    }
    setLoading(true);

    try {
      toast.loading('Generating interview questions...', { id: 'start-interview' });
      const response = await api.post('/interviews', form);
      toast.success('Interview created successfully', { id: 'start-interview' });
      navigate(`/interviews/${response.data.interview._id}`, {
        state: { interview: response.data.interview },
      });
    } catch (submitError) {
      const message = submitError.response?.data?.message || 'Unable to start interview right now.';
      setError(message);
      toast.error(message, { id: 'start-interview' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen text-slate-900">
        <ProtectedNavbar />
        <div className="flex min-h-[70vh] items-center justify-center text-slate-600">
          <div className="rounded-full border border-slate-200 bg-white px-5 py-3 shadow-sm">
            Generating questions...
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen text-slate-900">
      <ProtectedNavbar />
      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
        <div className="rounded-[2rem] border border-white/80 bg-white/85 p-8 shadow-xl backdrop-blur">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-700">
              Start Interview
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Configure your next practice session.
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              We’ll generate tailored questions with Gemini and keep the session moving one question at a time.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 grid gap-6 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Interview Type</span>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-brand-400"
              >
                {interviewTypes.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Experience Level</span>
              <select
                name="experienceLevel"
                value={form.experienceLevel}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-brand-400"
              >
                {experienceLevels.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-medium text-slate-700">Job Role</span>
              <input
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="Frontend Developer, Product Manager, Data Analyst..."
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-brand-400"
              />
              {fieldErrors.role ? <p className="text-sm text-red-600">{fieldErrors.role}</p> : null}
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Number of Questions</span>
              <input
                type="number"
                name="questionCount"
                min="1"
                max="20"
                value={form.questionCount}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-brand-400"
              />
              {fieldErrors.questionCount ? (
                <p className="text-sm text-red-600">{fieldErrors.questionCount}</p>
              ) : null}
            </label>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Generating...' : 'Generate Questions'}
              </button>
            </div>
          </form>

          {error ? (
            <p className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <div className="mt-8 rounded-3xl bg-brand-50 p-6 text-sm leading-7 text-slate-700">
            Logged in as <span className="font-semibold text-ink">{user?.email || 'candidate'}</span>.
            After generation, you’ll be taken directly into the interview session.
          </div>
        </div>
      </section>
    </main>
  );
}

export default StartInterviewPage;
