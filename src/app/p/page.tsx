"use client";
import { useAuth } from "../../components/AuthProvider";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useState } from "react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    telegram: user?.user_metadata?.telegram || "",
    linkedin: user?.user_metadata?.linkedin || "",
    twitter: user?.user_metadata?.twitter || "",
  });
  const [editing, setEditing] = useState(false);

  if (!user) return <div className="p-8">Not signed in.</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save to Supabase
    setEditing(false);
  };

  return (
    <div className="max-w-lg mx-auto py-12">
      <div className="flex items-center gap-4 mb-8">
        <img
          src={user.user_metadata?.avatar_url || "/default-avatar.png"}
          alt="avatar"
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <div className="text-2xl font-bold">{user.user_metadata?.name || user.email}</div>
          <div className="text-gray-500">@{user.user_metadata?.username || "username"}</div>
          <div className="text-sm mt-1">{user.user_metadata?.user_type || "User"}</div>
        </div>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSave}>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input name="email" value={user.email} readOnly disabled />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Telegram Username</label>
          <Input
            name="telegram"
            value={form.telegram}
            onChange={handleChange}
            placeholder="Telegram Username"
            readOnly={!editing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">LinkedIn Username (optional)</label>
          <Input
            name="linkedin"
            value={form.linkedin}
            onChange={handleChange}
            placeholder="LinkedIn Username"
            readOnly={!editing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Twitter Username (optional)</label>
          <Input
            name="twitter"
            value={form.twitter}
            onChange={handleChange}
            placeholder="Twitter Username"
            readOnly={!editing}
          />
        </div>
        {editing ? (
          <Button type="submit">Save</Button>
        ) : (
          <Button type="button" onClick={() => setEditing(true)}>
            Edit
          </Button>
        )}
      </form>
    </div>
  );
} 