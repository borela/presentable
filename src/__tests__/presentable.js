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

import React, { Component } from 'react'
import { AlreadyPresentableException, defaultPresenter, presentable } from '..'
import { shallow } from 'enzyme'

const PROPS = { a: 1, b: 2, c: 3 }
const CUSTOM_PROPS = { d: 4, e: 5, f: 6 }
const STATE = { g: 7, h: 8, i: 9 }
const CUSTOM_STATE = { j: 10, k: 11, l: 12 }

class ProbedPresenter extends Component {
  render() {
    expect(this.props.presentable)
      .not.toBeUndefined()

    let { instance, state, props } = this.props.presentable

    expect(instance).toBeInstanceOf(Component)
    expect(state).toEqual(STATE)
    expect(props).toEqual(PROPS)

    return <div>ProbedPresenter!</div>
  }
}

class CustomDataProbedPresenter extends Component {
  render() {
    expect(this.props.presentable)
      .not.toBeUndefined()

    let { instance, state, props } = this.props.presentable

    expect(instance).toBeInstanceOf(Component)
    expect(state).toEqual(CUSTOM_STATE)
    expect(props).toEqual(CUSTOM_PROPS)

    return <div>CustomDataProbedPresenter!</div>
  }
}

describe('Decorator “presentable” applied on “SomeComponent”', () => {
  describe('without “defaultPresenter”', () => {
    // The decorator must implement the render method on demand.
    class SomeComponent extends Component {
      static defaultProps = PROPS
      state = STATE
    }

    // The decorator must modify the class instead of generating a new one.
    let DecoratedComponent = presentable(SomeComponent)

    it('has the same constructor', () => {
      const WRAPPER = shallow(<DecoratedComponent/>)
      const INSTANCE = WRAPPER.instance()
      expect(INSTANCE)
        .toBeInstanceOf(SomeComponent)
      expect(Object.getPrototypeOf(INSTANCE).constructor)
        .toBe(SomeComponent)
    })

    it('shows an error if apllied multiple times', () => {
      expect(() => presentable(SomeComponent))
        .toThrow(AlreadyPresentableException)
    })

    it('is empty', () => {
      const WRAPPER = shallow(<SomeComponent/>)
      expect(WRAPPER.children().length)
        .toBe(0)
    })

    it('renders the specified presenter', () => {
      const RENDERED_PRESENTER = shallow(<SomeComponent presenter={ProbedPresenter}/>).dive()
      expect(RENDERED_PRESENTER.equals(
        <div>
          ProbedPresenter!
        </div>
      )).toBe(true)
    })

    describe('Default method “getPresenter”', () => {
      it('returns “undefined” when no presenter is specified', () => {
        const WRAPPER = shallow(<SomeComponent/>)
        const INSTANCE = WRAPPER.instance()
        expect(INSTANCE.getPresenter()).toBeUndefined()
      })

      it('returns the used presenter', () => {
        const WRAPPER = shallow(<SomeComponent presenter={ProbedPresenter}/>)
        const INSTANCE = WRAPPER.instance()
        expect(INSTANCE.getPresenter())
          .toBe(ProbedPresenter)
      })
    })
  })

  describe('with “defaultPresenter”', () => {
    class SomePresenter extends Component {
      render() {
        return <div>Ctrine!</div>
      }
    }

    @defaultPresenter(SomePresenter)
    class SomeComponent extends Component {
      static defaultProps = PROPS
      state = STATE
    }

    // The decorator must modify the class instead of generating a new one.
    let DecoratedComponent = presentable(SomeComponent)

    it('has the same constructor', () => {
      const WRAPPER = shallow(<DecoratedComponent/>)
      const INSTANCE = WRAPPER.instance()
      expect(INSTANCE)
        .toBeInstanceOf(SomeComponent)
      expect(Object.getPrototypeOf(INSTANCE).constructor)
        .toBe(SomeComponent)
    })

    it('shows an error if apllied multiple times', () => {
      expect(() => presentable(SomeComponent))
        .toThrow(AlreadyPresentableException)
    })

    it('renders the default presenter', () => {
      const RENDERED_PRESENTER = shallow(<SomeComponent/>).dive()
      expect(RENDERED_PRESENTER.equals(
        <div>
          Ctrine!
        </div>
      )).toBe(true)
    })

    it('renders the specified presenter', () => {
      const RENDERED_PRESENTER = shallow(<SomeComponent presenter={ProbedPresenter}/>).dive()
      expect(RENDERED_PRESENTER.equals(
        <div>
          ProbedPresenter!
        </div>
      )).toBe(true)
    })

    describe('Default method “getPresenter”', () => {
      it('returns the default presenter when none is specified', () => {
        const WRAPPER = shallow(<SomeComponent/>)
        const INSTANCE = WRAPPER.instance()
        expect(INSTANCE.getPresenter())
          .toBe(SomePresenter)
      })

      it('returns the used presenter', () => {
        const WRAPPER = shallow(<SomeComponent presenter={ProbedPresenter}/>)
        const INSTANCE = WRAPPER.instance()
        expect(INSTANCE.getPresenter())
          .toBe(ProbedPresenter)
      })
    })
  })

  describe('using custom data', () => {
    @presentable
    class SomeComponent extends Component {
      static defaultProps = PROPS
      state = STATE

      getPresentableData() {
        return { props: CUSTOM_PROPS, state: CUSTOM_STATE }
      }
    }

    it('pass the custom data to the presenter', () => {
      shallow(<SomeComponent presenter={CustomDataProbedPresenter}/>)
    })
  })


  describe('using presenter resolution', () => {
    @presentable
    class SomeComponent extends Component {
      static defaultProps = PROPS
      state = STATE

      getPresenter() {
        return ProbedPresenter
      }
    }

    it('uses the presenter from the custom resolution method', () => {
      const RENDERED_PRESENTER = shallow(<SomeComponent/>).dive()
      expect(RENDERED_PRESENTER.equals(
        <div>
          ProbedPresenter!
        </div>
      )).toBe(true)
    })
  })
})
