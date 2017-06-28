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

  // Add a marker used to detect if the component is presentable.
  prototype[SYMBOL] = true

  // Add the default implementation for “getPresenter”.
  if (!prototype.getPresenter) {
    prototype.getPresenter = function() {
      return this.props.presenter || this.defaultPresenter
    }
  }

  // Add the default implementation for “getPresentableData”.
  if (!prototype.getPresentableData) {
    prototype.getPresentableData = function() {
      let result = {
        props: { ...this.props },
        state: { ...this.state }
      }
      delete result.props.presenter
      return result
    }
  }

  // Default rendering method.
  if (!prototype.render) {
    prototype.render = function() {
      let data = this.getPresentableData()
      let Presenter = this.getPresenter()
      return !Presenter
        ? null
        : <Presenter presentable={{ instance: this, ...data }}/>
    }
  }

  return targetComponent
}

export default presentable