/*
 * SonarQube
 * Copyright (C) 2009-2018 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import * as React from 'react';
import { ComponentDescriptor, RuleDescriptor } from './context';
import WorkspaceNavComponent from './WorkspaceNavComponent';
import WorkspaceNavRule from './WorkspaceNavRule';

interface Props {
  components: ComponentDescriptor[];
  rules: RuleDescriptor[];
  onComponentClose: (component: ComponentDescriptor) => void;
  onRuleClose: (rule: RuleDescriptor) => void;
}

export default class WorkspaceNav extends React.PureComponent<Props> {
  render() {
    return (
      <nav className="workspace-nav">
        <ul className="workspace-nav-list">
          {this.props.components.map(component => (
            <WorkspaceNavComponent
              component={component}
              key={`component-${component.key}`}
              onClose={this.props.onComponentClose}
            />
          ))}

          {this.props.rules.map(rule => (
            <WorkspaceNavRule
              key={`rule-${rule.key}`}
              onClose={this.props.onRuleClose}
              rule={rule}
            />
          ))}
        </ul>
      </nav>
    );
  }
}
