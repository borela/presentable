[![Presentable](art/logo.png)][presentable]

[![React](https://img.shields.io/:react-%5E15%7C%5E16-green.svg?style=flat-square)][presentable]
[![License](http://img.shields.io/:license-apache-blue.svg?style=flat-square)][presentable]

Decorator to facilitate the separation between smart and dumb ReactJS components.

## Installation

```sh
npm install --save presentable
```

## Usage

```js
import React, { Component } from 'react'
import {
  defaultPresenter,
  presentable,
  resolvePresenter,
  resolvePresentableData
} from 'presentable'

class SomePresenter extends Component {
  render() {
    let {
      // The instance is useful if you need to call the presentable’s methods,
      // an example would be a button having a method “press” or “click”.
      instance,
      // It is recommended to access the context/state/props through this property
      // instead of accessing them through the instance, this is by design to allow
      // other decorators to modify/enhance the presentable property when needed.
      context, state, props
    } = this.props.presentable
    return <div>Ctrine!</div>
  }
}

@presentable
@defaultPresenter(SomePresenter)
class SomeComponent extends Component {
  // Optionally you can define the “getPresentableData” method if you need to
  // transform/filter the props and state being passed to the presenter. The
  // default implementation is as follows:
  getPresentableData() {
    return resolvePresentableData(this)
  }

  // Optionally you can define the method “getPresenter” so that a custom logic
  // can be used to locate the target presenter. The default implementation is
  // as follows:
  getPresenter() {
    return resolvePresenter(this)
  }

  // The render method doesn’t need to be implemented; It’ll look for the method
  // “getPresenter” to decide which presenter to use.
}

// To render the component with the default presenter:
<SomeComponent/>

// If necessary, a specific presenter can be set as follows:
<SomeComponent presenter={SomePresenter}/>
```

[presentable]: //github.com/borela/presentable
