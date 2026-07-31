import { ArrowUpRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Contact() {
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
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Contact & Support
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Get in touch with the system developer and owner
            </p>
          </div>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden p-8 transition-colors space-y-8">
        {/* Intro Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 shadow-inner">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-wide">
              Phorn Sokleap
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Full-stack developer and system administrator. Feel free to reach
              out via email, phone, or professional networks for inquiries,
              collaboration, or support.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              Available for Collaboration
            </div>
          </div>
        </div>

        {/* Contact Links Grid */}
        <div>
          <h3 className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
            Direct Channels
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <a
              href="mailto:phsokleap2929@gmail.com"
              className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80 p-4 rounded-xl flex items-center gap-4 hover:border-blue-500/50 transition-all group"
            >
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
                <svg
                  className="w-5.5 h-5.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">
                  Email Address
                </span>
                <p className="text-slate-800 dark:text-slate-200 font-bold text-sm sm:text-base">
                  phsokleap2929@gmail.com
                </p>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+855972843289"
              className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80 p-4 rounded-xl flex items-center gap-4 hover:border-blue-500/50 transition-all group"
            >
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
                <svg
                  className="w-5.5 h-5.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">
                  Phone Number
                </span>
                <p className="text-slate-800 dark:text-slate-200 font-bold text-sm sm:text-base">
                  +855 97 28 43 289
                </p>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/sokleap-phorn/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80 p-4 rounded-xl flex items-center gap-4 hover:border-blue-500/50 transition-all group"
            >
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
                <svg
                  className="w-5.5 h-5.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </div>
              <div>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">
                  LinkedIn Profile
                </span>
                <p className="text-slate-800 dark:text-slate-200 font-bold text-sm truncate max-w-55">
                  sokleap-phorn
                </p>
              </div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/sokleapphorn2929"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80 p-4 rounded-xl flex items-center gap-4 hover:border-blue-500/50 transition-all group"
            >
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
                <svg
                  className="w-5.5 h-5.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <div>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">
                  GitHub Repository
                </span>
                <p className="text-slate-800 dark:text-slate-200 font-bold text-sm truncate max-w-55">
                  sokleapphorn2929
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Portfolio Section */}
        <div>
          <h3 className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
            Portfolio Website
          </h3>
          <a
            href="https://phornsokleap-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80 p-4 rounded-xl flex items-center justify-between hover:border-blue-500/50 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
                <svg
                  className="w-5.5 h-5.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <div>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">
                  Personal Portfolio
                </span>
                <p className="text-slate-800 dark:text-slate-200 font-bold text-sm sm:text-base">
                  phornsokleap-portfolio.vercel.app
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600 text-white group-hover:bg-blue-700 transition-colors">
              <ArrowUpRight />
            </span>
          </a>
        </div>

        {/* Footer Notice */}
        <div className="p-4 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/50 rounded-xl text-center">
          <p className="text-xs text-slate-500">
            Response time is usually within 24 hours. For urgent system issues,
            please reach out via phone or email directly.
          </p>
        </div>
      </div>
    </div>
  );
}
