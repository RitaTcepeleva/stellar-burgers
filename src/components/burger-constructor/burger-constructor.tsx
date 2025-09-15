import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  requestOrderThunk,
  clearOrderModalData,
  clearConstructor
} from '@slices';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector((store) => store.burgerConstructor);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orderRequested, orderModalData } = useSelector(
    (store) => store.order
  );
  const { user } = useSelector((store) => store.user);

  const onOrderClick = async () => {
    if (!constructorItems.bun || orderRequested) return;
    if (!user) {
      navigate('/login');
      return;
    }
    const resultAction = await dispatch(
      requestOrderThunk([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((item) => item._id),
        constructorItems.bun._id
      ])
    );
    if (resultAction.meta.requestStatus === 'fulfilled')
      dispatch(clearConstructor());
  };
  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequested}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
