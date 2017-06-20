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

import React, { Component } from 'react'

// Used to filter handlers.
const HANDLER_IDENTIFIER = /^on[A-Z]\w*/

/**
 * Symbol added to the class to mark it as decorated.
 */
export const SYMBOL = Symbol.for('presentable')

/**
 * Set a getter with the default presenter on the target component.
 */
export function defaultPresenter(defaultPresenter:Class<Component>) {
  return (targetComponent:Component) => {
    let prototype = targetComponent.prototype

    Object.defineProperty(prototype, 'defaultPresenter', {
      get() {
        return defaultPresenter
      }
    })

    return targetComponent
  }
}

/**
 * Check if the target component supports presenters.
 */
export function isPresentable(targetComponent:Class<Component>|Component) {
  const PROTOTYPE = targetComponent instanceof Component
    ? Object.getPrototypeOf(targetComponent)
    : targetComponent.prototype
  return PROTOTYPE[SYMBOL] === true
}

/**
 * Add support for presenters for the target component.
 */
export function presentable(targetComponent:Class<Component>) {
  // Prevent the decorator from being applied multiple times.
  if (isPresentable(targetComponent))
    return targetComponent

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
  prototype.renderPresenter = function(state, props, handlers) {
    let { presenter: Presenter } = this
    return !Presenter
      ? null
      : <Presenter presentable={{ handlers, instance: this, props, state }}/>
  }

  // Default rendering method.
  if (!prototype.render) {
    prototype.render = function() {
      let handlers = {}, props = {}
      for (let propName in this.props) {
        if (HANDLER_IDENTIFIER.test(propName))
          handlers[propName] = this.props[propName]
        else
          props[propName] = this.props[propName]
      }
      let state = { ...this.state }
      return this.renderPresenter(state, props, handlers)
    }
  }

  return targetComponent
}

export default presentable
