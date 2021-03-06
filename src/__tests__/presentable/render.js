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

import { presentable } from '../..'
import { Component } from 'react'

describe('method ”getView', () => {
  class SomeView extends Component {}

  @presentable
  class SomeComponent extends Component {}

  let instance
  beforeEach(() => {
    instance = new SomeComponent({ view: SomeView })
  })

  it('calls “getView” and “getViewData”', () => {
    const SPY_A = jest.spyOn(instance, 'getView')
    const SPY_B = jest.spyOn(instance, 'getViewData')
    instance.render()
    expect(SPY_A).toHaveBeenCalled()
    expect(SPY_B).toHaveBeenCalled()
  })

  it('pass data from “getViewData” to the specified view', () => {
    const DATA = instance.getViewData()
    const RENDERED_VIEW = instance.render()
    expect(RENDERED_VIEW.props.presentable).toEqual({
      instance, ...DATA
    })
  })
})
