import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import PageNotFound from './pages/PageNotFound';
import { Product } from './pages/products/Product';
import { Supplier } from './pages/suppliers/Supplier';
import { Category } from './pages/categories/Category';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import Perfil from './pages/auth/Perfil';
import Register from './pages/auth/Register';
import PrivateRoute from './pages/auth/PrivateRoute';

export default function App() {
    return (
        <Switch>
            <PrivateRoute path="/" exact component={Dashboard} />
            <Route path="/login" exact component={Login} />
            <Route path="/registration" exact component={Register} />
            <Route path="/logout" exact component={Logout} />
            <PrivateRoute path="/products" component={Product} />
            <PrivateRoute path="/categories" component={Category} />
            <PrivateRoute path="/suppliers" component={Supplier} />
            <Route component={PageNotFound} />
        </Switch>
    );
}
