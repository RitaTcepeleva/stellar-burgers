import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '@ui';
import { useEffect } from 'react';
import { getOrdersThunk } from '@slices';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((store) => store.order);

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, []);

  if (isLoading) return <Preloader />;

  return <ProfileOrdersUI orders={orders || []} />;
};
