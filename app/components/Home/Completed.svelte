<script>
	import { Template } from 'svelte-native/components'

	import { todos, dones } from '../../store/lists'

	let textFieldValue = ''

	async function onItemTap(event) {
		let result = await action('', '❌', ['Incomplete ⬜', 'Delete 🗑️🔥'])

		let item = $dones[event.index]
		switch (result) {
			case 'Incomplete ⬜':
				todos.set([item, ...$todos])
				dones.set($dones.filter((i) => i !== item))
				break
			case 'Delete 🗑️🔥':
				dones.set($dones.filter((i) => i !== item))
				break
			default:
				break
		}
	}

	// async function onDoneTap(eve) {
	// 	let result = await action('', '❌', ['Incomplete ⬜', 'Delete 🗑️'])

	// 	console.log(result)
	// 	let items = dones[eve.index]
	// 	switch (result) {
	// 		case 'Incomplete ⬜':
	// 			todos = addToList(todos, item)
	// 			dones = removeFromList(dones, item)
	// 			break
	// 		case 'Delete 🗑️':
	// 			dones = removeFromList(dones, item)
	// 			break
	// 		default:
	// 			break
	// 	}
	// }
</script>

<listView items={$dones} on:itemTap={onItemTap}>
	<Template let:item>
		<label text={item.name} textWrap="true" />
	</Template>
</listView>
