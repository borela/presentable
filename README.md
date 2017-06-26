Decorator to facilitate the separation between smart and dumb ReactJS components.

## Installation

```sh
npm install --save presentable
```

## Usage

```js
import React, { Component } from 'react'
import { defaultPresenter, presentable } from 'presentable'

class SomePresenter extends Component {
  render() {
    let {
      // The instance is useful if you need to call the presentable’s methods,
      // an example would be a button having a method “press” or “click”.
      instance,
      // It is recommended to access the state/props through this property instead
      // of accessing them through the instance, this is by design to allow other
      // decorators to modify/enhance the presentable property when needed.
      state, props
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
    let data = {
      props: { ...this.props },
      state: { ...this.state }
    }
    delete data.props.presenter
    return data
  }

  // Optionally the method “getPresenter” can be defined so that a custom logic
  // can be used to locate the target presenter. The default implementation is
  // as follows:
  getPresenter() {
    return this.props.presenter || this.defaultPresenter || SomeOtherPresenter
  }

  // The render method doesn’t need to be implemented; It’ll look for the method
  // “getPresenter” to decide which presenter to use.
}

// To render the component with the default presenter:
<SomeComponent/>

// If necessary, a specific presenter can be set as follows:
<SomeComponent presenter={SomePresenter}/>
```
