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

import PresenterForCustomData from 'PresenterForCustomData'
import PresentableWithCustomData from 'PresentableWithCustomData'
import React from 'react'
import SharedComponent from 'SharedComponent'
import SomePresenter from 'SomePresenter'
import SpecificPresenter from 'SpecificPresenter'
import { AlreadyPresentableException, defaultPresenter, presentable } from '..'
import { render, shallow } from 'enzyme'

describe('Decorator “presentable” applied on “SomeComponent”', () => {
  describe('Without “defaultPresenter”', () => {
    // The decorator must implement the render method on demand.
    class SomeComponent extends SharedComponent {}

    // The decorator must modify the class instead of generating a new one.
    let DecoratedComponent = presentable(SomeComponent)

    it('has the same constructor', () => {
      const WRAPPER = shallow(<DecoratedComponent/>)
      const INSTANCE = WRAPPER.instance()
      expect(INSTANCE instanceof SomeComponent)
        .toBe(true)
      expect(Object.getPrototypeOf(INSTANCE).constructor)
        .toBe(SomeComponent)
    })

    it('shows an error if apllied multiple times', () => {
      expect(() => presentable(SomeComponent))
        .toThrow(AlreadyPresentableException)
    })

    it('is empty', () => {
      const WRAPPER = render(<SomeComponent/>)
      expect(WRAPPER.children().length)
        .toBe(0)
    })

    it('renders the specified presenter', () => {
      const WRAPPER = render(<SomeComponent presenter={SpecificPresenter}/>)
      const CHILDREN = WRAPPER.children()
      expect(CHILDREN.length).toBe(1)
      expect(CHILDREN).toMatchSnapshot()
    })

    describe('Getter “presenter”', () => {
      it('returns “undefined” when no presenter is specified', () => {
        const WRAPPER = shallow(<SomeComponent/>)
        const INSTANCE = WRAPPER.instance()
        expect(INSTANCE.presenter).toBeUndefined()
      })

      it('returns the used presenter', () => {
        const WRAPPER = shallow(<SomeComponent presenter={SpecificPresenter}/>)
        const INSTANCE = WRAPPER.instance()
        expect(INSTANCE.presenter)
          .toBe(SpecificPresenter)
      })
    })
  })

  describe('With “defaultPresenter”', () => {
    @defaultPresenter(SomePresenter)
    class SomeComponent extends SharedComponent {}

    // The decorator must modify the class instead of generating a new one.
    let DecoratedComponent = presentable(SomeComponent)

    it('has the same constructor', () => {
      const WRAPPER = shallow(<DecoratedComponent/>)
      const INSTANCE = WRAPPER.instance()
      expect(INSTANCE instanceof SomeComponent)
        .toBe(true)
      expect(Object.getPrototypeOf(INSTANCE).constructor)
        .toBe(SomeComponent)
    })

    it('shows an error if apllied multiple times', () => {
      expect(() => presentable(SomeComponent))
        .toThrow(AlreadyPresentableException)
    })

    it('renders the default presenter', () => {
      const WRAPPER = render(<SomeComponent/>)
      const CHILDREN = WRAPPER.children()
      expect(CHILDREN.length).toBe(1)
      expect(CHILDREN).toMatchSnapshot()
    })

    it('renders the specified presenter', () => {
      const WRAPPER = render(<SomeComponent presenter={SpecificPresenter}/>)
      const CHILDREN = WRAPPER.children()
      expect(CHILDREN.length).toBe(1)
      expect(CHILDREN).toMatchSnapshot()
    })

    describe('Getter “presenter”', () => {
      it('returns the default presenter when none is specified', () => {
        const WRAPPER = shallow(<SomeComponent/>)
        const INSTANCE = WRAPPER.instance()
        expect(INSTANCE.presenter)
          .toBe(SomePresenter)
      })

      it('returns the used presenter', () => {
        const WRAPPER = shallow(<SomeComponent presenter={SpecificPresenter}/>)
        const INSTANCE = WRAPPER.instance()
        expect(INSTANCE.presenter)
          .toBe(SpecificPresenter)
      })
    })
  })

  describe('With custom data', () => {
    it('pass the custom data to the presenter', () => {
      render(<PresentableWithCustomData presenter={PresenterForCustomData}/>)
    })
  })
})
