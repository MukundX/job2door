"use client";
import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col">
      {/* Header */}
      <header className="w-full bg-white/10 rounded-b-3xl shadow-lg px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold text-purple-400">Jobler</span>
        </div>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden ml-auto text-white"
          onClick={() => setNavOpen(!navOpen)}
        >
          <svg width="32" height="32" fill="none" stroke="currentColor"><path d="M6 10h20M6 16h20M6 22h20" strokeWidth="2" /></svg>
        </button>
        {/* Nav links */}
        <nav className={`flex-col md:flex-row md:flex gap-8 mt-4 md:mt-0 ${navOpen ? "flex" : "hidden"} md:!flex bg-slate-900 md:bg-transparent absolute md:static top-20 left-0 w-full md:w-auto z-20`}>
          <Link href="/jobs" className="text-white/80 hover:text-pink-400 font-medium px-4 py-2">Find Jobs</Link>
          <Link href="/team" className="text-white/80 hover:text-pink-400 font-medium px-4 py-2">Our Team</Link>
          <Link href="/blog" className="text-white/80 hover:text-pink-400 font-medium px-4 py-2">Blog</Link>
          <Link href="/contact" className="text-white/80 hover:text-pink-400 font-medium px-4 py-2">Contact</Link>
        </nav>
        <Link href="/purchase" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl font-semibold ml-0 md:ml-8 mt-4 md:mt-0">Purchase</Link>
      </header>

      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center py-16 px-4">
        <div className="max-w-2xl w-full text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Find jobs in New York</h1>
          <p className="text-lg text-white/80 mb-6">
            When you're searching for a job, there are a few things you can do to get the most out of your search
          </p>
        </div>
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {/* Example avatars */}
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 border-4 border-white"></div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Job title or keyword"
            className="flex-1 px-4 py-3 rounded-t-full md:rounded-l-full md:rounded-t-none bg-white/80 text-slate-900 placeholder-slate-500 focus:outline-none w-full md:w-auto"
          />
          <button
            className="px-6 py-3 rounded-b-full md:rounded-r-full md:rounded-b-none bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold w-full md:w-auto"
          >
            Search
          </button>
        </div>
        <div className="mt-2 text-white/60 text-sm">Search for 148+ open job positions across the world</div>
      </section>

      {/* Trusted Companies */}
      <section className="w-full flex justify-center py-6">
        <div className="flex gap-10 items-center opacity-80">
          {["Microsoft", "IBM", "Amazon", "eBay", "Dropbox"].map(name => (
            <span key={name} className="text-lg font-semibold">{name}</span>
          ))}
        </div>
      </section>

      {/* Trending Jobs */}
      <section className="w-full max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 text-white">Trending jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Example job cards */}
          <div className="bg-white/10 rounded-xl p-6 shadow flex flex-col">
            <span className="text-xl font-semibold mb-2 text-pink-300">Crisis Intervention Specialist</span>
            <span className="text-white/70 mb-1">London · Remote</span>
            <span className="text-white/60 text-sm">₹117,300 Avg. salary</span>
          </div>
          <div className="bg-white/10 rounded-xl p-6 shadow flex flex-col">
            <span className="text-xl font-semibold mb-2 text-purple-300">Virtual Scheduler - Remote</span>
            <span className="text-white/70 mb-1">New York · Full-Time</span>
            <span className="text-white/60 text-sm">₹150,000 Avg. salary</span>
          </div>
          <div className="bg-white/10 rounded-xl p-6 shadow flex flex-col">
            <span className="text-xl font-semibold mb-2 text-purple-300">Patient Care Advocate</span>
            <span className="text-white/70 mb-1">Washington · Full-Time</span>
            <span className="text-white/60 text-sm">₹195,700 Avg. salary</span>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Link href="/jobs" className="text-pink-400 font-semibold hover:underline">See all jobs</Link>
        </div>
      </section>

      {/* Suggested Searches & Tags */}
      <section className="w-full max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/10 rounded-xl p-8 shadow flex flex-col justify-center">
          <h3 className="text-xl font-bold mb-4 text-white">Explore suggested job searches</h3>
          <p className="text-white/80 mb-4">
            Along with conventional advertising and below the line activities, organizations and corporate bodies have come to realize that they need to invest.
          </p>
          <div className="flex gap-2">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold">Recommended jobs</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-8 shadow flex flex-wrap gap-3 items-center justify-center">
          {[
            "Co-founder", "Project Manager", "Sales", "Developer", "Personal Assistant", "Board member",
            "HR Assistant", "Entrepreneur in residence", "Designer", "Managing Director", "Founding Partner",
            "Coach", "Financial Advisor", "Customers Operator", "Data analyst", "Dispatcher"
          ].map(tag => (
            <span key={tag} className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold">{tag}</span>
          ))}
        </div>
      </section>

      {/* Team Members */}
      <section className="w-full max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 text-white">Team members</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Example team cards */}
          <div className="bg-white/10 rounded-xl p-6 shadow flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 mb-3"></div>
            <span className="font-semibold text-white">Tamas Bunce</span>
            <span className="text-white/70 text-sm">London · Construction Manager</span>
          </div>
          <div className="bg-white/10 rounded-xl p-6 shadow flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 mb-3"></div>
            <span className="font-semibold text-white">Benedikt Safiyulin</span>
            <span className="text-white/70 text-sm">New York · Fitness Trainer</span>
          </div>
          <div className="bg-white/10 rounded-xl p-6 shadow flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 mb-3"></div>
            <span className="font-semibold text-white">Luis Calvillo</span>
            <span className="text-white/70 text-sm">London · Teacher Assistant</span>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="w-full max-w-3xl mx-auto px-4 py-10">
        <blockquote className="bg-white/10 rounded-xl p-8 shadow text-center text-white text-lg font-semibold mb-6">
          Our platform is so easy to use. We’ve hired about 40-50 different people worldwide in the past two years.
        </blockquote>
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600"></div>
          <span className="ml-4 text-white/80">Lubosek Hnilo<br /><span className="text-sm">Founder at Apple Inc.</span></span>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full max-w-5xl mx-auto px-4 py-10">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 shadow flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Ready for your next hire?</h3>
            <p className="text-white/80">Along with conventional advertising and below the line activities, organizations and corporate bodies have come to realize that they need to invest.</p>
          </div>
          <Link href="/apply" className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-xl mt-6 md:mt-0">Apply and Start Today</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-white/10 mt-10 py-8 px-4 rounded-t-3xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-white/80">
          <div>
            <span className="font-bold text-purple-400 text-xl mb-2 block">Jobler Inc.</span>
            <span className="block text-sm">Storkower Strasse 41<br />Rheinland-Pfalz, 56379, Germany<br />mail@jobler.com</span>
            <div className="flex gap-3 mt-4">
              {/* Social icons placeholder */}
              <span className="w-6 h-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full"></span>
              <span className="w-6 h-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full"></span>
              <span className="w-6 h-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full"></span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Landing Pages</h4>
            <ul className="space-y-1 text-sm">
              <li>Landing Page</li>
              <li>Landing Page Corporate</li>
              <li>Landing Page Minimal</li>
              <li>Coming Soon</li>
              <li>404</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">About Pages</h4>
            <ul className="space-y-1 text-sm">
              <li>About Us</li>
              <li>Our Team</li>
              <li>User Profile Modern</li>
              <li>User Profile Centered</li>
              <li>Contact Us</li>
              <li>All Components</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Job Search</h4>
            <ul className="space-y-1 text-sm">
              <li>Job List</li>
              <li>Job List Corporate</li>
              <li>Job List Minimal</li>
              <li>Job Overview</li>
              <li>Job Overview Centered</li>
              <li>Job Overview Minimal</li>
              <li>Apply for a job</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-white/40 mt-8">© 2025 All rights reserved</div>
      </footer>
    </main>
  );
}
