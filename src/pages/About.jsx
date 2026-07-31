import React from 'react';
import { ShieldCheck, Database, Layers, Server, CheckCircle2, ArrowLeft, User, Mail, Globe, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="pt-20 pb-5 md:px-5 px-2 h-auto w-screen p-6 max-w-4xl mx-auto">
      {/* Page Header with Back Button */}
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
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">About System</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              System architecture, version details, and owner information
            </p>
          </div>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden p-8 transition-colors space-y-8">
        
        {/* Project Intro Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 shadow-inner">
            <ShieldCheck size={40} />
          </div>
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-wide">
              Pharmacy Management System
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              An enterprise-grade administrative backend built to manage inventory, categories, brands, orders, and automated secure invoicing with high performance and reliability.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              Version 1.0.0-Stable
            </div>
          </div>
        </div>

        {/* Owner / Developer Information Section */}
        <div>
          <h3 className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
            System Owner & Developer
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80 p-4 rounded-xl flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-500">
                <User size={20} />
              </div>
              <div>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">Owner Name</span>
                <p className="text-slate-800 dark:text-slate-200 font-bold text-base">Phorn Sokleap</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80 p-4 rounded-xl flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-500">
                <MapPin size={20} />
              </div>
              <div>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">Location</span>
                <p className="text-slate-800 dark:text-slate-200 font-bold text-base">Cambodia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Grid */}
        <div>
          <h3 className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
            Core Technology Stack
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80 p-4 rounded-xl flex items-start gap-3">
              <Server className="text-blue-500 mt-0.5 shrink-0" size={20} />
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Backend API</h4>
                <p className="text-xs text-slate-500 mt-1">Laravel RESTful API services handling authentication & middleware.</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80 p-4 rounded-xl flex items-start gap-3">
              <Database className="text-blue-500 mt-0.5 shrink-0" size={20} />
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Database</h4>
                <p className="text-xs text-slate-500 mt-1">MongoDB cluster integration for scalable document management.</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80 p-4 rounded-xl flex items-start gap-3">
              <Layers className="text-blue-500 mt-0.5 shrink-0" size={20} />
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Frontend UI</h4>
                <p className="text-xs text-slate-500 mt-1">React, Tailwind CSS, and Lucide Icons with dynamic dark mode.</p>
              </div>
            </div>
          </div>
        </div>

        {/* System Features */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
          <h3 className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
            Key Administrative Capabilities
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
              Role-Based Access Control (Super Admin, Manager, Pharmacist)
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
              Cloudinary Cloud Storage Integration for Admin & Product Assets
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
              Secure Token-Based Authentication & Session Management
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
              Real-time Inventory Tracking and Automated Invoice Handling
            </li>
          </ul>
        </div>

        {/* Footer Notice */}
        <div className="p-4 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/50 rounded-xl text-center">
          <p className="text-xs text-slate-500">
            Authorized personnel only. All system activities and modifications are logged securely.
          </p>
        </div>

      </div>
    </div>
  );
}