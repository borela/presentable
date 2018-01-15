// Licensed under the Apache License, Version 2.0 (the “License”); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the

import { defaultView } from '..'
import { presentable } from '..'
import { resolveView } from '..'
import { Component } from 'react'

describe('method “resolveView”', () => {
  class SomeView extends Component {}
  class SomeContextView extends Component {}
  class SomeDefaultView extends Component {}

  @presentable
  class SomeComponentA extends Component {}

  @presentable
  @defaultView(SomeDefaultView)
  class SomeComponentB extends Component {}

  class SomeClass {}

  const BOGUS_VIEWS = [
    [ undefined ],
    [ null ],
    [ '' ],
    [ '...' ],
    [ 0 ],
    [ 42 ],
    [ SomeClass ]
  ]

  describe('there’s a view in the context', () => {
    it('returns the specified view', () => {
      const INSTANCE_A = new SomeComponentA({ view: SomeView }, { view: SomeContextView })
      const INSTANCE_B = new SomeComponentB({ view: SomeView }, { view: SomeContextView })
      expect(resolveView(INSTANCE_A)).toBe(SomeView)
      expect(resolveView(INSTANCE_B)).toBe(SomeView)
    })

    for (const BOGUS_VIEW of BOGUS_VIEWS) {
      it(`returns the view from the context for “${BOGUS_VIEW}”`, () => {
        const INSTANCE = new SomeComponentB({ view: BOGUS_VIEW }, { view: SomeContextView })
        expect(resolveView(INSTANCE)).toBe(SomeContextView)
      })
    }
  })

  describe('no view in the context', () => {
    it('returns the specified view', () => {
      const INSTANCE_A = new SomeComponentA({ view: SomeView })
      const INSTANCE_B = new SomeComponentB({ view: SomeView })
      expect(resolveView(INSTANCE_A)).toBe(SomeView)
      expect(resolveView(INSTANCE_B)).toBe(SomeView)
    })

    for (const BOGUS_VIEW of BOGUS_VIEWS) {
      it(`returns the default pressenter for “${BOGUS_VIEW}”`, () => {
        const INSTANCE = new SomeComponentB({ view: BOGUS_VIEW })
        expect(resolveView(INSTANCE)).toBe(SomeDefaultView)
      })
    }

    for (const BOGUS_VIEW of BOGUS_VIEWS) {
      it(`returns undefined for “${BOGUS_VIEW}”`, () => {
        const INSTANCE = new SomeComponentA({ view: BOGUS_VIEW })
        expect(resolveView(INSTANCE)).toBeUndefined()
      })
    }
  })
})
