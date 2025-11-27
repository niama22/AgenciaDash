import styles from "../styles/DashboardView.module.css";

interface DashboardViewProps {
  agenciesCount: number;
  contactsCount: number;
  dailyLimit?: number;
  usedLimit?: number;
}

export default function DashboardView({ 
  agenciesCount, 
  contactsCount, 
  dailyLimit = 50, 
  usedLimit = 0 
}: DashboardViewProps) {
  const limitPercentage = Math.min((usedLimit / dailyLimit) * 100, 100);

  return (
    <div className={styles.contentArea}>
      <h1 className={styles.contentTitle}>Dashboard</h1>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statCardLabel}>Total Agences</div>
          <div className={styles.statCardValue}>{agenciesCount}</div>
          <div className={styles.statCardDescription}>Agences disponibles</div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statCardLabel}>Total Contacts</div>
          <div className={styles.statCardValue}>{contactsCount}</div>
          <div className={styles.statCardDescription}>Contacts chargés</div>
        </div>
        
     
      </div>
    </div>
  );
}