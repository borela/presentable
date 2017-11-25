// Licensed under the Apache License, Version 2.0 (the “License”); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the

import defaultPresenter from '../../defaultPresenter'
import each from 'jest-each'
import presentable from '../../presentable'
import { Component } from 'react'

describe('method ”getPresenter', () => {
  class SomePresenter extends Component {}
  class SomeDefaultPresenter extends Component {}

  @presentable
  class SomeComponentA extends Component {}

  @presentable
  @defaultPresenter(SomeDefaultPresenter)
  class SomeComponentB extends Component {}

  it('returns the specified presenter', () => {
    const INSTANCE_A = new SomeComponentA({ presenter: SomePresenter })
    const INSTANCE_B = new SomeComponentB({ presenter: SomePresenter })
    expect(INSTANCE_A.getPresenter()).toBe(SomePresenter)
    expect(INSTANCE_B.getPresenter()).toBe(SomePresenter)
  })

  class SomeClass {}
  const BOGUS_PRESENTERS = [
    [ undefined ],
    [ null ],
    [ '' ],
    [ '123' ],
    [ 0 ],
    [ 42 ],
    [ () => SomeClass ]
  ]

  each(BOGUS_PRESENTERS)
    .it('returns the default pressenter for “%s”', presenter => {
      const INSTANCE = new SomeComponentB({ presenter })
      expect(INSTANCE.getPresenter()).toBe(SomeDefaultPresenter)
    })

  each(BOGUS_PRESENTERS)
    .it('returns undefined for “%s”', presenter => {
      const INSTANCE = new SomeComponentA({ presenter })
      expect(INSTANCE.getPresenter()).toBeUndefined()
    })
})
