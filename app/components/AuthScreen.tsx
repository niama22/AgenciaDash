import { SignIn, SignUp } from "@clerk/nextjs";
import { useState } from "react";
import styles from "../styles/AuthScreen.module.css";

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className={styles.authContainer}>
      {/* Partie gauche - Bienvenue */}
     <div className={styles.leftPanel}>
  <h1 className={styles.welcomeTitle}>
    Bienvenue sur votre tableau de bord
  </h1>
  <p className={styles.welcomeSubtitle}>
    Consultez la liste des agences et accédez rapidement aux informations
    et contacts des employés associés.
  </p>
</div>


      {/* Partie droite - Formulaire direct */}
      <div className={styles.rightPanel}>
        <div>
          {isSignUp ? (
            <SignUp 
              routing="hash"
              appearance={{
                elements: {
                  rootBox: styles.clerkRoot,
                  card: styles.clerkCard
                }
              }}
            />
          ) : (
            <SignIn 
              routing="hash"
              appearance={{
                elements: {
                  rootBox: styles.clerkRoot,
                  card: styles.clerkCard
                }
              }}
            />
          )}
          
          <div className={styles.authSwitch}>
            <p>
              {isSignUp ? "Déjà un compte ?" : "Pas encore de compte ?"}{" "}
              <button 
                onClick={() => setIsSignUp(!isSignUp)}
                className={styles.switchButton}
              >
                {isSignUp ? "Se connecter" : "S'inscrire"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}