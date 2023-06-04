<script>
	import { Template } from 'svelte-native/components'
	import { onDestroy } from 'svelte'

	import { todos } from '../../store/todos'
	import { subscribe, addItem, updateItem, deleteItem } from '../../store/todos'

	let textFieldValue = ''
	let todosFiltered
	let textField
	const unsubcribe = todos.subscribe((value) => {
		todosFiltered = value.filter((val) => val.complete === false)
	})

	function hdlCheck(item) {
		updateItem(item.itemId, 'complete', true)
	}

	async function hdlDelete(item) {
		console.log('hdlDelete triggered')
		let result = await action('Permanently delete?', '', ['Yes', 'Cancel'])
		if (result === 'Yes') {
			deleteItem(item.itemId)
		}
	}

	function onButtonTap(event) {
		if (textFieldValue) {
			addItem(textFieldValue)
			textFieldValue = ''
		}

		// setTimeout(() => {
		// 	textField.nativeView.focus()
		// }, 200)
	}

	onDestroy(() => {
		unsubcribe()
	})
</script>

<gridLayout columns="*,120" rows="70,*">
	<textField
		col="0"
		row="0"
		bind:text={textFieldValue}
		hint="Type new task..."
		editable="true"
		on:returnPress={onButtonTap}
		bind:this={textField}
	/>
	<button col="1" row="0" text="Add task" on:tap={onButtonTap} />
	<listView items={todosFiltered} row="1" colSpan="2">
		<Template let:item>
			<flexboxLayout justifyContent="space-between">
				<label text={item.text} textWrap="true" />
				<flexboxLayout>
					<label on:tap={() => hdlCheck(item)}>⬜</label>
					<label on:tap={() => hdlDelete(item)}>🗑️</label>
				</flexboxLayout>
			</flexboxLayout>
		</Template>
	</listView>
</gridLayout>
