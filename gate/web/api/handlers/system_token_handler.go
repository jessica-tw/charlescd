/*
 *
 *  Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

package handlers

import (
	"net/http"
	"strconv"

	"github.com/ZupIT/charlescd/gate/internal/domain"
	"github.com/ZupIT/charlescd/gate/internal/logging"
	systemTokenInteractor "github.com/ZupIT/charlescd/gate/internal/use_case/system_token"
	"github.com/ZupIT/charlescd/gate/web/api/handlers/representation"
	uuidPkg "github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

func GetAllSystemTokens(getAllSystemToken systemTokenInteractor.GetAllSystemToken) echo.HandlerFunc {
	return func(echoCtx echo.Context) error {

		ctx := echoCtx.Request().Context()

		pageNumber, _ := strconv.Atoi(echoCtx.QueryParam("page"))
		pageSize, _ := strconv.Atoi(echoCtx.QueryParam("size"))
		sort := echoCtx.QueryParam("sort")

		pageRequest := domain.Page{
			PageNumber: pageNumber,
			PageSize:   pageSize,
			Sort:       sort,
		}
		pageRequest.FillDefaults()

		systemTokens, page, err := getAllSystemToken.Execute(pageRequest)
		if err != nil {
			return HandlerError(echoCtx, ctx, err)
		}

		return echoCtx.JSON(http.StatusOK, representation.DomainsToPageResponse(systemTokens, page))
	}
}

func GetSystemToken(getSystemToken systemTokenInteractor.GetSystemToken) echo.HandlerFunc {
	return func(echoCtx echo.Context) error {
		ctx := echoCtx.Request().Context()
		uuid, parseErr := uuidPkg.Parse(echoCtx.Param("id"))

		if parseErr != nil {
			logging.LogErrorFromCtx(ctx, parseErr)
			return echoCtx.JSON(http.StatusBadRequest, logging.NewError("Parse id failed", parseErr, logging.ParseError, nil))
		}

		systemToken, err := getSystemToken.Execute(uuid)
		if err != nil {
			return HandlerError(echoCtx, ctx, err)
		}
		return echoCtx.JSON(http.StatusOK, representation.DomainToResponse(systemToken))
	}
}

func RevokeSytemToken(revokeSystemToken systemTokenInteractor.RevokeSystemToken) echo.HandlerFunc {
	return func(echoCtx echo.Context) error {
		ctx := echoCtx.Request().Context()
		uuid, parseErr := uuidPkg.Parse(echoCtx.Param("id"))

		if parseErr != nil {
			logging.LogErrorFromCtx(ctx, parseErr)
			return echoCtx.JSON(http.StatusBadRequest, logging.NewError("Parse id failed", parseErr, logging.ParseError, nil))
		}

		err := revokeSystemToken.Execute(uuid)

		if err != nil {
			return HandlerError(echoCtx, ctx, err)
		}

		return echoCtx.JSON(http.StatusNoContent, nil)
	}
}
