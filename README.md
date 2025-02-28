# Salam satu Malaysia 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

1. Install dependencies

   ```bash
   npm install
   ```

2. run the project

   ```
   npm run ios // for ios
   npm run
   ```

# Design Thinking

1. **Scopes**

   - Screen 1: Login page
     - biometrics of choice: passcode
   - Screen 2: Transaction history
     - list of transactions
     - masked transaction amount
     - at least 20 transactions
     - bonus: lets try 10000 transactions
     - pull-to-refresh to update
       list
     - each list item shows: amount, data, description, type
   - Screen 3: Transaction details
     - Details: amount, date, description,type, from who
   - Screen 4 : Settings
     - [bonus] paginated list (mixed category)
     - [bonus] virtualised list (mixed category)
     - [bonus] enable filtering (category), sorting (date asc, dsc), search
     - [bonus] refresh setting in real-time
     - enable network error experience
     - enable auth error experience (needs an automatic time out so the user can still login after a while)

2. **Tools stack**

   - Routing: **Expo Router** (expo-router etc)
   - State management: **Zustand + Immer** (it is chosen with considerations that the app can get complicated as it scales, though as it is currently scoped, react's in-built useState + useContext would suffice)
   - Ui library: **Tamagui**
