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

  const PRESENTABLE_INSTANCE = new SomeComponent
  const NON_PRESENTABLE_INSTANCE = new NonPresentable

  it('returns “true” for a class or presentable’s instances', () => {
    expect(isPresentable(SomeComponent)).toBe(true)
    expect(isPresentable(PRESENTABLE_INSTANCE)).toBe(true)
  })

  it('returns “false” for any other value', () => {
    expect(isPresentable(NonPresentable)).toBe(false)
    expect(isPresentable(NON_PRESENTABLE_INSTANCE)).toBe(false)
    expect(isPresentable(null)).toBe(false)
    expect(isPresentable(undefined)).toBe(false)
    expect(isPresentable(false)).toBe(false)
    expect(isPresentable('')).toBe(false)
    expect(isPresentable('...')).toBe(false)
    expect(isPresentable(42)).toBe(false)
    expect(isPresentable({})).toBe(false)
  })
})
