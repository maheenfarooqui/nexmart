import React from "react";
import styles from "./HowItWorks.module.css";

const HowItWorks = () => {
  return (
    <div className={styles.container}>
      <h1>
        How <span className={styles.highlight}>NexMart</span> Works
      </h1>

      <section className={styles.section}>
        <h2>1. For Sellers</h2>
        <p>
          Capture high-quality photos of your new or pre-owned items, set a
          competitive price, and list them instantly to reach thousands of
          potential buyers.
        </p>
      </section>

      <section className={styles.section}>
        <h2>2. For Buyers</h2>
        <p>
          Browse through thousands of unique products across various categories
          and contact sellers directly via WhatsApp to finalize your purchase
          securely.
        </p>
      </section>

      <section className={styles.section}>
        <h2>3. Terms & Conditions</h2>
        <p>
          NexMart is a community platform. For your safety, always inspect items
          before payment and prefer meeting in public places for transactions.
        </p>
      </section>
    </div>
  );
};

export default HowItWorks;
