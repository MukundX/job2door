"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { supabase } from "../lib/supabase";

export default function HomePage() {
	const [searchText, setSearchText] = useState("");
	const [menuOpen, setMenuOpen] = useState(false);
	const router = useRouter();

	// Close popup when clicking outside
	useEffect(() => {
		if (!menuOpen) return;
		const handleClick = (e: MouseEvent) => {
			const popup = document.getElementById("mobile-menu-popup");
			if (popup && !popup.contains(e.target as Node)) setMenuOpen(false);
		};
		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, [menuOpen]);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchText.trim()) {
			router.push(`/search?keyword=${encodeURIComponent(searchText.trim())}`);
		}
	};

	return (
		<main className="min-h-screen bg-[#FCF7EF] flex flex-col items-center px-4">
			{/* Responsive Navbar */}
			<nav className="w-full flex items-center justify-between py-4 mb-2 max-w-5xl mx-auto">
				{/* Logo */}
				<div className="font-bold text-xl text-gray-900">Job2Door</div>
				{/* Desktop Menu */}
				<div className="hidden md:flex gap-8 text-black font-medium text-sm items-center">
					<a href="#" className="hover:text-black">
						Projects
					</a>
					<a href="#" className="hover:text-black">
						Solutions
					</a>
					<a href="#" className="hover:text-black">
						Pricing
					</a>
					<a href="#" className="hover:text-black">
						Company
					</a>
					<a href="#" className="hover:text-black">
						Support
					</a>
					<button className="ml-4 px-4 py-2 bg-black text-white rounded-lg font-semibold text-xs">
						Try for free
					</button>
					<a
						href="/admin"
						className="ml-2 px-4 py-2 bg-[#FACC15] text-black rounded-lg font-semibold text-xs hover:bg-yellow-400 transition"
					>
						Employee Login
					</a>
				</div>
				{/* Hamburger */}
				<button
					className="md:hidden flex items-center justify-center p-2 rounded hover:bg-gray-200"
					onClick={() => setMenuOpen(!menuOpen)}
					aria-label="Open menu"
				>
					<svg
						width="28"
						height="28"
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
				{/* Mobile Menu Popup */}
				{menuOpen && (
					<div className="fixed inset-0 bg-black/40 z-50 flex justify-end md:hidden">
						<div
							id="mobile-menu-popup"
							className="bg-white w-64 h-full shadow-lg flex flex-col p-6 gap-6"
						>
							<button
								className="self-end text-gray-500 hover:text-black mb-2"
								onClick={() => setMenuOpen(false)}
								aria-label="Close menu"
							>
								✕
							</button>
							<a
								href="https://www.instagram.com/themukund07/"
								className="hover:text-black text-black"
							>
								Developer
							</a>
							
							<a
								href="/dashboard"
								className="mt-4 px-4 py-2 bg-black text-white rounded-lg font-semibold text-xs"
							>
							
						
								Try for free
							</a>
							<a
								href="/admin"
								className="mt-2 px-4 py-2 bg-[#FACC15] text-black rounded-lg font-semibold text-xs hover:bg-yellow-400 transition"
							>
								Employee Login
							</a>
						</div>
					</div>
				)}
			</nav>
			{/* Hero Section */}
			<section className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center py-10">
				{/* User avatars */}
				<div className="flex items-center gap-2 mb-2">
					<img
						src="https://mighty.tools/mockmind-api/content/human/126.jpg"
						alt="User"
						className="w-8 h-8 rounded-full border-2 border-white"
					/>
					<img
						src="https://mighty.tools/mockmind-api/content/human/128.jpg"
						alt="User"
						className="w-8 h-8 rounded-full border-2 border-white"
					/>
					<img
						src="https://mighty.tools/mockmind-api/content/human/122.jpg"
						alt="User"
						className="w-8 h-8 rounded-full border-2 border-white"
					/>
					<span className="text-gray-600 text-sm ml-2">
						Over 1k happy users
					</span>
				</div>
				{/* Headline */}
				<h1 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-4">
					World&apos;s JOB
					
					Map
				</h1>
				{/* Subheadline */}
				<p className="text-gray-700 text-center mb-6 max-w-lg">
					Just Open Source Job search Engine.
				</p>
				{/* Buttons */}
				<div className="flex flex-col md:flex-row gap-4 mb-6 w-full md:w-auto items-center md:items-start">
					<a
						href="/dashboard"
						className="px-6 py-3 rounded-lg bg-black text-white font-semibold shadow hover:bg-gray-800 transition w-full md:w-auto text-center"
					>
						Dashboard <span className="ml-2">⚡</span>
					</a>
					
				</div>
				{/* Search Bar */}
				<form
					className="w-full flex flex-col md:flex-row items-center justify-center gap-2 mb-4"
					onSubmit={handleSearch}
				>
					<input
						type="text"
						placeholder="Search job by title, company name, or skill"
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none border border-gray-300 shadow"
					/>
					<button
						type="submit"
						className="px-6 py-3 rounded-lg bg-black text-white font-semibold shadow hover:bg-gray-800 transition"
					>
						Search
					</button>
				</form>
				{/* Suggested Job Search */}
				<div className="w-full max-w-lg mx-auto mb-10">
					<h3 className="font-semibold text-lg text-gray-900 mb-3">
						Suggested Searches
					</h3>
					<div className="flex flex-col items-center gap-2">
						<div className="grid grid-cols-3 gap-3 w-full">
							{[
								"Frontend Developer",
								"UX Designer",
								"Data Scientist",
							].map((job) => (
								<a
									key={job}
									href={`/search?keyword=${encodeURIComponent(job)}`}
									className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium shadow hover:bg-black hover:text-white transition text-center"
								>
									{job}
								</a>
							))}
						</div>
						<div className="flex justify-center gap-3 w-full mt-2">
							{["Product Manager", "iOS Developer"].map((job) => (
								<a
									key={job}
									href={`/search?keyword=${encodeURIComponent(job)}`}
									className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium shadow hover:bg-black hover:text-white transition text-center"
								>
									{job}
								</a>
							))}
						</div>
					</div>
				</div>
				{/* Cards Section */}
				<div className="relative flex items-end justify-center w-full max-w-2xl mx-auto h-80 mt-2">
					{/* Left Card */}
					<div className="absolute left-0 bottom-0 w-32 h-44 md:w-64 md:h-80 bg-blue-100 rounded-3xl shadow-lg flex items-center justify-center rotate-[12deg] z-10">
						<img
							src="/card1.png"
							alt="Card 1"
							className="w-20 h-20 md:w-48 md:h-48 object-contain"
						/>
					</div>
					{/* Center Card */}
					<div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-32 h-44 md:w-64 md:h-80 bg-pink-100 rounded-3xl shadow-lg flex items-center justify-center z-20">
						<img
							src="/card2.png"
							alt="Card 2"
							className="w-20 h-20 md:w-48 md:h-48 object-contain"
						/>
					</div>
					{/* Right Card */}
					<div className="absolute right-0 bottom-0 w-32 h-44 md:w-64 md:h-80 bg-orange-100 rounded-3xl shadow-lg flex items-center justify-center -rotate-[12deg] z-10">
						<img
							src="/card3.png"
							alt="Card 3"
							className="w-20 h-20 md:w-48 md:h-48 object-contain"
						/>
					</div>
				</div>
				{/* Team Member Cards - horizontal scroll, centered, thin scrollbar */}
				<div className="w-full flex justify-center my-8">
					<div className="flex items-center gap-6 px-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
						style={{ maxWidth: '100vw' }}>
						{[
							{ name: "Mukund Kumar", role: "Developer", img: "https://framerusercontent.com/images/vo54Z401TTUJFxdv9KTtYTtBYg.jpg", linkedin: "https://www.linkedin.com/in/balmukundkumar/", instagram: "instagram.com/themukund07/" }
							
							// Add more team members if needed
						].map((member) => (
							<div
								key={member.name}
								className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center w-32 transition hover:scale-105 hover:shadow-2xl duration-200 cursor-pointer"
							>
								<img
									src={member.img}
									alt={member.name}
									className="w-12 h-12 rounded-full border-2 border-gray-300 mb-2"
								/>
								<div className="font-semibold text-gray-900">{member.name}</div>
								<div className="text-xs text-gray-500 mb-2">{member.role}</div>
								<a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="mt-1">
									<svg width="20" height="20" fill="currentColor" className="text-blue-600 hover:text-blue-800 transition" viewBox="0 0 24 24">
										<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.867-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.601 2.001 3.601 4.601v5.595z"/>
									</svg>
								</a>
								
								<a href={member.instagram} target="_blank" rel="noopener noreferrer" className="mt-1">
                  <svg width="20" height="20" fill="currentColor" className="text-pink-500 hover:text-pink-700 transition" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.337 3.608 1.312.975.975 1.25 2.242 1.312 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.337 2.633-1.312 3.608-.975.975-2.242 1.25-3.608 1.312-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.337-3.608-1.312-.975-.975-1.25-2.242-1.312-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.337-2.633 1.312-3.608.975-.975 2.242-1.25 3.608-1.312 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.012-4.947.071-1.601.074-3.034.473-4.165 1.604s-1.53 2.564-1.604 4.165c-.059 1.28-.071 1.688-.071 4.947s.012 3.667.071 4.947c.074 1.601.473 3.034 1.604 4.165s2.564 1.53 4.165 1.604c1.28.059 1.688.071 4.947.071s3.667-.012 4.947-.071c1.601-.074 3.034-.473 4.165-1.604s1.53-2.564 1.604-4.165c.059-1.28.071-1.688.071-4.947s-.012-3.667-.071-4.947c-.074-1.601-.473-3.034-1.604-4.165s-2.564-1.53-4.165-1.604c-1.28-.059-1.688-.071-4.947-.071zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.208 0-4-1.792-4-4s1.792-4 4-4 4 1.792 4 4-1.792 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.441s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.441-1.441-1.441z"/>
                  </svg>
                </a>

							</div>
						))}
					</div>
				</div>
				{/* Mobile Screens Section */}
				<div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-10 w-full">
					{/* Mobile 1 */}
					<div className="bg-white border-4 border-black rounded-[2rem] w-56 h-[400px] flex flex-col items-center justify-center overflow-hidden shadow-lg">
						<img
							src="https://placehold.co/375x812?text=job2door-1&font=roboto&size=32"
							alt="Mobile 1"
							className="w-full h-full object-cover"
						/>
					</div>
					{/* Mobile 2 */}
					<div className="bg-white border-4 border-black rounded-[2rem] w-56 h-[400px] flex flex-col items-center justify-center overflow-hidden shadow-lg">
						<img
							src="https://play-lh.googleusercontent.com/8H4Muv90Apcq2AKMNRda7eTeXyrabaZ5HPEHAz4nyGovxmsllEr1Ly7B1IniIwx5jFA=w5120-h2880-rw"
							alt="mobile 2"
							className="w-full h-full object-cover"
						/>
					</div>
					{/* Mobile 3 */}
					<div className="bg-white border-4 border-black rounded-[2rem] w-56 h-[400px] flex flex-col items-center justify-center overflow-hidden shadow-lg">
						<img
							src="https://placehold.co/375x812?text=job2door-3&font=roboto&size=32"
							alt="Mobile 3"
							className="w-full h-full object-cover"
						/>
					</div>
				</div>
				{/* Call to Action Banner */}
				<div className="w-full bg-black text-white py-8 mt-16 flex flex-col items-center justify-center rounded-xl shadow-lg">
					<h2 className="text-2xl font-bold mb-2">
						The World Is Hiring — Start Exploring
					</h2>
					<p className="mb-4 text-center text-gray-200">
						Explore open-source job listings with deep search, real-time updates—wherever opportunity lives.
					</p>
					<a
						href="/get-started"
						className="px-6 py-3 bg-white text-black rounded-lg font-semibold shadow hover:bg-gray-100 transition"
					>
						Get Started
					</a>
				</div>
				{/* Footer */}
				<footer className="w-full py-6 mt-8 text-center text-gray-500 text-sm">
					&copy; {new Date().getFullYear()} Job2Door. All rights reserved.
				</footer>
			</section>
		</main>
	);
}
