# Getting Started with Create React App

#### Link Requirements:

https://docs.google.com/document/d/1mCeV-Xhd6fItK9pDhBXN9PmecJZY26VRsXWTTUwGaqs/edit?usp=sharing

feature:/admin/dashboard
feature:/admin/students

authentication

- login
- register
- forget password

Click login

- Call api to login
- Success-> redirect to Admin
- Failed ->show Error

authSaga

- If logged in, watch Logout
- Else watch Login

Login

- Call login api to get token + userInfo
- Set token to local storage
- Redirect to admin page

Logout

- Clear token from local storage
- Redirect to login page

authSlice

authSaga

### `yarn start`
