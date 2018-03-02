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
import { translate } from '../../helpers/l10n';

interface Props {
  renderTitle: () => React.ReactNode;
}

export default class WorkspaceHeader extends React.PureComponent<Props> {
  render() {
    return (
      <header className="workspace-viewer-header">
        <h6 className="workspace-viewer-name">{this.props.renderTitle()}</h6>

        <div className="workspace-viewer-resize js-resize" />

        <div className="workspace-viewer-actions">
          <a
            href="#"
            className="js-minimize icon-minimize spacer-right"
            title={translate('workspace.minimize')}
            data-placement="bottom"
            data-toggle="tooltip"
          />

          <a
            href="#"
            className="js-full-screen icon-bigger-size spacer-right"
            title={translate('workspace.full_window')}
            data-placement="bottom"
            data-toggle="tooltip"
          />

          <a
            href="#"
            className="js-normal-size icon-smaller-size spacer-right"
            title={translate('workspace.normal_size')}
            data-placement="bottom"
            data-toggle="tooltip"
          />

          <a
            href="#"
            className="js-close icon-close"
            title={translate('workspace.close')}
            data-placement="bottom"
            data-toggle="tooltip"
          />
        </div>
      </header>
    );
  }
}
