# Address from with google address suggessions

Example for using [Google Address Suggession Hook](https://github.com/Petka17/use-google-address-suggestions)

## How to get API key and how to make it work

1. Goto [Google Cloud Console](https://console.cloud.google.com/).  
   Yes, you need a Google account to create an API key for google address suggestions
1. Select a project  
   Create qcnew project or use an existing one
1. Go to "APIs & Services" -> "Library"
1. Find and enable the following APIs: _Maps JavaScript API_ and _Places API_  
   Yes, you need both
1. Go to "APIs & Services" -> "Credentials"
1. Create a new API key and select API restrictions and Application restrictions  
   You definitely don't want to have an API key that doesn't have any restrictions.

## TODO

1. Deploy it to `https://address.petka.dev`
1. Add eslint
