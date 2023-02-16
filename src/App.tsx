import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import classes from './App.module.scss'
import { Button } from './components/button/Button'

import { Spinner } from '@/components/spinner/Spinner'
import store from '@/lib/redux-toolkit'
import { AppRoutes } from '@/routes'

const ErrorFallback = () => {
  const handleRefreshClick = () => window.location.assign(window.location.origin)

  return (
    <div role="alert">
      <h1>Ooops, something went wrong</h1>
      <Button type="button" onClick={handleRefreshClick}>
        Refresh
      </Button>
    </div>
  )
}

const App = () => {
  return (
    <React.Suspense
      fallback={
        <div className={classes.loadingContainer}>
          <Spinner size="xl" />
          <span className="sr-only">Loading...</span>
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <Provider store={store}>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </Provider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  )
}

export default App
