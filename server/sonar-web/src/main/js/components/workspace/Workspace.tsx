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
import * as PropTypes from 'prop-types';
import { uniqBy } from 'lodash';
import { WorkspaceContext, ComponentDescriptor, RuleDescriptor } from './context';
import WorkspaceNav from './WorkspaceNav';
import WorkspacePortal from './WorkspacePortal';
import WorkspaceSourceViewer from './WorkspaceSourceViewer';
import './styles.css';

interface State {
  components: ComponentDescriptor[];
  open: { component?: ComponentDescriptor; rule?: RuleDescriptor };
  rules: RuleDescriptor[];
}

export default class Workspace extends React.PureComponent<{}, State> {
  mounted = false;

  static childContextTypes = {
    workspace: PropTypes.object
  };

  state: State = {
    components: [],
    open: {},
    rules: []
  };

  getChildContext = (): { workspace: WorkspaceContext } => {
    return { workspace: { openComponent: this.openComponent, openRule: this.openRule } };
  };

  openComponent = (component: ComponentDescriptor) => {
    this.setState((state: State): Partial<State> => ({
      components: uniqBy([...state.components, component], component => component.key),
      open: { component }
    }));
  };

  openRule = (rule: RuleDescriptor) => {
    this.setState((state: State): Partial<State> => ({
      open: { rule },
      rules: uniqBy([...state.rules, rule], rule => rule.key)
    }));
  };

  closeComponent = (component: ComponentDescriptor) => {
    this.setState((state: State) => ({
      components: state.components.filter(x => x.key !== component.key)
      // TODO unset open.component
    }));
  };

  closeRule = (rule: RuleDescriptor) => {
    this.setState((state: State) => ({
      rules: state.rules.filter(x => x.key !== rule.key)
      // TODO unset open.rule
    }));
  };

  render() {
    console.group('Workspace');
    console.log('Open:', this.state.open);
    console.log('Components:', this.state.components.map(component => component.key).join(', '));
    console.log('Rules:', this.state.rules.map(rule => rule.key).join(', '));
    console.groupEnd();

    return (
      <>
        {this.props.children}
        <WorkspacePortal>
          <WorkspaceNav
            components={this.state.components}
            onComponentClose={this.closeComponent}
            onRuleClose={this.closeRule}
            rules={this.state.rules}
          />
          {this.state.open.component && (
            <WorkspaceSourceViewer component={this.state.open.component} />
          )}
        </WorkspacePortal>
      </>
    );
  }
}
