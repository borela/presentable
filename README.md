[![Presentable](art/logo.png)][presentable]

[![React](https://img.shields.io/:react-%5E15%7C%5E16-green.svg?style=flat-square)][presentable]
[![License](http://img.shields.io/:license-apache-blue.svg?style=flat-square)][presentable]

Decorator to facilitate the separation between the view (presenter) and view
model (presentable).

## Installation

```sh
npm install --save presentable
```

## Basic usage

```js
import React, { Component } from 'react'
import { presentable } from 'presentable'

// The render method does not need to be implemented in the presentable component.
@presentable
class MyViewModel extends Component {
  // Write your view model state and properties.
}

// If you try to render the view model without a presenter, it won’t render
// anything.
<MyViewModel/>
// Result: nothing
```

## Adding the view

```js
// The view is just a normal react component.
class SomeView extends Component {
  render() {
    // You can access the context, state and props from the view model.
    let { context, state, props } = this.props.presentable
    // Write your view logic.
    return <span {...props}/>
  }
}

// Let’s render the previous view model with it.
<MyViewModel a="1", b="2", c="3" presenter={SomeView}/>
// Result: <span a="1" b="2" c="3"></span>
```


## Default presenter

```js
// Sometimes you want your view model to have a default view. The order of the
// decorators is not important.
@presentable
@defaultPresenter(SomeView)
class AnotherViewModel extends Component {
  // ...
}

// As you can see, we are not passing the presenter this time, but we should expect
// the same result as the previous one since we are using the same view.
<AnotherViewModel a="1", b="2", c="3"/>
// Result: <span a="1" b="2" c="3"></span>
```

## Advanced usage

```js
import React, { Component } from 'react'
import {
  presentable,
  resolvePresenter,
  resolvePresentableData
} from 'presentable'

class SomePresenter extends Component {
  render() {
    let {
      // You can access the view model instance directly if you need it, but
      // try to avoid it at all costs.
      instance
    } = this.props.presentable
    // ...
  }
}

@presentable
class SomeComponent extends Component {
  // Optionally you can define the “getPresentableData” method if you need to
  // transform/filter the props and state being passed to the view. The default
  // implementation is as follows:
  getPresentableData() {
    return resolvePresentableData(this)
  }

  // Optionally you can define the method “getPresenter” so that a custom logic
  // can be used to locate the view. The default implementation is as follows:
  getPresenter() {
    return resolvePresenter(this)
  }

  // The render method doesn’t need to be implemented; It’ll look for the method
  // “getPresenter” to decide which presenter to use.
}
```

[presentable]: //github.com/borela/presentable
