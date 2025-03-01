# Salam satu Malaysia 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

1. Install expo go on your mobile device
2. Clone the project
3. Install dependencies
   ```bash
   npm install
   ```
4. run the project
   ```
   npm run ios // for ios
   ```
5. Scan the QR code to launch the app in expo go
6. To experience network error, simple turn on flight mode and return to the app.

# Design Thinking

1. **Scopes**

   - Screen 1: Login page
     - [/] biometrics: passcode, faceid, fingerprint
     - [/] error handling of auth error
   - Screen 2: Transaction history
     - [/] list of transactions
     - [/] masked transaction amount
     - [/] at least 20 transactions
       ~~- bonus: lets try 10000 transactions~~
     - [/] pull-to-refresh to update list
     - [/] each list item shows: amount, data, description, type
     - [/] network error handling
   - Screen 3: Transaction details
     - [/] Details: amount, date, description,type
   - Screen 4 : Settings
     - ~~[bonus] paginated list (mixed category)~~ [virtualisation abstracted with the use of tamagui list, no need to recreate windowing]
     - ~~[bonus] virtualised list (mixed category)~~ [virtualisation abstracted with the use of tamagui list, no need to recreate windowing]
     - ~~[bonus] enable filtering (category), sorting (date asc, dsc), search~~ kinda dont have time for this
     - ~~[bonus] refresh setting in real-time~~ [no need]
     - ~~enable network error experience~~

2. **Tools stack**

   - Routing: **Expo Router** (expo-router etc)
   - State management: **Zustand + Immer** (it is chosen with considerations that the app can get complicated as it scales, though as it is currently scoped, react's in-built useState + useContext would suffice)
   - Ui library: **Tamagui** [it was noticed that tamagui's recent release (^1.125.19 | ^1.125.20) for toast on react native is a bit buggy, hence a custom toast + context was implemented]
