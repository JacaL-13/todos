<script>
	import { Template } from 'svelte-native/components'

	import { todos, dones } from '../../store/lists'

	let textFieldValue = ''

	async function onItemTap(event) {
		let result = await action('', '❌', ['Complete ✅', 'Delete 🗑️🔥'])

		let item = $todos[event.index]
		switch (result) {
			case 'Complete ✅':
				dones.set([item, ...$dones])
				todos.set($todos.filter((i) => i !== item))
				break
			case 'Delete 🗑️🔥':
				todos.set($todos.filter((i) => i !== item))
				break
			default:
				break
		}
	}

	function onButtonTap() {
		if (textFieldValue) {
			console.log(`New task added: ${textFieldValue}.`)
			todos.set([{ name: textFieldValue }, ...$todos])
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

	<listView items={$todos} on:itemTap={onItemTap} row="1" colSpan="2">
		<Template let:item>
			<label text={item.name} textWrap="true" />
		</Template>
	</listView>
</gridLayout>
