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

import React from 'react'
import SharedComponent from 'SharedComponent'
import SomePresenter from 'SomePresenter'
import SpecificPresenter from 'SpecificPresenter'
import { defaultPresenter, isPresentable, presentable } from '..'
import { render, shallow } from 'enzyme'

describe('Decorator “defaultPresenter” applied on “SomeComponent”', () => {
  @defaultPresenter(SomePresenter)
  class SomeComponent extends SharedComponent {
    // React components requires the render method to be defined but we are only
    // testing the “defaultPresenter” getter.
    render() {
      return null
    }
  }

  it('has the same constructor', () => {
    const WRAPPER = shallow(<SomeComponent/>)
    const INSTANCE = WRAPPER.instance()
    expect(Object.getPrototypeOf(INSTANCE).constructor)
      .toBe(SomeComponent)
  })

  it('has a getter “defaultPresenter”', () => {
    const WRAPPER = shallow(<SomeComponent/>)
    const INSTANCE = WRAPPER.instance()
    expect(INSTANCE.defaultPresenter)
      .toBe(SomePresenter)
  })
})

describe('Function “isPresentable”', () => {
  class NonPresentable extends SharedComponent {}

  @presentable
  class SomeComponent extends SharedComponent {}

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

describe('Decorator “presentable” applied on “SomeComponent”', () => {
  describe('Without “defaultPresenter”', () => {
    // The decorator must implement the render method so that the following class
    // declaration is actually correct.
    @presentable
    class SomeComponent extends SharedComponent {}

    it('has the same constructor', () => {
      const WRAPPER = shallow(<SomeComponent/>)
      const INSTANCE = WRAPPER.instance()
      expect(Object.getPrototypeOf(INSTANCE).constructor)
        .toBe(SomeComponent)
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
    @presentable
    @defaultPresenter(SomePresenter)
    class SomeComponent extends SharedComponent {}

    it('has the same constructor', () => {
      const WRAPPER = shallow(<SomeComponent/>)
      const INSTANCE = WRAPPER.instance()
      expect(Object.getPrototypeOf(INSTANCE).constructor)
        .toBe(SomeComponent)
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
})
