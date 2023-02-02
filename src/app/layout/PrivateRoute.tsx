import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from '../store/configureStore';

interface PropType {
    component: React.FC;
    roles? : string[]
}

const PrivateRoute: FC<PropType> = ({ component: Component , roles }) => {
    const { User } = useAppSelector(state => state.account)

    if (!User) return <Navigate to='/login' replace state={{from : '/checkout'}} />;
    if(roles && !roles?.some(r => User.roles?.includes(r))) {
        toast.error("Not authorised to access this area");
        return <Navigate to='/catalog' replace state={{from : '/checkout'}} />;
    }
    return <Component />;
};

export default PrivateRoute;