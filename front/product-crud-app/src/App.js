import './App.css';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import PageNotFound from './pages/PageNotFound';
import { Product } from './pages/products/Product';
import { Supplier } from './pages/suppliers/Supplier';
import { Category } from './pages/categories/Category';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

export default function App() {
    return (
        <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/login" exact component={Login} />
            <Route path="/registration" exact component={Register} />
            <Route path="/" exact component={Dashboard} />
            <Route path="/products" component={Product} />
            <Route path="/categories" component={Category} />
            <Route path="/suppliers" component={Supplier} />
            <Route component={PageNotFound} />
        </Switch>
    );
}
