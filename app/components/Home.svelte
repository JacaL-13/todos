<script>
	import ToDo from './Home/ToDo.svelte'

	import { Template } from 'svelte-native/components'

	let todos = []
	let textFieldValue = ''

	let dones = []
	const removeFromList = (list, item) => list.filter((t) => t !== item)
	const addToList = (list, item) => [item, ...list]
</script>

<page>
	<actionBar title="My Tasks" />

	<tabView>
		<tabViewItem title="To Do">
			<ToDo {textFieldValue} {todos} {dones} {removeFromList} {addToList} />
		</tabViewItem>
		<tabViewItem title="Completed">
			<label textWrap="true">This tab will list completed tasks for tracking.</label>
		</tabViewItem>
	</tabView>
</page>
