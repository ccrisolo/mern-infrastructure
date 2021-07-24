import "./App.css";
import React, { useState } from "react";
import NewOrderPage from "../NewOrderPage";
import AuthPage from "../AuthPage";
import OrderHistoryPage from "../OrderHistoryPage";
import { Route, Switch, Redirect } from "react-router-dom";

export default function App() {
    const [user, setUser] = useState({});

    return (
        <main className='App'>
            {user ? (
                <Switch>
                <Route path="/orders/new">
                  <NewOrderPage />
                </Route>
                <Route path="/orders">
                  <OrderHistoryPage />
                </Route>
                <Redirect to='/orders' />
              </Switch>
            ) : (
                <AuthPage />
            )}
        </main>
    );
}
