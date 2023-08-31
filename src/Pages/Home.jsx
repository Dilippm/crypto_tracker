import React, { lazy, Suspense } from 'react';
import ErrorBoundary from "../Errorboundary/ErrorBoundary"
const LazyBanner = lazy(() => import('../Components/Banner/Banner'));
const LazyCoinsTable = lazy(() => import('../Components/CoinsTable'));


const Home = () => {
  return (
    <ErrorBoundary>
    <Suspense fallback={<div>Loading...</div>}>
      <LazyBanner />
      <LazyCoinsTable />
    </Suspense>
  </ErrorBoundary>
  );
};


export default Home
