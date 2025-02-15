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

import React from "react";
import { render, act, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Components from "../Components";
import { Component } from "modules/Modules/interfaces/Component";
import { ThemeProviderWrapper } from "unit-test/testUtils";

const fakeComponent: Component = {
  id: "fake-id",
  name: "fake-name",
  latencyThreshold: "30",
  errorThreshold: "30",
  hostValue: "fakeHost",
  gatewayName: "fakeGateway"
};

const mockRemove = jest.fn();

const arrayFakeComponents = [fakeComponent, fakeComponent]

const arrayFakeComponent = [fakeComponent, fakeComponent]


const mockAppend = jest.fn(() => {
  arrayFakeComponents.push(fakeComponent)
});

jest.mock("react-hook-form", () => {
  return {
    __esModule: true,
    useFormContext: () => ({
      register: () => {},
      unregister: () => {},
      formState: {
        errors: {}
      }
    })
  };
});

test("componentForm for one component render", async () => {
  const { container } = render(
    <ThemeProviderWrapper>
      <Components
        fieldArray={{
          append: mockAppend,
          remove: mockRemove,
          fields: arrayFakeComponent
        }}
        key={"fake-key"}
      />
    </ThemeProviderWrapper>
  );
  
  await waitFor(() => expect(container.innerHTML).toMatch("input-wrapper-components[0]"));
});

test("componentForm for two components render", async () => {
  const { container } = render(
    <ThemeProviderWrapper>
      <Components
        fieldArray={{
          append: mockAppend,
          remove: mockRemove,
          fields: arrayFakeComponents
        }}
        key={"fake-key"}
      />
    </ThemeProviderWrapper>
  );

  await waitFor(() => {
    expect(container.innerHTML).toMatch("input-wrapper-components[0]");
    expect(container.innerHTML).toMatch("input-wrapper-components[1]");
  });
});

test("componentForm for append another component", async () => {
  render(
    <ThemeProviderWrapper>
      <Components
        fieldArray={{
          append: mockAppend,
          remove: mockRemove,
          fields: arrayFakeComponents
        }}
        key={"fake-key"}
      />
    </ThemeProviderWrapper>
  );

  const buttonAppend = screen.getByTestId("button-default-add-component")
  act(() => userEvent.click(buttonAppend));

  await waitFor(() => {
    const component = screen.getByTestId("components[0]")
    expect(component).toBeInTheDocument();
  });
});
