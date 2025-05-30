# Trackit

Inventory management app for coffee shop owners.

# Requirements

Before, make sure to install npm and postgresql.

For npm, you can do the following in the `client` folder if you haven't already:
```bash
npm install
```

# Get Started

Inside the trackit/client, run the frontend of the app:
```bash
npx expo start --clear
```

Inside the trackit/server, run the backend of the app:
```bash
node server.js
```

# Test locally

Before this, make sure that you are runnng the postgres (Mac Only):
```bash
brew services start postgresql@15
```

Go into the postgres:
```bash
psql -h localhost postgres
```

After run this command in order to create the database:
```bash
CREATE DATABASE trackit;
```

Log out of the main user:
```bash
\q
```

Log into the database:
```bash
psql trackit
```

Inside the trackit/server/test, run this:
```bash
\i schema.sql
\i test.sql
```

Inside the client directory, please create .env file:
```bash
EXPO_PUBLIC_BACKEND_URL = #your backend ip address
```

Inside the server directory, please create .env file:
```bash
postgresql_user = #your postgres username
```

# Testing the Settings Page

To test the Settings page, you're gonna need a few dependencies.

First, install Picker (for the dropdowns):
```bash
npm install @react-native-picker/picker 
```

Then, install Expo Image Picker (for the image selection) :
```bash
npx expo install expo-image-picker
```

# Loading fonts & dummydata
Put dummyData.ts in a new folder called "dummy" in client, and put the 2 nexa font files in client->assets->fonts. npm install before running.

