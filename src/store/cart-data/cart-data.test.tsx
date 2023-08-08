import { cartData, initialState } from './cart-data';
import { fetchDiscountAction, postOrderAction } from '../api-actions';
import { OrderStatus } from '../../const';


describe('extraReducers: cartData', () => {

  it('without additional parameters should return initial state', () => {
    expect(cartData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({...initialState});
  });


  describe('fetchDiscountAction test', () => {

    it('should update discount by load discount + set discountCopounSuccess to true', () => {
      expect(cartData.reducer({...initialState}, {type: fetchDiscountAction.fulfilled.type, payload: 15}))
        .toEqual({
          ...initialState,
          discount: 15,
          discountCopounSuccess: true,
        });
    });

    it('should set discountCouponError to true on fetchDiscountAction.rejected', () => {
      expect(
        cartData.reducer({...initialState}, {type: fetchDiscountAction.rejected.type})
      ).toEqual({
        ...initialState,
        discountCouponError: true,
      });
    });

  });

  describe('postOrderAction test', () => {
    it('should set orderStatus to pending when postOrderAction.pending is called', () => {
      expect(cartData.reducer({...initialState}, {type: postOrderAction.pending.type}))
        .toEqual({
          ...initialState,
          orderStatus: OrderStatus.Pending
        });
    });

    it('should set orderStatus to fulfilled & clear cart when postOrderAction.fulfilled is called', () => {
      expect(cartData.reducer({...initialState}, {type: postOrderAction.fulfilled.type}))
        .toEqual({
          ...initialState,
          orderStatus: OrderStatus.Fulfilled
        });
    });

    it('should set orderStatus to rejected when postOrderAction.rejected is called', () => {
      expect(cartData.reducer({...initialState}, {type: postOrderAction.rejected.type}))
        .toEqual({
          ...initialState,
          orderStatus: OrderStatus.Rejected
        });
    });


  });


});
