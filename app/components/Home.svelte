<script>
	import ToDo from './Home/ToDo.svelte'
	import Completed from './Home/Completed.svelte'

</script>

<page>
	<actionBar title="My Tasks" />

	<tabView>
		<tabViewItem title="To Do">
			<ToDo />
		</tabViewItem>
		<tabViewItem title="Completed">
			<Completed />
		</tabViewItem>
	</tabView>
</page>
