import React, { useEffect, useState } from 'react';
import { User, Shield, Calendar, Clock, Hash, LogOut, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import authApi from '../service/authApi';
import axiosAdmin from '../service/axiosAdmin';

export default function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        setLoading(true);
        const res = await axiosAdmin.get('/admins/profile');
        const adminData = res.data || res;
        setAdmin(adminData);
      } catch (err) {
        console.error("Failed to fetch admin profile:", err);
        setError("Could not load profile information.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await authApi.logoutAdmin();
    } catch (err) {
      console.error("Server logout failed, clearing local session anyway:", err);
    } finally {
      localStorage.removeItem("token");
      setLoggingOut(false);
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-slate-500 dark:text-slate-400">
        Loading profile...
      </div>
    );
  }

  if (error || !admin) {
    return (
      <div className="p-6 text-red-500 dark:text-red-400 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {error || "Profile data not available."}
      </div>
    );
  }

  return (
    <div className="pt-20 pb-5 md:px-5 px-2 h-auto w-screen p-6 max-w-4xl mx-auto z-0">
      {/* Header with Back Button and Logout */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/dashboard"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Admin Profile</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">View system administrator credentials and details</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50"
        >
          <LogOut size={16} />
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden p-8 transition-colors">
        <div className="flex flex-col md:flex-row items-center gap-8 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div className="relative">
            {admin.admin_pic ? (
              <img
                src={admin.admin_pic}
                alt={admin.username}
                className="w-32 h-32 rounded-full object-cover border-4 border-slate-200 dark:border-slate-800 shadow-md"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-slate-100 dark:bg-slate-800 border-4 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 shadow-md">
                <User size={64} />
              </div>
            )}
          </div>

          <div className="text-center md:text-left space-y-2">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-wide">{admin.username}</h2>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <Shield size={14} />
              {admin.role ? admin.role.replace('_', ' ') : 'Admin'}
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center md:justify-start gap-1 pt-1">
              <Hash size={12} /> ID: {admin.id || admin._id}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
          <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80 p-4 rounded-xl">
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <User size={14} className="text-slate-500 dark:text-slate-400" /> Username
            </span>
            <p className="text-slate-800 dark:text-slate-200 font-medium text-base">{admin.username}</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80 p-4 rounded-xl">
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Shield size={14} className="text-slate-500 dark:text-slate-400" /> Access Role
            </span>
            <p className="text-slate-800 dark:text-slate-200 font-medium text-base capitalize">
              {admin.role ? admin.role.replace('_', ' ') : 'N/A'}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80 p-4 rounded-xl">
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Calendar size={14} className="text-slate-500 dark:text-slate-400" /> Created At
            </span>
            <p className="text-slate-800 dark:text-slate-200 font-medium text-base">
              {admin.created_at ? new Date(admin.created_at).toLocaleString() : 'N/A'}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80 p-4 rounded-xl">
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Clock size={14} className="text-slate-500 dark:text-slate-400" /> Last Updated
            </span>
            <p className="text-slate-800 dark:text-slate-200 font-medium text-base">
              {admin.updated_at ? new Date(admin.updated_at).toLocaleString() : 'N/A'}
            </p>
          </div>
        </div>

        <div className="mt-8 p-4 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/50 rounded-xl text-center">
          <p className="text-xs text-slate-500">
            This account profile is read-only. Credential changes or profile updates are disabled for security compliance.
          </p>
        </div>
      </div>
    </div>
  );
}