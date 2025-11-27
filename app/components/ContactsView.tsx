import { Contact } from "../types";
import { ITEMS_PER_PAGE, DAILY_LIMIT } from "../constants";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import styles from "../styles/ContactsView.module.css";

interface ContactsViewProps {
  contacts: Contact[];
  contactSearch: string;
  setContactSearch: (search: string) => void;
  contactPage: number;
  setContactPage: (page: number) => void;
  limitReached: boolean;
  limitCount: number;
  contactsCount: number;
}

export default function ContactsView({
  contacts,
  contactSearch,
  setContactSearch,
  contactPage,
  setContactPage,
  limitReached,
  limitCount,
  contactsCount
}: ContactsViewProps) {
  const filteredContacts = contacts.filter((contact) =>
    Object.values(contact).some((value) =>
      value.toLowerCase().includes(contactSearch.toLowerCase())
    )
  );
  const contactTotalPages = Math.ceil(filteredContacts.length / ITEMS_PER_PAGE);
  const contactStartIndex = (contactPage - 1) * ITEMS_PER_PAGE;
  const currentContacts = filteredContacts.slice(contactStartIndex, contactStartIndex + ITEMS_PER_PAGE);

  return (
    <div className={styles.contentArea}>
      <div className={styles.pageHeader}>
        <h1 className={styles.contentTitle}>Liste des Contacts</h1>
        <p className={styles.subtitle}>
          {contactsCount} contact{contactsCount > 1 ? "s" : ""} disponible{contactsCount > 1 ? "s" : ""}
        </p>
      </div>

      <SearchBar
        placeholder="Rechercher par nom, email..."
        value={contactSearch}
        onChange={setContactSearch}
      />

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeader}>
              <th className={styles.th}>Prénom</th>
              <th className={styles.th}>Nom</th>
              <th className={styles.th}>Poste</th>
              <th className={styles.th}>Email</th>
              <th className={styles.th}>Téléphone</th>
              <th className={styles.th}>Département</th>
              <th className={styles.th}>Type Email</th>
            </tr>
          </thead>
          <tbody>
            {currentContacts.length > 0 ? (
              currentContacts.map((c, idx) => (
                <tr key={idx} className={styles.tableRow}>
                  <td className={styles.td}>{c.first_name}</td>
                  <td className={styles.td}>{c.last_name}</td>
                  <td className={styles.td}>{c.title}</td>
                  <td className={styles.td}>
                    {c.email !== "__" ? (
                      <a href={`mailto:${c.email}`} className={styles.link}>{c.email}</a>
                    ) : "—"}
                  </td>
                  <td className={styles.td}>
                    {c.phone !== "__" ? (
                      <a href={`tel:${c.phone}`} className={styles.link}>{c.phone}</a>
                    ) : "—"}
                  </td>
                  <td className={styles.td}>{c.department}</td>
                  <td className={styles.td}>{c.email_type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className={styles.noResults}>
                  Aucun contact trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {contactTotalPages > 1 && (
        <Pagination
          currentPage={contactPage}
          totalPages={contactTotalPages}
          onPageChange={setContactPage}
        />
      )}

      {contactPage === contactTotalPages && contactsCount >= DAILY_LIMIT && (
        <div className={styles.alert}>
          <span className={styles.alertIcon}>!</span>
          <div>
            <p className={styles.alertTitle}>Vous avez atteint la limite !</p>
            <p>Vous avez consulté tous vos {DAILY_LIMIT} contacts disponibles pour aujourd'hui.</p>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
              Votre limite se réinitialisera dans 24 heures ou upgradez pour un accès illimité.
            </p>
            <button className={styles.btnUpgrade}>
              Upgrader pour voir plus de contacts
            </button>
          </div>
        </div>
      )}
    </div>
  );
}