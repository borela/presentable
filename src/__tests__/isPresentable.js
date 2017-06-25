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

import { Component } from 'react'
import { isPresentable, presentable } from '..'

describe('Function “isPresentable”', () => {
  class NonPresentable extends Component {}

  @presentable
  class SomeComponent extends Component {}

  describe('Used on presentable', () => {
    it('returns “true” on class', () => {
      expect(isPresentable(SomeComponent))
        .toBe(true)
    })

    it('returns “true” on instance', () => {
      const INSTANCE = new SomeComponent
      expect(isPresentable(INSTANCE))
        .toBe(true)
    })
  })

  describe('Used on non presentable', () => {
    it('returns “false” on class', () => {
      expect(isPresentable(NonPresentable))
        .toBe(false)
    })

    it('returns “false” on instance', () => {
      const INSTANCE = new NonPresentable
      expect(isPresentable(INSTANCE))
        .toBe(false)
    })
  })
})
