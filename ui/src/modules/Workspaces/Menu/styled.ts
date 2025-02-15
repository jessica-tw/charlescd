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

import styled from 'styled-components';
import LabeledIcon from 'core/components/LabeledIcon';
import SearchInputComponent from 'core/components/Form/SearchInput';
import IconComponent from 'core/components/Icon';
import ButtonComponentDefault from 'core/components/Button/ButtonDefault';
import Text from 'core/components/Text';
import LoaderMenuComponent from './Loaders';

const SearchInput = styled(SearchInputComponent)`
  margin: 15px 0;
  padding: 0 16px;
`;

const List = styled.ul`
  padding: 0 16px;
  margin: 0;
  list-style-type: none;
`;

const ListItem = styled(LabeledIcon)`
  padding: 15px 0;
  cursor: pointer;
  display: flex;
`;

const Content = styled.div`
  height: calc(100vh - 250px);
`;

const Actions = styled.div`
  > * + * {
    margin-left: 20px;
  }
  padding: 0 16px;
`;

const Icon = styled(IconComponent)`
  cursor: pointer;
`;

const Link = styled.button`
  display: block;
  padding: 0 16px;
  background: none;
  border: none;
  margin: 0;
  text-decoration: none;
`;

const Button = styled(ButtonComponentDefault)`
  border: none;
  background-color: transparent;
  padding: 0;
  margin: 0;
  height: auto;
`;

const Item = styled(Text)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 230px;
`;

const Empty = styled.div`
  padding: 0 16px;
`;

const Loader = styled(LoaderMenuComponent.List)`
  padding: 0 16px;
`;

export default {
  Item,
  SearchInput,
  List,
  ListItem,
  Loader,
  Content,
  Actions,
  Icon,
  Link,
  Button,
  Empty,
};
