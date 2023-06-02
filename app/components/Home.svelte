<script>
	import { Template } from 'svelte-native/components'

	let todos = []
	let textFieldValue = ''

	let dones = []
	const removeFromList = (list, item) => list.filter((t) => t !== item)
	const addToList = (list, item) => [item, ...list]

	async function onItemTap(args) {
		// console.log(`Item: ${todos[args.index].name} at index: ${args.index} was tapped.`)

		let result = await action('', '❌', ['Complete ✔️', 'Delete 🗑️'])

		console.log(result)
		let item = todos[args.index]
		switch (result) {
			case 'Complete ✔️':
				dones = addToList(dones, item)
				todos = removeFromList(todos, item)
				break
			case 'Delete 🗑️':
				todos = removeFromList(todos, item)
				break
			default:
				break
		}
	}

	function onButtonTap() {
		if (textFieldValue) {
			console.log(`New task added: ${textFieldValue}.`)
			todos = [{ name: textFieldValue }, ...todos]
			textFieldValue = ''
		}
	}
</script>

<page>
	<actionBar title="My Tasks" />

	<tabView>
		<tabViewItem title="To Do">
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

				<listView items={todos} on:itemTap={onItemTap} row="1" colSpan="2">
					<Template let:item>
						<label text={item.name} textWrap="true" />
					</Template>
				</listView>
			</gridLayout>
		</tabViewItem>
		<tabViewItem title="Completed">
			<label textWrap="true">This tab will list completed tasks for tracking.</label>
		</tabViewItem>
	</tabView>
</page>
