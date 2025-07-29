"use client";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";

export default function OnboardPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000" />
      </div>
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">
        <Card variant="elevated" className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Jobler</h1>
          <p className="text-xl text-gray-300 mb-8">Let's get you set up in just a few steps</p>
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="w-full max-w-md bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
          >
            Get Started
          </Button>
        </Card>
      </div>
    </div>
  );
}