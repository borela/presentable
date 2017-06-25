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
// @flow

import AlreadyPresentableException from './AlreadyPresentableException'
import isPresentable from './isPresentable'
import React, { Component } from 'react'

const SYMBOL = Symbol.for('presentable')

/**
 * Add support for presenters for the target component.
 */
export function presentable(targetComponent:Class<Component>) {
  if (isPresentable(targetComponent)) {
    const COMPONENT_NAME = targetComponent.prototype.constructor.name
    throw new AlreadyPresentableException(`The component “${COMPONENT_NAME}” is already presentable.`)
  }

  let prototype = targetComponent.prototype

  // Add a marker.
  prototype[SYMBOL] = true

  // This getter will be useful for debugging the actual presenter being rendered.
  Object.defineProperty(prototype, 'presenter', {
    get() {
      return this.props.presenter || this.defaultPresenter
    }
  })

  // Hook used to allow other decorators to modify the properties and handlers
  // before passing it down to the presenter.
  prototype.renderPresenter = function(data) {
    let { presenter: Presenter } = this
    return !Presenter
      ? null
      : <Presenter presentable={{ instance: this, ...data }}/>
  }

  // Default rendering method.
  if (!prototype.render) {
    prototype.render = function() {
      let data
      if (!prototype.getPresentableData) {
        data = {
          props: { ...this.props },
          state: { ...this.state }
        }
        delete data.props.presenter
      } else
        data = this.getPresentableData()
      return this.renderPresenter(data)
    }
  }

  return targetComponent
}

export default presentable
