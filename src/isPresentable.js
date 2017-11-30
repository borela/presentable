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

import { Component } from 'react'

const SYMBOL = Symbol.for('presentable')

/**
 * Check if the target component supports presenters.
 */
export function isPresentable(targetComponent:Component<*>) {
  if (!targetComponent)
    return false
  const PROTOTYPE = targetComponent instanceof Component
    ? Object.getPrototypeOf(targetComponent)
    : targetComponent.prototype
  return PROTOTYPE && PROTOTYPE[SYMBOL] === true || false
}

export default isPresentable
