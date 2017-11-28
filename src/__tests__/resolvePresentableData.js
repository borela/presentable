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

import presentable from '../presentable'
import resolvePresentableData from '../resolvePresentableData'
import { Component } from 'react'

describe('Method “resolvePresentableData”', () => {
  const CONTEXT = { contextA: 1, contextB: 2, contextC: 3 }
  const PROPS = { propA: 1, propB: 2, propC: 3 }
  const STATE = { stateA: 1, stateB: 2, stateC: 3 }

  class SomeClass {}

  const BOGUS_PRESENTABLES = [
    [ undefined ],
    [ null ],
    [ '' ],
    [ '...' ],
    [ 0 ],
    [ 42 ],
    [ SomeClass ]
  ]

  it('returns the data without presentable meta properties', () => {
    @presentable
    class SomeComponent extends Component {
      state = STATE
    }

    const COMP = new SomeComponent(
      { presenter: null, ...PROPS },
      CONTEXT
    )

    expect(resolvePresentableData(COMP)).toEqual({
      context: CONTEXT,
      props: PROPS,
      state: STATE
    })
  })

  for (const PRESENTABLE of BOGUS_PRESENTABLES) {
    it(`returns undefined for “${PRESENTABLE}”`, () => {
      expect(resolvePresentableData(PRESENTABLE)).toBeUndefined()
    })
  }
})
