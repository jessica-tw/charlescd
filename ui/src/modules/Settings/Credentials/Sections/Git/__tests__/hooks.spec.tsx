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

import { renderHook, act } from '@testing-library/react-hooks';
import { wait } from 'unit-test/testUtils';
import { FetchMock } from 'jest-fetch-mock';
import { useGit } from '../hooks';
 
beforeEach(() => {
  (fetch as FetchMock).resetMocks();
});

jest.mock('core/state/hooks', () => ({
  useDispatch: () => jest.fn()
}));

test('to save new git', async () => {
  const git = {
    name: 'git',
    authorId: '123',
    credentials: {
      address: 'https://github.com',
      accessToken: '1a2b3c4d5e6f7g',
      serviceProvider: 'GitHub'
    } 
  };

  (fetch as FetchMock).mockResponse(JSON.stringify({}));

  const { result } = renderHook(() => useGit());

  await act(async () => {
    await result.current.save(git);
  });

  await wait(() => expect(result.current.responseAdd).toMatchObject({}));
});

test('to remove a git', async () => {
  (fetch as FetchMock).mockResponse(JSON.stringify({}));

  const { result } = renderHook(() => useGit());

  await act(async () => {
    await result.current.remove('/git');
  });

  await wait(() => expect(result.current.responseRemove).toMatchObject({}));
});
