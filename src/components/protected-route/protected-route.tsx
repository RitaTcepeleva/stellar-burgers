import { FC } from 'react';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: React.ReactElement;
  forNotAuthorized?: boolean;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  forNotAuthorized = false
}: ProtectedRouteProps) => {
  const { user, isAuthChecked } = useSelector((store) => store.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (forNotAuthorized && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!forNotAuthorized && !user) {
    return <Navigate replace to='/login' />;
  }
  return children;
};
