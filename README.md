# the-cooking-book

application to save our recipes.

# Configure

open file  environment and add next 

```ts
export const environment = {
  production: false,
  firebase: {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
 },
 admob: {
  adModId: "", //Not found
  intersticialId: ""
 }
};
```

# Test

```bash
ionic serve --devapp
```

# Build

```bash
ionic build --prod
```