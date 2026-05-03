"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import people from "@/data/people"; // your people array
import { firestore } from "@/firebase/clientApp";
import Link from "next/link";

type Person = {
  id: number;
  name: string;
  seatNumber: number;
  numberOfGuests: number;
  code: string;
  status: string;
};

export default function InvitationsPage() {
  const [message, setMessage] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadMessage();
  }, []);

  async function loadMessage() {
    try {
      const snap = await getDoc(doc(firestore, "settings", "message"));
      if (snap.exists()) {
        setMessage(snap.data().text || "");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function saveMessage() {
    try {
      setSaving(true);

      await setDoc(doc(firestore, "settings", "message"), {
        text: message,
        updatedAt: Date.now(),
      });

      alert("Saved!");
    } catch (error) {
      console.error(error);
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  async function copyInvite(person: Person) {
    const text = `Dear ${person.name},

${message}
Code: ${person.code}

Link: https://jonahanand.vercel.app/
    
We truly hope you can join us in this joyful celebration.

With love,
Jonah & Anand`;

    await navigator.clipboard.writeText(text);

    setCopiedId(person.id);

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  }

  const filtered = people.filter((person) => {
    const q = search.toLowerCase();

    return (
      person.name.toLowerCase().includes(q) ||
      person.status.toLowerCase().includes(q) ||
      person.code.includes(q)
    );
  });

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-1 items-center justify-center px-6 pb-2">
          <Link
            href="https://jonahanand.vercel.app/rsvp"
            className="rounded-xl bg-gray-900 px-5 py-3 text-white transition hover:bg-black"
          >
            {` RSVP Dashboard`}
          </Link>
        </div>
        {/* HEADER */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-black">
            Wedding Invitation Sender
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Save invitation message then copy per guest.
          </p>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium">
              Invitation Message
            </label>

            <textarea
              rows={8}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your invitation message here..."
              className="w-full rounded-xl border text-black p-4 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="mt-4 flex gap-3 md:flex-row flex-col">
            <button
              onClick={saveMessage}
              disabled={saving}
              className="rounded-xl bg-black px-5 py-3 text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Message"}
            </button>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search guest..."
              className="flex-1 rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black text-black"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-black text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Party Size</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Code</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((person, index) => (
                  <tr
                    key={person.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-3 font-medium text-black">
                      {person.name}
                    </td>

                    <td className="px-4 py-3 text-black">
                      {person.numberOfGuests}
                    </td>

                    <td className="px-4 py-3 text-black">{person.status}</td>

                    <td className="px-4 py-3 font-mono text-lg tracking-wider text-black">
                      {person.code}
                    </td>

                    <td className="px-4 py-3">
                      <button
                        onClick={() => copyInvite(person)}
                        className="rounded-lg bg-[#b8860b] px-4 py-2 text-white hover:bg-[#a07000]"
                      >
                        {copiedId === person.id ? "Copied!" : "Copy"}
                      </button>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-gray-500"
                    >
                      No guests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
