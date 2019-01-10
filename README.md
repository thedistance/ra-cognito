# ra-cognito

> Authenticate a react admin CMS with cognito user pools.

## Installation

With npm do:

```
npm install ra-cognito --save
```

## Usage

ra-cognito provides a custom `AuthProvider` and login page for integration into
a react-admin app. For example, in your main `App.js`:

```js
import React from 'react';

import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { AuthProvider, Login } from 'ra-cognito';

import { PostList } from './posts';

const App = () => (
    <Admin
      authProvider={AuthProvider}
      dataProvider={simpleRestProvider('http://path.to.my.api')}
      loginPage={Login}
    >
        <Resource name="posts" list={PostList} />
    </Admin>
);

export default App;
```

The reason that ra-cognito exposes its own login page is because it is designed
to handle the `NEW_PASSWORD_REQUIRED` authentication challenge from Cognito.
A recently registered user may only access your resources once they have
provided a new password. This is slightly different to the default react-admin
authentication flow which assumes that a user is successfully authenticated
at login time.

### Custom login page styles

If you would like to provide custom styling for the login page, you may import
the Login class without the Material UI styles, and then export this with your
own styling:

```js
import { withStyles } from '@material-ui/core/styles';
import { Login } from 'ra-cognito/dist/Login';
import pageStyles from './pageStyles';

export default withStyles(pageStyles)(Login);
```

And in `./pageStyles.js`:

```js
const pageStyles = theme => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    height: '1px',
    alignItems: 'center',
    justifyContent: 'flex-start',
    background:
      'linear-gradient(to top, hsla(210, 20%, 95%, 1), hsla(210, 20%, 90%, 1))',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  card: {
    minWidth: 300,
    marginTop: '6em',
  },
  avatar: {
    margin: '1em',
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    backgroundColor: theme.palette.secondary[500],
  },
});

export default pageStyles;
```

## License

MIT © The Distance
