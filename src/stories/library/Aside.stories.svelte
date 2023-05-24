<script lang="ts">
    import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
    import { Aside } from "$violet/components";
  </script>
  
  <Meta title="Library/Layout/Aside" component={Aside} tags="autodocs" />
  
  <Template let:args>
    <Aside {...args}>
		<div slot="aside">Content goes here</div>
	</Aside>
  </Template>
  
  <Story name="Default" />
  