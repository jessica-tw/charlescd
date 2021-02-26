/*
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { getRoles } from 'core/utils/auth';
import includes from 'lodash/includes';
import forEach from 'lodash/forEach';
import { Workspace } from 'modules/Workspaces/interfaces/Workspace';

export const isAllowed = (allowedRoles: string[], workspace: Workspace) => {
  const roles = getRoles(workspace);
  let status = false;

  forEach(allowedRoles, role => {
    status = includes(roles, role);
    if (status) {
      return false;
    }
  });

  return status;
};
