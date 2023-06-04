<script>
	import { Template } from 'svelte-native/components'

	import { todos } from '../../store/todos'
	import { subscribe, addItem, updateItem, deleteItem } from '../../store/todos'

	let textFieldValue = ''

	// async function onItemTap(event) {
	// 	let result = await action('', '❌', ['Complete ✅', 'Delete 🗑️🔥'])

	// 	let item = $todos[event.index]
	// 	switch (result) {
	// 		case 'Complete ✅':
	// 			dones.set([item, ...$dones])
	// 			todos.set($todos.filter((i) => i !== item))
	// 			break
	// 		case 'Delete 🗑️🔥':
	// 			todos.set($todos.filter((i) => i !== item))
	// 			break
	// 		default:
	// 			break
	// 	}
	// }

	function onButtonTap() {
		if (textFieldValue) {
			addItem(textFieldValue)
			textFieldValue = ''
		}
	}
</script>

<gridLayout columns="*,120" rows="70,*">
	<textField
		col="0"
		row="0"
		bind:text={textFieldValue}
		hint="Type new task..."
		editable="true"
		on:returnPress={onButtonTap}
	/>
	<button col="1" row="0" text="Add task" on:tap={onButtonTap} />
	<!-- on:itemTap={onItemTap} -->
	<listView items={$todos}  row="1" colSpan="2">
		<Template let:item>
			<label text={item.text} textWrap="true" />
		</Template>
	</listView>
</gridLayout>
