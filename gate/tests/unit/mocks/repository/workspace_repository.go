// Code generated by mockery v0.0.0-dev. DO NOT EDIT.

package mocks

import mock "github.com/stretchr/testify/mock"

// WorkspaceRepository is an autogenerated mock type for the WorkspaceRepository type
type WorkspaceRepository struct {
	mock.Mock
}

// CountByIds provides a mock function with given fields: workspaceIds
func (_m *WorkspaceRepository) CountByIds(workspaceIds []string) (int64, error) {
	ret := _m.Called(workspaceIds)

	var r0 int64
	if rf, ok := ret.Get(0).(func([]string) int64); ok {
		r0 = rf(workspaceIds)
	} else {
		r0 = ret.Get(0).(int64)
	}

	var r1 error
	if rf, ok := ret.Get(1).(func([]string) error); ok {
		r1 = rf(workspaceIds)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}
