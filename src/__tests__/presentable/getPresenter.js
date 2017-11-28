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

jest.mock('../../resolvePresenter')

import presentable from '../../presentable'
import resolvePresenter from '../../resolvePresenter'
import { Component } from 'react'

describe('method “getPresenter”', () => {
  beforeEach(() => {
    resolvePresenter.mockClear()
  })

  it('calls “resolvePresenter”', () => {
    @presentable
    class SomeComponent extends Component {}
    const COMP = new SomeComponent
    expect(COMP.getPresenter()).toBe(456)
    expect(resolvePresenter).toHaveBeenCalled()
  })

  it('does not replace an existing implementation', () => {
    @presentable
    class SomeComponent extends Component {
      getPresenter() {
        return 42
      }
    }
    const COMP = new SomeComponent
    expect(COMP.getPresenter()).toBe(42)
  })
})
