// page.tsx
import React from 'react';
import Layout from './layout';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div>
        <h1>Welcome to the MUN Conference 2025</h1>
        <p>
          Welcome to the Model United Nations (MUN) conference. Join delegates
          from around the world to discuss global issues and work towards
          solutions.
        </p>
        <section>
          <h2>What is MUN?</h2>
          <p>
            Model United Nations is an academic simulation of the United Nations,
            where students take on the roles of diplomats representing different
            countries and discuss current issues in international relations.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
