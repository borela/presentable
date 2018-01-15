// Licensed under the Apache License, Version 2.0 (the “License”); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the

import Adapter from 'enzyme-adapter-react-16'
import React, { Component } from 'react'
import { configure, mount } from 'enzyme'
import { ContextView, defaultView, presentable, resolveView } from '..'

configure({ adapter: new Adapter() })

describe('component “ContextView”', () => {
  class SomeView extends Component {
    render() {
      return <span>direct view</span>
    }
  }

  class SomeContextView extends Component {
    render() {
      return <span>context view</span>
    }
  }

  class SomeDefaultView extends Component {
    render() {
      return <span>default view</span>
    }
  }

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

  describe('sets the view in the context', () => {
    test('child uses the specified view', () => {
      const RESULT_A = mount(
        <ContextView view={SomeContextView}>
          <SomeComponentA view={SomeView}/>
        </ContextView>
      ).find('span')

      const RESULT_B = mount(
        <ContextView view={SomeContextView}>
          <SomeComponentB view={SomeView}/>
        </ContextView>
      ).find('span')

      expect(RESULT_A.matchesElement(<span>direct view</span>)).toBe(true)
      expect(RESULT_B.matchesElement(<span>direct view</span>)).toBe(true)
    })

    for (const BOGUS_VIEW of BOGUS_VIEWS) {
      test(`child uses the view from the context for bogus view: “${BOGUS_VIEW}”`, () => {
        const RESULT = mount(
          <ContextView view={SomeContextView}>
            <SomeComponentB view={BOGUS_VIEW}/>
          </ContextView>
        ).find('span')
        expect(RESULT.matchesElement(<span>context view</span>)).toBe(true)
      })
    }

    // Other types will be caught by the prop type.
    for (const BOGUS_VIEW of [ SomeClass, function(){} ]) {
      test(`child uses the default view for bogus context: “${BOGUS_VIEW}”`, () => {
        const RESULT = mount(
          <ContextView view={BOGUS_VIEW}>
            <SomeComponentB/>
          </ContextView>
        ).find('span')
        expect(RESULT.matchesElement(<span>default view</span>)).toBe(true)
      })
    }
  })
})
