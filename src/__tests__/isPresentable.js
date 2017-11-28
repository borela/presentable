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

import isPresentable from '../isPresentable'
import presentable from '../presentable'
import { Component } from 'react'

describe('Function “isPresentable”', () => {
  class NonPresentable extends Component {}

  @presentable
  class SomeComponent extends Component {}

  const PRESENTABLES = [
    SomeComponent,
    new SomeComponent
  ]

  const NON_PRESENTABLES = [
    NonPresentable,
    new NonPresentable,
    null,
    undefined,
    false,
    '',
    '...',
    42,
    {}
  ]

  for (const PRESENTABLE of PRESENTABLES) {
    it(`returns “true” for “${PRESENTABLE}”`, () => {
      expect(isPresentable(PRESENTABLE)).toBe(true)
    })
  }

  for (const NON_PRESENTABLE of NON_PRESENTABLES) {
    it(`returns “false” for “${NON_PRESENTABLE}”`, () => {
      expect(isPresentable(NonPresentable)).toBe(false)
    })
  }
})
