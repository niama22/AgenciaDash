import { Agency } from "../types";
import { ITEMS_PER_PAGE } from "../constants";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import styles from "../styles/AgenciesView.module.css";

interface AgenciesViewProps {
  agencies: Agency[];
  agencySearch: string;
  setAgencySearch: (search: string) => void;
  agencyPage: number;
  setAgencyPage: (page: number) => void;
}

export default function AgenciesView({
  agencies,
  agencySearch,
  setAgencySearch,
  agencyPage,
  setAgencyPage
}: AgenciesViewProps) {
  const filteredAgencies = agencies.filter((agency) =>
    Object.values(agency).some((value) =>
      value.toLowerCase().includes(agencySearch.toLowerCase())
    )
  );
  const agencyTotalPages = Math.ceil(filteredAgencies.length / ITEMS_PER_PAGE);
  const agencyStartIndex = (agencyPage - 1) * ITEMS_PER_PAGE;
  const currentAgencies = filteredAgencies.slice(agencyStartIndex, agencyStartIndex + ITEMS_PER_PAGE);

  return (
    <div className={styles.contentArea}>
      <div className={styles.pageHeader}>
        <h1 className={styles.contentTitle}>Liste des Agences</h1>
        <p className={styles.subtitle}>
          {filteredAgencies.length} agence{filteredAgencies.length > 1 ? "s" : ""} trouvée{filteredAgencies.length > 1 ? "s" : ""}
        </p>
      </div>

      <SearchBar
        placeholder="🔍 Rechercher par nom, état, type..."
        value={agencySearch}
        onChange={setAgencySearch}
      />

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeader}>
              <th className={styles.th}>Nom</th>
              <th className={styles.th}>État</th>
              <th className={styles.th}>Code</th>
              <th className={styles.th}>Type</th>
              <th className={styles.th}>Population</th>
              <th className={styles.th}>Site Web</th>
            </tr>
          </thead>
          <tbody>
            {currentAgencies.length > 0 ? (
              currentAgencies.map((a, idx) => (
                <tr key={idx} className={styles.tableRow}>
                  <td className={styles.td}>{a.name}</td>
                  <td className={styles.td}>{a.state}</td>
                  <td className={styles.td}>{a.state_code}</td>
                  <td className={styles.td}>{a.type}</td>
                  <td className={styles.td}>{a.population}</td>
                  <td className={styles.td}>
                    {a.website !== "__" ? (
                      <a href={a.website} target="_blank" rel="noopener noreferrer" className={styles.link}>
                        Visiter
                      </a>
                    ) : "—"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className={styles.noResults}>
                  Aucune agence trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {agencyTotalPages > 1 && (
        <Pagination
          currentPage={agencyPage}
          totalPages={agencyTotalPages}
          onPageChange={setAgencyPage}
        />
      )}
    </div>
  );
}