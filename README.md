Decorator to facilitate the separation between smart and dumb ReactJS components.

## Installation

```sh
npm install --save presentable
```

## Usage

```js
import React, { Component } from 'react'
import { defaultPresenter, presenter, presentable } from 'presentable'

@presenter
class SomePresenter extends Component {
  render() {
    let { instance, state, props, handlers } = this.props.presentable
    return <div>Ctrine!</div>
  }
}

@presentable
@defaultPresenter(SomePresenter)
class SomeComponent extends Component {
  // The render method doesn’t need to be implemented; It’ll look for the property
  // “presenter” and if not defined, will use the default presenter to render this
  // component.
}
```
