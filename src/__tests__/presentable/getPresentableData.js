// Licensed under the Apache License, Version 2.0 (the “License”); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the

import { Component } from 'react'
import presentable from '../../presentable'

describe('Method “getPresentable”', () => {
  it('returns the context, props and state without the presenter in props', () => {
    const CONTEXT = { contextA: 1, contextB: 2, contextC: 3 }
    const PROPS = { propA: 1, propB: 2, propC: 3 }
    const STATE = { stateA: 1, stateB: 2, stateC: 3 }

    @presentable
    class SomeComponent extends Component {
      state = STATE
    }

    const COMP = new SomeComponent(
      { presenter: '...', ...PROPS },
      CONTEXT
    )

    expect(COMP.getPresentableData()).toEqual({
      context: CONTEXT,
      props: PROPS,
      state: STATE
    })
  })

  it('does not replace an existing implementation', () => {
    @presentable
    class SomeComponent extends Component {
      getPresentableData() {
        return 42
      }
    }
    const COMP = new SomeComponent
    expect(COMP.getPresentableData()).toBe(42)
  })
})
