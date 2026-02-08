# TODO: Replace Checkout Page with Demo Payment Flow

## Backend Changes
- [x] Add `demoPay` function in `backend/controllers/orderController.js`
- [x] Add `POST /demo-pay` route in `backend/routes/orderRoute.js`

## Frontend Changes
- [x] Modify `frontend/src/pages/PlaceOrder/PlaceOrder.jsx`: Remove Order Information section, change "Proceed To Payment" to place order and redirect to `/payment?orderId={orderId}`
- [x] Create `frontend/src/pages/Payment/Payment.jsx`: Demo payment page with "Pay Now" button, call API, show toast, redirect to `/order-success`
- [x] Create `frontend/src/pages/OrderSuccess/OrderSuccess.jsx`: Simple success page
- [x] Update `frontend/src/App.jsx`: Add routes for `/payment` and `/order-success`

## Testing
- [ ] Test end-to-end flow: Place order -> Payment -> Success
- [ ] Ensure styling matches DineNow theme (Tailwind CSS)
- [ ] Check mobile responsiveness
