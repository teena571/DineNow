# TODO: Implement FAKE Payment Simulation Feature

## Tasks
- [x] Modify frontend/src/pages/Payment/Payment.jsx to implement simulation flow:
  - Remove card form UI
  - Add state for simulation steps (processing, success, confirmed, reaching)
  - Implement setTimeout chain: 2s → success (call API), 1s → confirmed, 1s → reaching → redirect /home
  - Add toast notifications for each step
  - Show spinner and messages on page

## Completed
- [x] Analyze existing code and plan changes
- [x] Confirm plan with user
- [x] Implement changes in Payment.jsx

## Notes
- Backend fakePayment route already implemented
- Ensure table selection remains unaffected
- Test flow: Cart → Proceed to Payment → Simulation → Redirect Home
