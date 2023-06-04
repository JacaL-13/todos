import { writable } from 'svelte/store'
import { setString, getString, clear } from '@nativescript/core/application-settings'
import Chance from 'chance'

const chance = new Chance()

const storedData = getString('todos')
const initialValue = JSON.parse(storedData)

export const todos = writable(initialValue)

let $todos
todos.subscribe((data) => {
	$todos = data
	setString('todos', JSON.stringify(data))
})

export const subscribe = todos.subscribe
export const addItem = (text) => {
	todos.set([...$todos, { itemId: chance.hash(), text, complete: false, created: Date.now() }])
}
export const updateItem = (itemId, property, newValue) => {
	todos.update((data) => {
		const index = data.findIndex((item) => item.itemId === itemId)
		if (index !== -1) {
			data[index][property] = newValue
		}
		return data
	})
}
export const deleteItem = (itemId) => {
	todos.set($todos.filter((item) => item.itemId !== itemId))
}
