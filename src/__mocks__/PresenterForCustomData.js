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
import SharedComponent from './SharedComponent'
import { CUSTOM_PROPS, CUSTOM_STATE } from './constants'

// Presenter that will receive custom data from the presentable.
export class PresenterForCustomData extends Component {
  render() {
    expect(this.props.presentable)
      .not.toBeUndefined()

    let { instance, state, props } = this.props.presentable

    expect(instance)
      .toBeInstanceOf(SharedComponent)

    expect(state)
      .toEqual(CUSTOM_STATE)

    expect(props)
      .toEqual(CUSTOM_PROPS)

    return <div>Ctrine!</div>
  }
}

export default PresenterForCustomData
