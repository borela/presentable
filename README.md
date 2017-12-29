[![Presentable](art/logo.png)][presentable]

[![React](https://img.shields.io/:react-%5E15%7C%5E16-green.svg?style=flat-square)][presentable]
[![License](http://img.shields.io/:license-apache-blue.svg?style=flat-square)][presentable]

Decorator to facilitate the separation between the view and view model (presentable).

## Table of contents

1. [Installation](#installation)
2. [Basic usage](#basic-usage)
3. [Adding the view](#adding-the-view)
4. [Default view](#default-view)
5. [Advanced usage](#advanced-usage)

## Installation

```sh
npm install --save presentable
```

## Basic usage

```js
import React, { Component } from 'react'
import { presentable } from 'presentable'

// The render method does not need to be implemented in the view model.
@presentable
class MyViewModel extends Component {
  // Write your view model state and properties.
}

// If you try to render the view model without a view, it won’t render anything.
<MyViewModel/>
// Result: nothing
```

## Adding the view

```js
// The view is just a normal react component, it can even be a stateless component.
class SomeView extends Component {
  render() {
    // You can access the context, state and props from the view model.
    let { context, state, props } = this.props.viewModel
    // Write your view logic.
    return <span {...props}/>
  }
}

// Let’s render the previous view model with it.
<MyViewModel a="1", b="2", c="3" view={SomeView}/>
// Result: <span a="1" b="2" c="3"></span>
```

## Default view

```js
import { defaultView } from 'presentable'

// Sometimes you want your view model to have a default view.
@presentable
@defaultView(SomeView)
class AnotherViewModel extends Component {
  // ...
}

// As you can see, we are not passing the view as a property this time, but we
// should expect the same result as the previous one since we are using the same
// view to render a similar model.
<AnotherViewModel a="1", b="2", c="3"/>
// Result: <span a="1" b="2" c="3"></span>
```

## Advanced usage

```js
import React, { Component } from 'react'
import {
  presentable,
  resolveView,
  resolveViewData
} from 'presentable'

class SomeView extends Component {
  render() {
    let {
      // You can access the view model instance directly if you need it, but
      // try to avoid it at all costs.
      instance
    } = this.props.viewModel
    // ...
  }
}

@presentable
class SomeViewModel extends Component {
  // Optionally you can define this method if you need to transform/filter the
  // props and state being passed to the view. The default implementation is as
  // follows:
  getViewData() {
    return resolveViewData(this)
  }

  // Optionally you can define this method to use a custom logic to locate the
  // view. The default implementation is as follows:
  getView() {
    return resolveView(this)
  }
}
```

[presentable]: //github.com/borela/presentable
