"use client";

import React, { useEffect, useMemo, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";
import people from "../../data/people"; // local invited list :contentReference[oaicite:0]{index=0}

/* Firebase Config */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

/* Types */
type RSVPItem = {
  id: string;
  name: string;
  answer: "Yes" | "No" | string;
  guests?: string[]; // firestore includes main guest as first item
  numberOfActualGuests?: number;
  seatNumber?: number;
};

const RSVP = () => {
  const [data, setData] = useState<RSVPItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [tab, setTab] = useState<"all" | "yes" | "no">("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "seat">("name");

  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "rsvp"));

        const results = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as RSVPItem[];

        setData(results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* Dashboard Stats */

  // invitations / households
  const totalInvited = people.length;

  // seats invited including companions
  const totalGuestsInvited = people.reduce(
    (sum, person) => sum + person.numberOfGuests,
    0,
  );

  const accepted = data.filter((x) => x.answer === "Yes").length;
  const declined = data.filter((x) => x.answer === "No").length;

  const guestsComing = data
    .filter((x) => x.answer === "Yes")
    .reduce((sum, person) => sum + (person.numberOfActualGuests ?? 1), 0);

  const filteredData = useMemo(() => {
    let list = [...data];

    if (tab === "yes") list = list.filter((x) => x.answer === "Yes");
    if (tab === "no") list = list.filter((x) => x.answer === "No");

    if (search.trim()) {
      list = list.filter((x) =>
        x.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list.sort((a, b) => (a.seatNumber ?? 9999) - (b.seatNumber ?? 9999));
    }

    return list;
  }, [data, tab, search, sortBy]);

  const toggleRow = (id: string) => {
    setOpenRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-gray-500">
        Loading RSVP...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* Header */}
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
            Wedding Dashboard
          </p>
          <h1 className="text-4xl font-semibold mt-2">RSVP Guests</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <StatCard title="Total Invited" value={totalInvited} />
          <StatCard title="Total # of Guests" value={totalGuestsInvited} />
          <StatCard title="Accepted" value={accepted} accent="green" />
          <StatCard title="Declined" value={declined} accent="red" />
          <StatCard title="Guests Coming" value={guestsComing} accent="blue" />
        </div>

        {/* Controls */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Search guest..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gray-200"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "name" | "seat")}
            className="border border-gray-200 rounded-xl px-4 py-3 bg-white"
          >
            <option value="name">Sort by Name</option>
            <option value="seat">Sort by Seat</option>
          </select>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap">
          <TabButton
            label={`All (${data.length})`}
            active={tab === "all"}
            onClick={() => setTab("all")}
          />
          <TabButton
            label={`Accepted (${accepted})`}
            active={tab === "yes"}
            onClick={() => setTab("yes")}
          />
          <TabButton
            label={`Declined (${declined})`}
            active={tab === "no"}
            onClick={() => setTab("no")}
          />
        </div>

        {/* Table */}
        <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white">
          <table className="w-full">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="text-left p-4">Seat</th>
                <th className="text-left p-4">Guest Name</th>
                <th className="text-left p-4">Response</th>
                <th className="text-left p-4">Party Size</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((guest) => {
                const companionList =
                  guest.guests?.filter(
                    (person) =>
                      person.trim().toLowerCase() !==
                      guest.name.trim().toLowerCase(),
                  ) || [];

                const hasCompanions = companionList.length > 0;
                const isOpen = openRows[guest.id];

                return (
                  <React.Fragment key={guest.id}>
                    {/* Main Row */}
                    <tr
                      onClick={() => hasCompanions && toggleRow(guest.id)}
                      className={`border-t border-gray-100 ${
                        hasCompanions ? "hover:bg-gray-50 cursor-pointer" : ""
                      }`}
                    >
                      <td className="p-4">{guest.seatNumber ?? "-"}</td>

                      <td className="p-4 font-medium">{guest.name}</td>

                      <td className="p-4">
                        {guest.answer === "Yes" ? (
                          <span className="px-3 py-1 rounded-full text-sm bg-green-50 text-green-700">
                            Accepted
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-sm bg-red-50 text-red-700">
                            Declined
                          </span>
                        )}
                      </td>

                      <td className="p-4">{guest.numberOfActualGuests ?? 1}</td>
                    </tr>

                    {/* Expandable Companion Rows */}
                    {hasCompanions && isOpen && (
                      <tr className="bg-gray-100 border-t border-gray-100">
                        <td colSpan={4} className="p-4">
                          <p className="text-sm font-medium text-gray-600 mb-2">
                            {guest.numberOfActualGuests! > 2
                              ? "Companions"
                              : "Companion"}
                          </p>
                          <div className="space-y-2">
                            {companionList.map((person, index) => (
                              <div
                                key={index}
                                className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm"
                              >
                                {person}
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RSVP;

/* Components */

const StatCard = ({
  title,
  value,
  accent = "gray",
}: {
  title: string;
  value: number;
  accent?: "gray" | "green" | "red" | "blue";
}) => {
  const colors = {
    gray: "text-gray-900",
    green: "text-green-700",
    red: "text-red-700",
    blue: "text-blue-700",
  };

  return (
    <div className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className={`text-3xl font-semibold mt-2 ${colors[accent]}`}>
        {value}
      </h2>
    </div>
  );
};

const TabButton = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition ${
      active
        ? "bg-gray-900 text-white border-gray-900"
        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
    }`}
  >
    {label}
  </button>
);
