# MewUI Core ![CI](https://github.com/mewui/core/workflows/CI/badge.svg)

The core component library responsible for providing a way to develop components for MewUI.

## Installation

### NPM

```shell
npm install @mewui/core
```

### Yarn

```shell
yarn add @mewui/core
```

## Usage

### Creating a component using the component function.

```typescript
import { component } from '@mewui/core';

const User = component('user', {
  template: `
    <div class="user-card">
      <img @src="user.profileImg" alt="Profile Image" />
      <h4>@user.firstName @user.lastName</h4>
      <p>
        @user.designation at @user.company
      </p>

      <button @onclick="emit('view-details', @user.id)">View Details</button>
    </div>
  `,
  events: {
    'view-details': (event) => console.log(`View details for user ID ${event.detail}`),
  },
});
```

### Creating a component by loading the template

First define the component template inside the template tags.

```html
<template id="user">
  <div class="user-card">
    <img @src="user.profileImg" alt="Profile Image" />
    <h4>@user.firstName @user.lastName</h4>
    <p>
      @user.designation at @user.company
    </p>

    <button @onclick="emit('view-details', @user.id)">View Details</button>
  </div>
</template>
```

And then create the component as follows

```typescript
import { fromTemplate, render } from '@mewui/core';

const User = fromTemplate('#user', {
  'view-details': (event) => console.log(`View details for user ID ${event.detail}`),
});
```

### Using the component

```typescript
import { render } from '@mewui/core';

const user1 = User.instance();
user1.firstName = 'John';
user1.lastName = 'Doe';
user1.designation = 'Professional Procrastinator';
user1.company = 'Day Dreamers Inc.';

render('#app', [user1]);
```

Make sure to have an #app div present in the HTML.

```html
<html>
  <head>
    ...
  </head>

  <body>
    <div id="app"></div>

    ...
  </body>
</html>
```

### Data Bindings

MewUI Core extracts all the bindings from the component template and adds reactive properties for each of them on the component instance itself. So, the user1 object contains properties that are bound to the template.

```typescript
user1.firstName = 'John';
user1.lastName = 'Doe';
user1.designation = 'Professional Procrastinator';
user1.company = 'Day Dreamers Inc.';
```

NOTE: The DOM node associated with the user1 component instance (accesible as user1.$el) is always up to date with the properties on the object because of the reactive bindings setup by MewUI Core. However, the DOM node has to be manually added to the DOM tree visible on the browser. For that, the user1.$el can be directly appended to the HTML, or the render function could be used which accepts the component instance directly.

```typescript
render('#app', [user1]);
```

## For Developers

### Developer mode

Running

```shell
yarn dev
```

AND

```shell
yarn dev:test
```

will start up the development build of the project and the test watcher.

### To build the project

```shell
yarn build
```

builds the production bundle for the project.

### To run the tests

```shell
yarn test
```

will run all the tests.
