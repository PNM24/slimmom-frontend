import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import App from './components/App';
import './index.css';
import AuthProvider from './context/AuthContext';
import { BloodTypeProvider } from './context/BloodTypeContext';
import CalorieInfoProvider from './context/CalorieInfoContext';
import { ConsumedProductsProvider } from './context/ConsumedProductsContext';
import './i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthProvider>
      <BloodTypeProvider>
        <CalorieInfoProvider>
          <ConsumedProductsProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ConsumedProductsProvider>
        </CalorieInfoProvider>
      </BloodTypeProvider>
    </AuthProvider>
  </Provider>
);