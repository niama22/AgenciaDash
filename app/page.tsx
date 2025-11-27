"use client";

import { useEffect, useState } from "react";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Sidebar from "./components/Sidebar";
import DashboardView from "./components/DashboardView";
import AgenciesView from "./components/AgenciesView";
import ContactsView from "./components/ContactsView";
import AuthScreen from "./components/AuthScreen";

export type Agency = {
  name?: string;
  state?: string;
  state_code?: string;
  type?: string;
  population?: string;
  website?: string;
  county?: string;
};

export type Contact = {
  first_name?: string;
  last_name?: string;
  title?: string;
  email?: string;
  phone?: string;
  department?: string;
  email_type?: string;
};

export const ITEMS_PER_PAGE = 10;
export const DAILY_LIMIT = 50;

export default function Dashboard() {
  const { user } = useUser(); // ✅ Récupérer l'utilisateur Clerk
  
  const [currentView, setCurrentView] = useState<"dashboard" | "agencies" | "contacts">("dashboard");
  const [agenciesCount, setAgenciesCount] = useState(0);
  const [contactsCount, setContactsCount] = useState(0);

  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [agencySearch, setAgencySearch] = useState("");
  const [agencyPage, setAgencyPage] = useState(1);

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactSearch, setContactSearch] = useState("");
  const [contactPage, setContactPage] = useState(1);
  const [limitReached, setLimitReached] = useState(false);
  const [limitCount, setLimitCount] = useState(0);

  useEffect(() => {
    fetch("/data/agencies.csv")
      .then((res) => res.text())
      .then((text) => {
        const lines = text.split('\n');
        const headers = lines[0].split(',');
        const data = lines.slice(1).filter(line => line.trim()).map(line => {
          const values = line.split(',');
          return {
            name: values[0] || "__",
            state: values[1] || "__",
            state_code: values[2] || "__",
            type: values[3] || "__",
            population: values[4] || "__",
            website: values[5] || "__",
            county: values[6] || "__",
          };
        });
        setAgencies(data);
        setAgenciesCount(data.length);
      });
  }, []);

  useEffect(() => {
    if (!user) return; // ✅ Attendre que l'utilisateur soit chargé

    const today = new Date().toDateString();
    const dateKey = `contactsDate-${user.id}`; // ✅ Clé unique par utilisateur
    const countKey = `contactsCount-${user.id}`; // ✅ Clé unique par utilisateur
    
    const storedDate = localStorage.getItem(dateKey);
    const storedCount = Number(localStorage.getItem(countKey)) || 0;

    if (storedDate !== today) {
      localStorage.setItem(dateKey, today);
      localStorage.setItem(countKey, "0");
      setLimitReached(false);
      setLimitCount(0);
    } else {
      setLimitCount(storedCount);
      if (storedCount >= DAILY_LIMIT) {
        setLimitReached(true);
        return;
      }
    }

    fetch("/data/contacts.csv")
      .then((res) => res.text())
      .then((text) => {
        const lines = text.split('\n');
        const data = lines.slice(1).filter(line => line.trim()).map(line => {
          const values = line.split(',');
          return {
            first_name: values[0] || "__",
            last_name: values[1] || "__",
            title: values[2] || "__",
            email: values[3] || "__",
            phone: values[4] || "__",
            department: values[5] || "__",
            email_type: values[6] || "__",
          };
        });

        const remaining = DAILY_LIMIT - storedCount;
        const shuffled = data.sort(() => 0.5 - Math.random());
        const limited = shuffled.slice(0, remaining);

        setContacts(limited);
        setContactsCount(limited.length);

        const newCount = storedCount + limited.length;
        localStorage.setItem(countKey, newCount.toString());
        setLimitCount(newCount);

        if (newCount >= DAILY_LIMIT) {
          setLimitReached(true);
        }
      });
  }, [user]); // ✅ Recharger quand l'utilisateur change

  useEffect(() => { setAgencyPage(1); }, [agencySearch]);
  useEffect(() => { setContactPage(1); }, [contactSearch]);

  return (
    <div style={styles.containerMain}>
      <SignedIn>
        <Sidebar 
          currentView={currentView} 
          setCurrentView={setCurrentView} 
        />
      </SignedIn>

      <main style={styles.mainContent}>
        <SignedOut>
          <AuthScreen />
        </SignedOut>

        <SignedIn>
          {currentView === "dashboard" && (
            <DashboardView 
              agenciesCount={agenciesCount}
              contactsCount={contactsCount}
            />
          )}

          {currentView === "agencies" && (
            <AgenciesView
              agencies={agencies}
              agencySearch={agencySearch}
              setAgencySearch={setAgencySearch}
              agencyPage={agencyPage}
              setAgencyPage={setAgencyPage}
            />
          )}

          {currentView === "contacts" && (
            <ContactsView
              contacts={contacts}
              contactSearch={contactSearch}
              setContactSearch={setContactSearch}
              contactPage={contactPage}
              setContactPage={setContactPage}
              limitReached={limitReached}
              limitCount={limitCount}
              contactsCount={contactsCount}
            />
          )}
        </SignedIn>
      </main>
    </div>
  );
}

const styles = {
  containerMain: { display: "flex", height: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" },
  mainContent: { flex: 1, display: "flex", flexDirection: "column" as const, backgroundColor: "#ecf0f1", overflowY: "auto" as const },
};