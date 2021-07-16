// Code generated by counterfeiter. DO NOT EDIT.
package fakes

import (
	"sync"
)

type CredentialConverter struct {
	ConvertCredentialsStub        func(string) (string, error)
	convertCredentialsMutex       sync.RWMutex
	convertCredentialsArgsForCall []struct {
		arg1 string
	}
	convertCredentialsReturns struct {
		result1 string
		result2 error
	}
	convertCredentialsReturnsOnCall map[int]struct {
		result1 string
		result2 error
	}
	invocations      map[string][][]interface{}
	invocationsMutex sync.RWMutex
}

func (fake *CredentialConverter) ConvertCredentials(arg1 string) (string, error) {
	fake.convertCredentialsMutex.Lock()
	ret, specificReturn := fake.convertCredentialsReturnsOnCall[len(fake.convertCredentialsArgsForCall)]
	fake.convertCredentialsArgsForCall = append(fake.convertCredentialsArgsForCall, struct {
		arg1 string
	}{arg1})
	stub := fake.ConvertCredentialsStub
	fakeReturns := fake.convertCredentialsReturns
	fake.recordInvocation("ConvertCredentials", []interface{}{arg1})
	fake.convertCredentialsMutex.Unlock()
	if stub != nil {
		return stub(arg1)
	}
	if specificReturn {
		return ret.result1, ret.result2
	}
	return fakeReturns.result1, fakeReturns.result2
}

func (fake *CredentialConverter) ConvertCredentialsCallCount() int {
	fake.convertCredentialsMutex.RLock()
	defer fake.convertCredentialsMutex.RUnlock()
	return len(fake.convertCredentialsArgsForCall)
}

func (fake *CredentialConverter) ConvertCredentialsCalls(stub func(string) (string, error)) {
	fake.convertCredentialsMutex.Lock()
	defer fake.convertCredentialsMutex.Unlock()
	fake.ConvertCredentialsStub = stub
}

func (fake *CredentialConverter) ConvertCredentialsArgsForCall(i int) string {
	fake.convertCredentialsMutex.RLock()
	defer fake.convertCredentialsMutex.RUnlock()
	argsForCall := fake.convertCredentialsArgsForCall[i]
	return argsForCall.arg1
}

func (fake *CredentialConverter) ConvertCredentialsReturns(result1 string, result2 error) {
	fake.convertCredentialsMutex.Lock()
	defer fake.convertCredentialsMutex.Unlock()
	fake.ConvertCredentialsStub = nil
	fake.convertCredentialsReturns = struct {
		result1 string
		result2 error
	}{result1, result2}
}

func (fake *CredentialConverter) ConvertCredentialsReturnsOnCall(i int, result1 string, result2 error) {
	fake.convertCredentialsMutex.Lock()
	defer fake.convertCredentialsMutex.Unlock()
	fake.ConvertCredentialsStub = nil
	if fake.convertCredentialsReturnsOnCall == nil {
		fake.convertCredentialsReturnsOnCall = make(map[int]struct {
			result1 string
			result2 error
		})
	}
	fake.convertCredentialsReturnsOnCall[i] = struct {
		result1 string
		result2 error
	}{result1, result2}
}

func (fake *CredentialConverter) Invocations() map[string][][]interface{} {
	fake.invocationsMutex.RLock()
	defer fake.invocationsMutex.RUnlock()
	fake.convertCredentialsMutex.RLock()
	defer fake.convertCredentialsMutex.RUnlock()
	copiedInvocations := map[string][][]interface{}{}
	for key, value := range fake.invocations {
		copiedInvocations[key] = value
	}
	return copiedInvocations
}

func (fake *CredentialConverter) recordInvocation(key string, args []interface{}) {
	fake.invocationsMutex.Lock()
	defer fake.invocationsMutex.Unlock()
	if fake.invocations == nil {
		fake.invocations = map[string][][]interface{}{}
	}
	if fake.invocations[key] == nil {
		fake.invocations[key] = [][]interface{}{}
	}
	fake.invocations[key] = append(fake.invocations[key], args)
}