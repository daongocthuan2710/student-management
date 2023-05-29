import test from 'tape'

import { put, call } from 'redux-saga/effects'
import { delay } from '@redux-saga/core/effects'
import { handleIncrementSagaSuccess } from './counterSaga'
import { incrementSagaSuccess } from './counterSlice'

test('incrementAsync Saga test', (assert : any) => {
  const gen = handleIncrementSagaSuccess()

  assert.deepEqual(
    gen.next().value,
    call(delay, 1000),
    'incrementAsync Saga must call delay(1000)'
  )

  assert.deepEqual(
    gen.next().value,
    put({type: incrementSagaSuccess.toString()}),
    'incrementAsync Saga must dispatch an INCREMENT action'
  )

  assert.deepEqual(
    gen.next(),
    { done: true, value: undefined },
    'incrementAsync Saga must be done'
  )

  assert.end()
})