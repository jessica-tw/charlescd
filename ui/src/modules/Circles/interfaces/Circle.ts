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

import { Rules } from 'modules/Circles/Segments';
import { DEPLOYMENT_STATUS } from 'core/enums/DeploymentStatus';

export interface Build {
  id: string;
  tag: string;
  artifacts?: Artifact[];
}

export interface Artifact {
  id: string;
  artifact: string;
  version: string;
  componentName: string;
  moduleName: string;
}

export interface Component {
  id: string;
  name: string;
  module: string;
  version: string;
  artifact: string;
}

export interface Deployment {
  id: string;
  deployedAt: string;
  status: DEPLOYMENT_STATUS;
  tag: string;
  circle?: Circle;
  artifacts: Artifact[];
}

export interface Author {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export type MatcherType = 'SIMPLE_KV' | 'REGULAR' | 'PERCENTAGE';

export interface Circle {
  id: string;
  name: string;
  author: Author;
  createdAt: string;
  deployment: Deployment;
  rules: Rules;
  matcherType?: MatcherType;
  percentage?: number;
  default?: boolean;
}

export interface CreateCircleWithFilePayload {
  file: File;
  keyName: string;
  name: string;
}

export interface CreateCircleManuallyPayload {
  rules: Rules;
  name: string;
}

export interface CreateCirclePercentagePayload {
  authorId: string;
  percentage: number;
  name: string;
}
