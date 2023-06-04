<script>
	import { Template } from 'svelte-native/components'
	import { onDestroy } from 'svelte'

	import { todos } from '../../store/todos'
	import { subscribe, addItem, updateItem, deleteItem } from '../../store/todos'
	
	let todosFiltered
	const unsubcribe = todos.subscribe((value) => {
		todosFiltered = value.filter((val) => val.complete === true)
	})

	function hdlUncheck(item) {
		updateItem(item.itemId, 'complete', false)
		console.log('$todos: ', $todos)
	}

	onDestroy(() => {
		unsubcribe()
	})
</script>

<listView items={todosFiltered}>
	<Template let:item>
		<flexboxLayout justifyContent="space-between">
			<label text={item.text} textWrap="true" />
			<flexboxLayout>
				<label on:tap={() => hdlUncheck(item)}>✅</label>
				<label>🗑️</label>
			</flexboxLayout>
		</flexboxLayout>
	</Template>
</listView>
