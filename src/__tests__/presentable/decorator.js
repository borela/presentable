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

import presentable from '../../presentable'
import { Component } from 'react'

describe('Decorator “presentable” applied on a component', () => {
  class SomeComponent extends Component {}
  let DecoratedComponent = presentable(SomeComponent)

  it('has the same constructor', () => {
    const INSTANCE = new DecoratedComponent
    expect(INSTANCE instanceof SomeComponent).toBe(true)
    expect(Object.getPrototypeOf(INSTANCE).constructor).toBe(SomeComponent)
  })

  it('allows the decorator to be applied multiple times', () => {
    expect(() => presentable(SomeComponent)).not.toThrow()
  })
})
