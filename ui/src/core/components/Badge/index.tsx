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

import Text from 'core/components/Text';
import Styled from './styled';

export interface Props {
  label: string;
}

const Badge = ({ label }: Props) => (
  <Styled.Badge>
    <Text tag="H6" color="light" align="center" data-testid={`badge-${label}`}>
      {label}
    </Text>
  </Styled.Badge>
);

export default Badge;
