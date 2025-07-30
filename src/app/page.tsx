"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Example company data (replace logo/img URLs with your assets)
const companies = [
	{
		name: "Spotify",
		logo: "/spotify-logo.png",
		img: "/spotify-bg.jpg",
		offers: 2,
	},
	{
		name: "Netflix",
		logo: "/netflix-logo.png",
		img: "/netflix-bg.jpg",
		offers: 2,
	},
	{
		name: "Figma",
		logo: "/figma-logo.png",
		img: "/figma-bg.jpg",
		offers: 2,
	},
	{
		name: "PayPal",
		logo: "/paypal-logo.png",
		img: "/paypal-bg.jpg",
		offers: 2,
	},
	{
		name: "Airbnb",
		logo: "/airbnb-logo.png",
		img: "/airbnb-bg.jpg",
		offers: 2,
	},
];

// Example job cards for the loop (replace with your data)
const jobCards = [
	{
		title: "Product Manager",
		company: "Microsoft",
		location: "WA, USA",
		type: "Full Time",
		salary: "$6,500–10,000/Month",
		description:
			"Work With Teams To Build And Launch Microsoft 365 Features. Hybrid Work Available.",
		logo: "/microsoft-logo.png",
	},
	{
		title: "UI/UX Designer",
		company: "PixelCraft",
		location: "Remote",
		type: "Contract",
		salary: "$4,000–7,000/Month",
		description: "Design beautiful interfaces for global clients.",
		logo: "/pixelcraft-logo.png",
	},
	{
		title: "Data Scientist",
		company: "Google",
		location: "CA, USA",
		type: "Full Time",
		salary: "$8,000–12,000/Month",
		description: "Analyze data and build predictive models.",
		logo: "/google-logo.png",
	},
	// Add more job cards as needed
];

// const featuredCards = [
// 	{
// 		id: 1,
// 		image: "/card1.png", // Replace with your card image or JSX
// 		style: "rotate-[-15deg] -translate-x-16 z-10",
// 	},
// 	{
// 		id: 2,
// 		image: "/card2.png",
// 		style: "rotate-[-7deg] -translate-x-8 z-20",
// 	},
// 	{
// 		id: 3,
// 		image: "/card3.png", // Center card
// 		style: "rotate-0 z-30",
// 	},
// 	{
// 		id: 4,
// 		image: "/card4.png",
// 		style: "rotate-[7deg] translate-x-8 z-20",
// 	},
// 	{
// 		id: 5,
// 		image: "/card5.png",
// 		style: "rotate-[15deg] translate-x-16 z-10",
// 	},
// ];

const concentricCards = [
	{
		id: 1,
		image: "/card1.png", // left-most card
		style: "rotate-[-18deg] -translate-x-40 z-10",
	},
	{
		id: 2,
		image: "/card2.png", // left card
		style: "rotate-[-9deg] -translate-x-20 z-20",
	},
	{
		id: 3,
		image: "/card3.png", // center card
		style: "rotate-0 z-30",
	},
	{
		id: 4,
		image: "/card4.png", // right card
		style: "rotate-[9deg] translate-x-20 z-20",
	},
	{
		id: 5,
		image: "/card5.png", // right-most card
		style: "rotate-[18deg] translate-x-40 z-10",
	},
];

export default function HomePage() {
	const [searchText, setSearchText] = useState("");
	const router = useRouter();

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchText.trim()) {
			router.push(`/search?keyword=${encodeURIComponent(searchText.trim())}`);
		}
	};

	return (
		<main className="min-h-screen bg-white flex flex-col">
			{/* Hero Section */}
			<section className="flex flex-col items-center justify-center py-16 px-4 bg-white">
				<h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 text-center">
					Your Next Job Is Just{" "}
					<span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
						One Click
					</span>{" "}
					Away
				</h1>
				<p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
					Find opportunities that match your passion, not just your resume. Let's
					build the career you deserve — starting today.
				</p>
				{/* Search Bar */}
				<form
					className="flex flex-col md:flex-row items-center justify-center w-full max-w-2xl mx-auto mb-8 gap-2"
					onSubmit={handleSearch}
				>
					<input
						type="text"
						placeholder="Job Title or Keyword"
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						className="flex-1 px-4 py-3 rounded-full bg-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none border border-gray-300"
					/>
					<button
						type="submit"
						className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold"
					>
						Search
					</button>
				</form>
				{/* Trusted by */}
				<div className="flex items-center justify-center mb-8">
					<div className="flex -space-x-4">
					 {[1, 2, 3, 4, 5].map((i) => (
							<div
								key={i}
								className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 border-2 border-white"
							></div>
						))}
					</div>
					<span className="ml-4 text-gray-500 font-medium">
						Trusted by 100,000+ People
					</span>
				</div>

				{/* Concentric Angled Cards */}
				<div className="relative flex items-center justify-center h-72 md:h-80 mb-12 w-full">
					{concentricCards.map((card) => (
						<div
							key={card.id}
							className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ${card.style} transition-all duration-500`}
							style={{ width: "320px", height: "220px" }}
						>
							<img
								src={card.image}
								alt={`Card ${card.id}`}
								className="w-full h-full object-cover rounded-2xl shadow-2xl border border-gray-200 bg-white"
							/>
						</div>
					))}
				</div>
			</section>

			{/* Job Cards Loop Section */}
			<section className="w-full flex flex-col items-center justify-center py-4 px-4">
				<div className="flex flex-wrap md:flex-nowrap gap-6 justify-center items-stretch w-full max-w-5xl mx-auto overflow-x-auto pb-4">
					{jobCards.map((job, idx) => (
						<div
							key={idx}
							className="min-w-[280px] max-w-xs w-full bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between"
						>
							<div className="flex items-center mb-4">
								<img
									src={job.logo}
									alt={job.company}
									className="w-10 h-10 rounded-full mr-3"
								/>
								<div>
									<div className="font-semibold text-gray-900">
										{job.company}
									</div>
									<div className="text-xs text-gray-500">
										{job.location}
									</div>
								</div>
							</div>
							<div className="font-bold text-lg text-gray-900 mb-2">
								{job.title}
							</div>
							<div className="text-sm text-gray-600 mb-2">
								{job.type} • {job.salary}
							</div>
							<div className="text-xs text-gray-500 mb-4">
								{job.description}
							</div>
							<button className="mt-auto px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm">
								View Job
							</button>
						</div>
					))}
				</div>
			</section>

			{/* Company Cards - horizontal scroll on mobile */}
			<section className="w-full flex flex-col items-center justify-center py-4 px-4">
				<div className="w-full max-w-5xl mx-auto">
					<div className="flex gap-4 overflow-x-auto pb-4">
						{companies.map((company) => (
							<div
								key={company.name}
								className="flex flex-col items-center min-w-[100px] max-w-[120px] w-full"
							>
								<div
									className="w-20 h-14 rounded-xl overflow-hidden flex items-end justify-center relative shadow-md"
									style={{
										background: `url(${company.img}) center/cover no-repeat`,
									}}
								>
									<div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow border-2 border-white">
										<img
											src={company.logo}
											alt={company.name}
											className="w-6 h-6 object-contain"
										/>
									</div>
								</div>
								<div className="mt-3 text-center">
									<div className="font-semibold text-gray-900 text-sm">
										{company.name}
									</div>
									<div className="text-gray-500 text-xs">
										{company.offers} jobs
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Explore Careers Section */}
			<section className="w-full flex flex-col items-center justify-center py-12 px-4 bg-white">
				<h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
					Explore Careers Across Every Field
				</h2>
				<p className="text-gray-600 text-center mb-8 max-w-2xl">
					Discover a wide range of careers across every industry — from design and
					tech to healthcare and finance. Find roles that match your skills and
					passion, and take the next step toward your dream job.
				</p>
				{/* Example career tags */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl mx-auto">
					<div className="bg-blue-50 rounded-xl p-4 text-center">
						<div className="font-semibold text-blue-700 mb-1">
							Marketing & Communication
						</div>
						<div className="text-xs text-blue-500">68 Jobs Available</div>
					</div>
					<div className="bg-orange-50 rounded-xl p-4 text-center">
						<div className="font-semibold text-orange-700 mb-1">
							Design & Development
						</div>
						<div className="text-xs text-orange-500">98 Jobs Available</div>
					</div>
					<div className="bg-purple-50 rounded-xl p-4 text-center">
						<div className="font-semibold text-purple-700 mb-1">
							Human Research & Development
						</div>
						<div className="text-xs text-purple-500">51 Jobs Available</div>
					</div>
					<div className="bg-green-50 rounded-xl p-4 text-center">
						<div className="font-semibold text-green-700 mb-1">
							Finance Management
						</div>
						<div className="text-xs text-green-500">45 Jobs Available</div>
					</div>
					{/* Add more tags as needed */}
				</div>
			</section>

			{/* Footer */}
			<footer className="w-full bg-gray-100 mt-10 py-8 px-4 rounded-t-3xl">
				<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-600">
					<div>
						<span className="font-bold text-purple-500 text-xl mb-2 block">
							Jobler Inc.
						</span>
						<span className="block text-sm">
							Storkower Strasse 41
							<br />
							Rheinland-Pfalz, 56379, Germany
							<br />
							<a
								href="mailto:mail@jobler.com"
								className="text-purple-500 hover:underline"
							>
								{" "}
								mail@jobler.com
							</a>
						</span>
						<div className="flex gap-3 mt-4">
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
				<div className="text-center text-xs text-gray-400 mt-8">
					© 2025 All rights reserved
				</div>
			</footer>
		</main>
	);
}