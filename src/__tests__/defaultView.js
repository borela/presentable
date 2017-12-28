// Licensed under the Apache License, Version 2.0 (the “License”); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

import defaultView from '../defaultView'
import React, { Component } from 'react'

describe('Decorator “defaultView” applied on “SomeComponent”', () => {
  class SomeView extends Component {
    render() {
      return <div>Ctrine!</div>
    }
  }

  class SomeComponent extends Component {
    render() {
      return null
    }
  }

  let DecoratedComponent = defaultView(SomeView)(SomeComponent)

  it('has the same constructor', () => {
    const INSTANCE = new DecoratedComponent
    expect(INSTANCE).toBeInstanceOf(SomeComponent)
    expect(Object.getPrototypeOf(INSTANCE).constructor).toBe(SomeComponent)
  })

  it('has a getter “defaultView”', () => {
    const INSTANCE = new SomeComponent
    expect(INSTANCE.defaultView).toBe(SomeView)
  })
})
