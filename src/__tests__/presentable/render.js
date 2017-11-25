// Licensed under the Apache License, Version 2.0 (the “License”); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the

import presentable from '../../presentable'
import { Component } from 'react'

describe('method ”getPresenter', () => {
  class SomePresenter extends Component {}

  @presentable
  class SomeComponent extends Component {}

  it('calls “getPresenter” and “getPresentableData”', () => {
    const INSTANCE = new SomeComponent({ presenter: SomePresenter })
    const SPY_A = jest.spyOn(INSTANCE, 'getPresenter')
    const SPY_B = jest.spyOn(INSTANCE, 'getPresentableData')
    INSTANCE.render()
    expect(SPY_A).toHaveBeenCalled()
    expect(SPY_B).toHaveBeenCalled()
  })

  it('pass data from “getPresentableData” to the specified presenter', () => {
    const INSTANCE = new SomeComponent({ presenter: SomePresenter })
    const DATA = INSTANCE.getPresentableData()
    const RENDERED_PRESENTER = INSTANCE.render()
    expect(RENDERED_PRESENTER.props.presentable).toEqual({
      instance: INSTANCE,
      ...DATA
    })
  })
})
